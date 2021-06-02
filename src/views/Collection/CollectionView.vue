<template>
  <div>
    <MobileFullHeightModal
      :modal-id="modalId"
      :title="'체크인 히스토리'"
      :header-button-text="'button'"
      :on-header-button-click="() => {}">
      <template #body>
        <div>
          체크인 히스토리 보기!
        </div>
      </template>
    </MobileFullHeightModal>
  </div>
</template>

<script>

import MobileFullHeightModal from '@/components/Modal/MobileFullHeightModal';

export default {
  components: {
    MobileFullHeightModal,
  },
  props: {
    modalId: {
      type: String,
      default: '',
    },
  },

};
</script>

<style>

</style>