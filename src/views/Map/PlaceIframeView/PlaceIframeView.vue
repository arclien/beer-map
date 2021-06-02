<template>
  <div :class="$style.container">
    <iframe
      width="100%"
      height="100%"
      frameBorder="0"
      framespacing="0"
      :title="placeInfo.daumId"
      :src="url"></iframe>
  </div>
</template>

<script>

import { KakaoPlaceMobileUrl } from '@/constants/kakaoMap';
import { NaverPlaceMobileUrl } from '@/constants/naverMap';

export default {
  props: {
    placeInfo: {
      type: Object,
      default: () => {},
    },
    isKakaoMapView: Boolean,
  },

  computed: {
    url() {
      const { daumId, naverId } = this.placeInfo;
      return daumId && this.isKakaoMapView ?
        KakaoPlaceMobileUrl + daumId :
        NaverPlaceMobileUrl + naverId;
    },
  },

};
</script>

<style lang="scss" module>

.container{
  width: 100%;
  height: calc(80vh - 100px);
}
</style>