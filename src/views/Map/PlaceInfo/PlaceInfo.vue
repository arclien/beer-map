<template>
  <div :class="[$style.container, { [$style.isExpanded]: isExpanded }]">
    <div :class="$style.info">
      <template v-if="placeInfo.daumId">
        <div :class="$style.expandIcon" @click="actions.setExpanded">
          <font-awesome-icon v-if="isExpanded" icon="chevron-down" />
          <font-awesome-icon v-else-if="!isExpanded" icon="chevron-up" />
        </div>
      </template>
      <template v-if="hasCheckedIn">
        <div :class="$style.checkedIn" @click="actions.openCheckInModal">
          <font-awesome-icon icon="check" />
        </div>
      </template>
      <template v-else>
        <div :class="$style.checkIn" @click="actions.openCheckInModal">
          체크인
        </div>
      </template>
      <div :class="[$style.infoBody, { [$style.isExpanded]: isExpanded }]">
        <div :class="$style.row">
          <div :class="$style.header">
            {{ placeInfo.name }}
          </div>
        </div>

        <div :class="$style.row">
          <div :class="$style.title">
            주소
          </div>
          <div :class="$style.text">
            {{ placeInfo.name }}
          </div>
        </div>

        <div v-if="placeInfo.locLink" :class="$style.row">
          <div :class="$style.title">
            링크
          </div>
          <div :class="$style.text" @click="actions.browserOpen(placeInfo.locLink)">
            {{ placeInfo.locLink }}
          </div>
        </div>

        <div v-if="isAbleToChangeMapView" :class="$style.row">
          <div :class="$style.title" @click="actions.setKakaoMapView">
            {{ isKakaoMapView ? '네이버' : '카카오' }}맵으로 전환
          </div>
        </div>

        <div v-if="isExpanded" :class="$style.row">
          <PlaceIframeView :place-info="placeInfo" :is-kakao-map-view="isKakaoMapView" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, unref, computed, watch } from '@vue/composition-api';
import PlaceIframeView from '../PlaceIframeView/PlaceIframeView';

import useDialogModal from '@/composable/useDialogModal';
import { hasCheckedInById, setCheckedIn } from '@/utils/CheckedIn.utils';
import { getTodayDate } from '@/utils/day';
import { browserOpen } from '@/utils/utils';

export default defineComponent({
  components: {
    PlaceIframeView,
  },
  props: {
    currentPlaceInfo: {
      type: Object,
      default: () => {},
    },
  },

  setup(props, context) {
    const { openModal, closeModal } = useDialogModal(context);

    const isExpanded = ref(false);
    const placeInfo = ref(props.currentPlaceInfo);
    const isKakaoMapView = ref(true);
    const hasCheckedIn = ref(false);

    const { daumId } = unref(placeInfo);
    hasCheckedIn.value = hasCheckedInById(daumId);

    const isAbleToChangeMapView = computed(() => {
      const { daumId, naverId } = unref(placeInfo);
      return isExpanded.value && daumId && naverId;
    });

    watch(props.currentPlaceInfo, (newData) => {
      placeInfo.value = newData;
      hasCheckedIn.value = hasCheckedInById(placeInfo.value.daumId);
      isKakaoMapView.value = true;
    });

    const setExpanded = () => {
      isExpanded.value = !isExpanded.value;
    };

    const setKakaoMapView = () => {
      isKakaoMapView.value = !isKakaoMapView.value;
    };

    const checkedIn = () => {
      const { daumId } = unref(placeInfo);
      setCheckedIn({
        id: daumId,
        date: getTodayDate(),
      });
      hasCheckedIn.value = hasCheckedInById(daumId);
    };

    const openCheckInModal = () => {
      const { name } = unref(placeInfo);

      openModal({
        title: `${name}`,
        text: unref(hasCheckedIn) ? '이미 체크인 하셨습니다. 다시 체크인 하시겠습니까?' : `${getTodayDate()}에 체크인 하시겠습니까?`,
        handler: [
          {
            title: '취소',
            callback: () => closeModal(),
          },
          {
            title: '체크인',
            callback: () => {
              checkedIn();
              closeModal();
            },
          },
        ],
      });
    };

    const actions = {
      setExpanded,
      setKakaoMapView,
      browserOpen,
      openCheckInModal,
    };
    return {
      isExpanded,
      placeInfo,
      isKakaoMapView,
      hasCheckedIn,
      isAbleToChangeMapView,
      actions,
    };
  },
});
</script>

<style lang="scss" module>

.container{
  // TODO, Mixins로 가져오기
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  max-height: 200px;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0px;
  width: 100%;
  height: 100%;
  padding: 18px 16px 16px;
  border: solid 3px #000000;
  background-color: #f8f8f8;

  -webkit-transition: max-height 0.8s;
  -moz-transition: max-height 0.8s;
  transition: max-height 0.8s;

  &.isExpanded{
    max-height: calc(80vh);
  }
}

.info{
  position: relative;
  width: 100%;
  height: 100%;
}

.expandIcon{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  top: -40px;
  width: 100px;
  height: 20px;
  margin: 0 auto;
  cursor: pointer;

  height: 34px;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3), inset 4px 4px 0 0 #ffefb4,
    inset -4px -4px 0 0 #d4ab0f;
  border: solid 4px #000000;
  background-color: #e9be1a;
}

.checkedIn{
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0px;
  top: -15px;
  font-size: 30px;
  z-index: 1;
}

.checkIn{
  width: 70px;
  position: absolute;
  right: -11px;
  top: -15px;
  text-align:right;
  cursor:pointer;

  font-size: 14px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  z-index: 100;
  line-height: 1.86;
  text-align:center;
  letter-spacing: -1.23px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 0px 0px, rgb(135 135 135) 4px 4px 0px 0px inset, rgb(35 35 35) -4px -4px 0px 0px inset;
  border: 2px solid rgb(0, 0, 0);
  background-color: rgb(56, 56, 56);
}

.infoBody{
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y:hidden;

  &.isExpanded{
     overflow-y:scroll;
  }
}

.row{
  display:flex;
  align-items: flex-start;
  justify-content: flex-start;

  position: relative;
  width: 100%;

  .header{
    font-size:18px;
    font-weight:bold;
    color: #000;
    letter-spacing: -1.26px;
    margin-bottom: 8px;
    margin-right: 5px;
  }

  .title{
    font-size:14px;
    font-weight:bold;
    color: #000;
    cursor: pointer;
    letter-spacing: -1.26px;
    margin-bottom: 8px;
    margin-right: 5px;
  }

  .text{
    font-size:13px;
    color: #aaa;
    cursor: pointer;
    letter-spacing: -1.26px;
    margin-bottom: 8px;
    margin-right: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>