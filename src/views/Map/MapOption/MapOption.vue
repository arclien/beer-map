<template>
  <div :class="$style.container">
    <div :class="$style.icons">
      <div :class="[$style.icon, $style.zoomIn]" @click="zoomIn">
        <font-awesome-icon icon="search-plus" />
      </div>

      <div :class="[$style.icon, $style.relocate]" @click="relocateCurrentPosition">
        <font-awesome-icon icon="location-arrow" />
      </div>
      <div :class="[$style.icon, $style.searchLocation]" @click="() => {}">
        <font-awesome-icon icon="search-location" />
      </div>

      <div :class="[$style.icon, $style.history]" @click="showCollectionHistory">
        <font-awesome-icon icon="history" />
      </div>

      <div :class="[$style.icon, $style.zoomOut]" @click="zoomOut">
        <font-awesome-icon icon="search-minus" />
      </div>
    </div>
    <template v-if="isModalOpen">
      <CollectionModalView :close-modal-callback="closeModalCallback" />
    </template>
  </div>
</template>

<script>

import MobileFullHeightModalMixin from '@/mixins/MobileFullHeightModal';
import CollectionModalView from '@/views/Collection/CollectionModalView';

export default {
  components: {
    CollectionModalView,
  },
  mixins: [MobileFullHeightModalMixin],
  props: {
    map: {
      type: Object,
      default: () => {},
    },
    myGeoLocation: {
      type: Object,
      default: () => {},
    },
    getGeoLocation: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    relocateCurrentPosition() {
      this.getGeoLocation();
      const { lat, lng } = this.myGeoLocation;
      const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      this.map.panTo(moveLatLon);
    },
    zoomIn() {
      this.map.setLevel(this.map.getLevel() - 1);
    },
    zoomOut() {
      this.map.setLevel(this.map.getLevel() + 1);
    },
    showCollectionHistory() {
      this.isModalOpen = true;
    },
    closeModalCallback() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style lang="scss" module>
.container{
  width: 41px;
  height: 164px;
  position: absolute;
  top: 16px;
  right: 10px;
  z-index: 100;
}
.icons{
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f5f5f5;
}
.icon{
  display:flex;
  align-items: center;;
  justify-content:center;
  cursor: pointer;
  width: 41px;
  height: 41px;
  box-shadow: inset 6px 6px 0 0 #ffffff, inset -6px -6px 0 0 #bdbdbd;
  border: solid 3px #000000;
  background-color: #f5f5f5;

  &.zoomIn{
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom: solid 2px #000000;
  }
   &.zoomOut{
    border-top: solid 2px #000000;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  &.relocate, &.history, &.searchLocation{
    border-top: solid 2px #000000;
    border-bottom: solid 2px #000000;
  }
}
</style>