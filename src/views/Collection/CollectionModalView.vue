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
            <li v-for="item in checkInList" :key="item.id" :class="$style.item" @click="$parent.$emit('show-place-info-window', item.id)">
              <div :class="$style.name">
                {{ getMapDataById(item.id).name }}
              </div>
              <div :class="$style.date">
                {{ item.date.length }}회 방문. {{ item.date.join(", ") }}
              </div>
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
import { getMapDataById } from '@/utils/MapData.utils';

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
    this.checkInList = getCheckedInData().sort((a, b) => b.date.length - a.date.length);
  },
  mounted() {
    this.openModal(this.modalId);
  },
  beforeUnmount() {
    this.closeModal(this.modalId);
  },
  methods: {
    getMapDataById(id) {
      return getMapDataById(id);
    },
  },

};
</script>

<style lang="scss" module>
.item{
  padding: 10px;
  border-bottom:1px solid #ddd;
}
.name{
  font-size: 16px;
}
.date{
  font-size: 12px;
  color: #aaa;
}
</style>