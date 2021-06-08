<template>
  <div>
    <div id="container" ref="container"></div>
    <MapOption
      :map="kakaoMap" />

    <template v-if="isVisiblePlaceInfoWindow">
      <PlaceInfo :current-place-info="currentPlaceInfo" />
    </template>

    <LoadingSpinner :loading="!kakaoMap" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import MapOption from './MapOption/MapOption';
import PlaceInfo from './PlaceInfo/PlaceInfo';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

import useKakaoMap from '@/composable/useKakaoMap';

import { isEmptyObject } from '@/utils/utils';

export default defineComponent({
  components: {
    MapOption,
    LoadingSpinner,
    PlaceInfo,
  },

  setup() {

    const {
      kakaoMap,
      currentPlaceInfo,
      isVisiblePlaceInfo,
    } = useKakaoMap();

    const isVisiblePlaceInfoWindow = computed(() => {
      return (
        isVisiblePlaceInfo.value &&
        !isEmptyObject(currentPlaceInfo.value)
      );
    });

    return {
      isVisiblePlaceInfoWindow,
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
