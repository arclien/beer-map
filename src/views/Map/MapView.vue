<template>
  <div>
    <div id="container" ref="container"></div>
    <MapOption
      :map="kakaoMap"
      @show-place-info-window="showPlaceInfoWindow" />

    <template v-if="isVisiblePlaceInfoWindow">
      <PlaceInfo :current-place-info="currentPlaceInfo" />
    </template>

    <LoadingSpinner :loading="!kakaoMap" />
  </div>
</template>

<script>
import { defineComponent, ref, unref, computed, watch, onMounted, getCurrentInstance } from '@vue/composition-api';
import MapOption from './MapOption/MapOption';
import PlaceInfo from './PlaceInfo/PlaceInfo';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

import useGeoLocation from '@/composable/useGeoLocation';
import {
  KAKAO_APP_KEY,
  KAKAO_SDK_URI,
  MapSize,
  MapLevel,
} from '@/constants/kakaoMap';

import MapData from '@/constants/mapData';
import { hasCheckedInById } from '@/utils/CheckedIn.utils';
import getInfoWindow from '@/utils/InfoWindow';
import { getMarkerImages } from '@/utils/Map.utils';
import { getMapDataById } from '@/utils/MapData.utils';
import { isEmptyObject } from '@/utils/utils';

let selectedMarker = null;

export default defineComponent({
  components: {
    MapOption,
    LoadingSpinner,
    PlaceInfo,
  },

  setup() {
    const internalInstance = getCurrentInstance();

    const kakaoMap = ref(null);
    const myGeoLocation = ref({});
    const markerData = ref([]);
    const markers = ref([]);
    const currentPlaceInfo = ref({});
    const checkInPlaceId = ref(null);
    const isVisiblePlaceInfo = ref(false);

    const isVisiblePlaceInfoWindow = computed(() => {
      return (
        (isVisiblePlaceInfo.value || checkInPlaceId.value) &&
        !isEmptyObject(currentPlaceInfo.value)
      );
    });

    const { getGeoLocation } = useGeoLocation();

    getGeoLocation().then((data) => {
      myGeoLocation.value = data;
    });
    markerData.value = MapData;

    const initMap = () => {
      if (!window.kakao || !window.kakao.maps) return;

      const { lat, lng } = unref(myGeoLocation);
      if (!lat || !lng) return;
      // 지도를 생성할 때 필요한 기본 옵션
      const options = {
        // 지도의 중심좌표.
        center: new window.kakao.maps.LatLng(lat, lng),
        // 지도의 레벨(확대, 축소 정도)
        level: MapLevel,
      };
      // map
      const mapObj = new window.kakao.maps.Map(
        internalInstance.refs.container,
        // eslint-disable-next-line comma-dangle
        options
      );
      // save center position
      const center = mapObj.getCenter();

      const { width, height } = MapSize;
      internalInstance.refs.container.style.width = width;
      internalInstance.refs.container.style.height = height;

      // 맵 레이아웃 업데이트
      mapObj.relayout();
      // restore
      mapObj.setCenter(center);
      // 현재위치 마킹
      mapObj.panTo(new kakao.maps.LatLng(lat, lng));
      const gpsContent =
        '<div><img class="Beer-map-pulse" draggable="false" unselectable="on" src="https://ssl.pstatic.net/static/maps/m/pin_rd.png" alt=""></div>';
      const currentOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(lat, lng),
        content: gpsContent,
        mapObj,
      });
      currentOverlay.setMap(mapObj);
      kakaoMap.value = mapObj;
    };

    const addKakaoMapScript = () => {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(initMap);
      script.src = `${KAKAO_SDK_URI()}?autoload=false&appkey=${KAKAO_APP_KEY}`;
      document.head.appendChild(script);

      const scriptLibrary = document.createElement('script');
      scriptLibrary.src = `${KAKAO_SDK_URI()}?autoload=false&libraries=services&appkey=${KAKAO_APP_KEY}`;
      document.head.appendChild(scriptLibrary);
    };

    // 마커를 제외한 맵 클릭시 초기화
    const setMapClickEventListener = () => {
      if (kakaoMap.value === null) {
        return;
      }

      window.kakao.maps.event.addListener(kakaoMap.value, 'click', () => {
        currentPlaceInfo.value = {};
        isVisiblePlaceInfo.value = false;
        if (selectedMarker) {
          selectedMarker.setImage(selectedMarker.normalImage);
          selectedMarker = null;
        }
      });
    };

    const setMarkerOnMap = () => {
      if (kakaoMap.value === null) {
        return;
      }
      if (!window?.kakao || window?.kakao?.maps === null) {
        return;
      }

      // clear prev markers
      markers.value = markers.value.forEach(marker => marker.setMap(null));
      // assign new markers
      markers.value = markerData.value.map(el => {
        const { latitude, longitude, daumId } = el;

        const hasCheckedIn = hasCheckedInById(daumId);

        const {
          normalImage,
          overImage,
          clickImage,
          checkedInImage,
        } = getMarkerImages();

        // 마커를 생성하고 이미지는 기본 마커 이미지를 사용합니다
        const marker = new window.kakao.maps.Marker({
          map: kakaoMap.value,
          position: new window.kakao.maps.LatLng(latitude, longitude),
          image: hasCheckedIn ? checkedInImage : normalImage,
        });
        // 마커에 표시할 인포윈도우를 생성합니다
        const infowindow = new window.kakao.maps.InfoWindow({
          content: getInfoWindow(el),
        });

        // 마커 객체에 마커아이디와 마커의 기본 이미지를 추가합니다
        marker.normalImage = hasCheckedIn ? checkedInImage : normalImage;

        // 마커에 mouseover 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
          // 마커의 이미지를 오버 이미지로 변경합니다
          if (!selectedMarker || selectedMarker !== marker) {
            marker.setImage(overImage);
          }
          infowindow.open(kakaoMap.value, marker);
        });

        // 마커에 mouseout 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
          // 마커의 이미지를 기본 이미지로 변경합니다
          if (!selectedMarker || selectedMarker !== marker) {
            marker.setImage(hasCheckedIn ? checkedInImage : normalImage);
          }
          infowindow.close();
        });

        // 마커에 click 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', () => {

          currentPlaceInfo.value = el;
          isVisiblePlaceInfo.value = true;
          // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
          // 마커의 이미지를 클릭 이미지로 변경합니다
          if (!selectedMarker || selectedMarker !== marker) {
            // 클릭된 마커 객체가 null이 아니면
            // 클릭된 마커의 이미지를 기본 이미지로 변경하고
            !!selectedMarker &&
              selectedMarker.setImage(selectedMarker.normalImage);

            // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
            marker.setImage(clickImage);
          }

          // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
          selectedMarker = marker;
        });

        return marker;
      });
    };

    const showPlaceInfoWindow = (id) => {
      currentPlaceInfo.value = getMapDataById(id);
      isVisiblePlaceInfo.value = true;
    };

    watch(kakaoMap, () => {
      setMapClickEventListener();
      setMarkerOnMap();
    });

    watch(myGeoLocation, () => {
      initMap();
    });

    onMounted(() => {
      addKakaoMapScript();
    });

    return {
      isVisiblePlaceInfoWindow,
      showPlaceInfoWindow,
      kakaoMap,
      currentPlaceInfo,
    };

  },

});
</script>

<style>
#container {
  width: 100%;
  min-height: 100vh;
  max-height: 100vw;
  overflow: hidden;
}

.Beer-map-pulse {
  width: 20px;
  height: 20px;
}
</style>
