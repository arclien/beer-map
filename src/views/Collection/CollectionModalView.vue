<template>
  <div>
    <MobileFullHeightModal
      :modal-id="modalId"
      :title="viewType === VIEW_TYPE.LIST ? '체크인 히스토리' : '도감'"
      :close-modal-callback="closeModalCallback"
      :header-button-text="viewType === VIEW_TYPE.LIST ? 'Collection' : 'List'"
      :on-header-button-click="changeViewType">
      <template #body>
        <div :class="$style.container">
          <template v-if="viewType === VIEW_TYPE.LIST">
            <collection-list @show-place-info-window="showPlaceInfoWindow" />
          </template>
          <template v-else-if="viewType === VIEW_TYPE.COLLECTION">
            <collection-grid @show-place-info-window="showPlaceInfoWindow" />
          </template>
        </div>
      </template>
    </MobileFullHeightModal>
  </div>
</template>

<script>

import CollectionGrid from './CollectionGrid.vue';
import CollectionList from './CollectionList.vue';
import { VIEW_TYPE } from './CollectionViewType.constants';
import MobileFullHeightModal from '@/components/Modal/MobileFullHeightModal';
import MobileFullHeightModalMixin from '@/mixins/MobileFullHeightModal';

export default {
  components: {
    MobileFullHeightModal,
    CollectionList,
    CollectionGrid,
  },
  mixins: [MobileFullHeightModalMixin],
  props: {
    closeModalCallback: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      modalId: 'collection',
      viewType: VIEW_TYPE.LIST,
      VIEW_TYPE: VIEW_TYPE,
    };
  },
  mounted() {
    this.openModal(this.modalId);
  },
  beforeUnmount() {
    this.closeModal(this.modalId);
  },
  methods: {
    changeViewType() {
      this.viewType = this.viewType === VIEW_TYPE.LIST ? VIEW_TYPE.COLLECTION : VIEW_TYPE.LIST;
    },
    showPlaceInfoWindow(id) {
      this.$parent.$emit('show-place-info-window', id);
    },
  },
};
</script>

<style lang="scss" module>
.container{
  height:100%;
}
</style>