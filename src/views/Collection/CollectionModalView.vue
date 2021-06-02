<template>
  <div>
    <MobileFullHeightModal
      :modal-id="modalId"
      :title="'체크인 히스토리'"
      :close-modal-callback="closeModalCallback"
      :on-header-button-click="() => {}">
      <template #body>
        <div>
          <ul>
            <li v-for="item in checkInList" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </template>
    </MobileFullHeightModal>
  </div>
</template>

<script>

import MobileFullHeightModal from '@/components/Modal/MobileFullHeightModal';
import MobileFullHeightModalMixin from '@/mixins/MobileFullHeightModal';
import { getCheckedInData } from '@/utils/CheckedIn.utils';

export default {
  components: {
    MobileFullHeightModal,
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
      checkInList: [],
      modalId: 'collection',
    };
  },
  created() {
    this.checkInList = getCheckedInData();

  },
  mounted() {
    this.openModal(this.modalId);
  },
  beforeUnmount() {
    this.closeModal(this.modalId);
  },

};
</script>

<style>

</style>