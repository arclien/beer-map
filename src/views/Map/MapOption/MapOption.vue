<template>
  <div :class="$style.container">
    <div :class="$style.icons">
      <div :class="[$style.icon, $style.zoomIn]" @click="actions.zoomIn">
        <font-awesome-icon icon="search-plus" />
      </div>

      <div :class="[$style.icon, $style.relocate]" @click="actions.relocateCurrentPosition">
        <font-awesome-icon icon="location-arrow" />
      </div>
      <div :class="[$style.icon, $style.searchLocation]" @click="() => {}">
        <font-awesome-icon icon="search-location" />
      </div>

      <div :class="[$style.icon, $style.history]" @click="actions.showCollectionHistory">
        <font-awesome-icon icon="history" />
      </div>

      <div :class="[$style.icon, $style.zoomOut]" @click="actions.zoomOut">
        <font-awesome-icon icon="search-minus" />
      </div>
    </div>
    <template v-if="isModalOpen">
      <CollectionModalView :close-modal-callback="actions.closeModalCallback" />
    </template>
  </div>
</template>

<script>
import { defineComponent, ref, unref } from '@vue/composition-api';
import useGeoLocation from '@/composable/useGeoLocation';
import CollectionModalView from '@/views/Collection/CollectionModalView';

export default defineComponent({
  components: {
    CollectionModalView,
  },
  props: {
    map: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const isModalOpen = ref(false);

    const relocateCurrentPosition = () => {
      const { map } = unref(props);
      const { myGeoLocation, getGeoLocation } = useGeoLocation();

      getGeoLocation();

      const { lat, lng } = myGeoLocation;
      const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    };
    const zoomIn = () => {
      const { map } = unref(props);
      map.setLevel(map.getLevel() - 1);
    };
    const zoomOut = () => {
      const { map } = unref(props);
      map.setLevel(map.getLevel() + 1);
    };
    const showCollectionHistory = () => {
      isModalOpen.value = true;
    };
    const closeModalCallback = () => {
      isModalOpen.value = false;
    };

    const actions = {
      relocateCurrentPosition,
      zoomIn,
      zoomOut,
      showCollectionHistory,
      closeModalCallback,
    };

    return {
      isModalOpen,
      actions,
    };
  },

});
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