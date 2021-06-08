import { ref } from '@vue/composition-api';

const DEFAULT_GEO = { lat: 37.4980854357918, lng: 127.028000275071 };

const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function useGeoLocation() {
  // 내 현재 위치 정보
  const geoLocation = ref({});

  const getGeoLocation = () => {

    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {
              coords: { latitude, longitude },
            } = position;
            const latLng = { lat: latitude, lng: longitude };
            geoLocation.value = latLng;
            resolve(latLng);
          },
          () => {
            // eslint-disable-next-line no-console
            alert('현재 지역 정보를 받아올 수 없습니다.');
            geoLocation.value = DEFAULT_GEO;
          },
          GEO_OPTIONS,
        );
      }

    });
  };

  return { geoLocation, getGeoLocation };
}
