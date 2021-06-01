<template>
  <div>
    <div id="container" ref="container"></div>
  </div>
</template>

<script>
import {
  KAKAO_APP_KEY,
  KAKAO_SDK_URI,
  DEFAULT_GEO,
  MapLevel,
  GEO_OPTIONS,
  MapSize,
} from '@/constants/kakaoMap';

export default {
  data() {
    return {
      kakaoMap: null,
      myGeoLocation: {},
    };
  },
  watch: {
    kakaoMap: function () {
      console.log(this.kakaoMap);
    },
  },

  created() {
    this.getGeoLocation();
  },

  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
  },
  methods: {
    initMap() {
      const { lat, lng } = this.myGeoLocation;
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
        this.$refs.container,
        // eslint-disable-next-line comma-dangle
        options
      );
      // save center position
      const center = mapObj.getCenter();

      const { width, height } = MapSize;
      this.$refs.container.style.width = width;
      this.$refs.container.style.height = height;

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
      this.kakaoMap = mapObj;
    },

    addKakaoMapScript() {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `${KAKAO_SDK_URI()}?autoload=false&appkey=${KAKAO_APP_KEY}`;
      document.head.appendChild(script);

      const scriptLibrary = document.createElement('script');
      scriptLibrary.src = `${KAKAO_SDK_URI()}?autoload=false&libraries=services&appkey=${KAKAO_APP_KEY}`;
      document.head.appendChild(scriptLibrary);
    },

    getGeoLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {
              coords: { latitude, longitude },
            } = position;
            const latLng = { lat: latitude, lng: longitude };
            this.myGeoLocation = latLng;
          },
          () => {
            alert('현재 지역 정보를 받아올 수 없습니다.');
            this.myGeoLocation = DEFAULT_GEO;
          },
          GEO_OPTIONS,
        );
      }
    },
  },
};
</script>

<style>
#container {
  width: 100%;
  min-height: 100vh;
  max-height: 100vw;
  overflow: hidden;
}

html,
body,
#root {
  height: 100%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

input[type='text']::-ms-clear {
  display: none;
}

input {
  -webkit-appearance: none;
}

a {
  text-decoration: none;
}

div {
  box-sizing: border-box;
}

*:focus {
  outline: none;
}

textarea,
textarea:focus,
input:focus {
  box-sizing: border-box;
  outline: none;
  font-family: sans-serif;
}

.Beer-map-pulse {
  width: 20px;
  height: 20px;
}

</style>
