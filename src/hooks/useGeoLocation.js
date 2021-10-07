import { useState, useEffect, useCallback } from 'react';

import { errorToast } from 'utils/toast';

const DEFAULT_GEO = { lat: 37.4980854357918, lng: 127.028000275071 };

const OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function useGeoLocation() {
  // 내 현재 위치 정보
  const [isTracking, setIsTracking] = useState(false);
  const [myGeoLocation, setMyGeoLocation] = useState({});
  const getGeoLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude, longitude },
          } = position;
          const latLng = { lat: latitude, lng: longitude };
          setMyGeoLocation(latLng);
        },
        () => {
          // eslint-disable-next-line no-console
          errorToast('현재 지역 정보를 받아올 수 없습니다.');
          setMyGeoLocation(DEFAULT_GEO);
        },
        OPTIONS
      );
    }
  }, []);

  // 현재 내 위치 찾기
  useEffect(() => {
    if (!isTracking) {
      getGeoLocation();
      setIsTracking(true);
    }
  }, [getGeoLocation, isTracking]);

  return { myGeoLocation, getGeoLocation };
}
