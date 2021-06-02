<template>
  <div :class="[$style.container, { [$style.isExpanded]: isExpanded }]">
    <div :class="$style.info">
      <template v-if="placeInfo.daumId">
        <div :class="$style.expandIcon" @click="setExpanded">
          <font-awesome-icon v-if="isExpanded" icon="chevron-down" />
          <font-awesome-icon v-else-if="!isExpanded" icon="chevron-up" />
        </div>
      </template>
      <template v-if="hasCheckedIn">
        <div :class="$style.checkedIn">
          <font-awesome-icon icon="check" />
        </div>
      </template>
      <template v-else>
        <div :class="$style.checkIn" @click="openCheckInModal">
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
          <div :class="$style.text" @click="openUrl(placeInfo.locLink)">
            {{ placeInfo.locLink }}
          </div>
        </div>

        <div v-if="isAbleToChangeMapView" :class="$style.row">
          <div :class="$style.title" @click="setKakaoMapView">
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

import PlaceIframeView from '../PlaceIframeView/PlaceIframeView';

import DialogModal from '@/mixins/DialogModal';
import { hasCheckedInById, setCheckedIn } from '@/utils/CheckedIn.utils';
import { getTodayDate } from '@/utils/day';
import { browserOpen } from '@/utils/utils';
export default {
  components: {
    PlaceIframeView,
  },
  mixins: [DialogModal],
  props: {
    currentPlaceInfo: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isExpanded: false,
      placeInfo: this.currentPlaceInfo,
      isKakaoMapView: true,
      hasCheckedIn: false,
    };
  },

  computed: {
    isAbleToChangeMapView() {
      const { daumId, naverId } = this.placeInfo;
      return this.isExpanded && daumId && naverId;
    },
  },
  watch: {
    currentPlaceInfo: {
      handler(newData) {
        this.placeInfo = newData;
        this.hasCheckedIn = hasCheckedInById(this.placeInfo.daumId);
        this.isKakaoMapView = true;
      },
    },
  },
  created() {
    const { daumId } = this.placeInfo;
    this.hasCheckedIn = hasCheckedInById(daumId);
  },
  mounted() {
    console.log(this.placeInfo);
  },

  methods: {
    setExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    setKakaoMapView() {
      this.isKakaoMapView = !this.isKakaoMapView;
    },
    openUrl(link) {
      browserOpen(link);
    },
    openCheckInModal() {
      const { name } = this.placeInfo;

      this.openModal({
        title: `${name}`,
        text: this.hasCheckedIn ? '이미 체크인 하셨습니다.' : `${getTodayDate()}에 체크인 하시겠습니까?`,
        handler: [
          {
            title: '취소',
            callback: () => this.closeModal(),
          },
          {
            title: this.hasCheckedIn ? '확인' : '체크인!',
            callback: () => {
              this.setCheckedIn();
              this.closeModal();
            },
          },
        ],
      });
    },
    setCheckedIn() {
      if (this.hasCheckedIn) return;
      const { daumId } = this.placeInfo;
      setCheckedIn(daumId);
      this.hasCheckedIn = hasCheckedInById(daumId);
    },
  },
};
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
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0px;
  top: -15px;
  font-size: 30px;
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