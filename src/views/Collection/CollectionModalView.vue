<template>
  <div>
    <MobileFullHeightModal
      :modal-id="modalId"
      :title="viewType === VIEW_TYPE.LIST ? '체크인 히스토리' : '도감'"
      :close-modal-callback="actions.closeModalCallbackFunc"
      :header-button-text="viewType === VIEW_TYPE.LIST ? 'Collection' : 'List'"
      :on-header-button-click="actions.changeViewType">
      <template #body>
        <div :class="$style.container">
          <template v-if="viewType === VIEW_TYPE.LIST">
            <collection-list />
          </template>
          <template v-else-if="viewType === VIEW_TYPE.COLLECTION">
            <collection-grid />
          </template>
        </div>
      </template>
    </MobileFullHeightModal>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, onMounted, onBeforeUnmount } from '@vue/composition-api';

import CollectionGrid from './CollectionGrid.vue';
import CollectionList from './CollectionList.vue';
import { VIEW_TYPE } from './CollectionViewType.constants';
import MobileFullHeightModal from '@/components/Modal/MobileFullHeightModal';
import useMobileFullHeightModalMixin from '@/composable/useMobileFullHeightModal';

export default defineComponent({
  components: {
    MobileFullHeightModal,
    CollectionList,
    CollectionGrid,
  },
  props: {
    closeModalCallback: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, context) {
    const { openModal, closeModal } = useMobileFullHeightModalMixin(context);

    const state = reactive({
      modalId: 'collection',
      viewType: VIEW_TYPE.LIST,
      VIEW_TYPE: VIEW_TYPE,
    });

    const actions = {
      closeModalCallbackFunc: props.closeModalCallback,
      changeViewType: () => {
        state.viewType = state.viewType === VIEW_TYPE.LIST ? VIEW_TYPE.COLLECTION : VIEW_TYPE.LIST;
      },
    };

    onMounted(() => {
      openModal(state.modalId);
    });

    onBeforeUnmount(() => {
      closeModal(state.modalId);
    });

    return {
      ...toRefs(state),
      actions,
    };
  },

});
</script>

<style lang="scss" module>
.container{
  height:100%;
}
</style>