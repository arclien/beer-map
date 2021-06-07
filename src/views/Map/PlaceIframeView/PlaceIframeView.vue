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
import { defineComponent, computed, unref } from '@vue/composition-api';

import { KakaoPlaceMobileUrl } from '@/constants/kakaoMap';
import { NaverPlaceMobileUrl } from '@/constants/naverMap';

export default defineComponent({
  props: {
    placeInfo: {
      type: Object,
      default: () => {},
    },
    isKakaoMapView: Boolean,
  },
  setup(props) {

    // url값을 computed 하지 않으면 매번 props가 바뀔 때마다 해당 값을 업데이트 하진 않았음.
    // url을 ref or reactive로 선언 후, watch로 하는게 맞을까?
    const url = computed(() => {
      // props를 destructuring 하면, 반응성이 깨져버린다.
      // unref로 해도 되는 것 같은데, 이렇게 해도 되는지는 아직 모르겠음.
      // props.placeInfo 이런식으로 참조하면 이슈 없음
      const { placeInfo, isKakaoMapView } = unref(props);
      const { daumId, naverId } = placeInfo;
      return daumId && isKakaoMapView ?
        KakaoPlaceMobileUrl + daumId :
        NaverPlaceMobileUrl + naverId;
    });
    return {
      url,
    };
  },
});
</script>

<style lang="scss" module>

.container{
  width: 100%;
  height: calc(80vh - 100px);
}
</style>