<template>
  <div>
    <MobileFullHeightModal
      :modal-id="modalId"
      :title="'체크인 히스토리'"
      :close-modal-callback="closeModalCallback"
      :on-header-button-click="() => {}">
      <template #body>
        <div :class="$style.container">
          <template v-if="checkInList.length">
            <div :class="$style.summarize">
              {{ summarize }}
              {{ totalCount }}
            </div>
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
          </template>
          <template v-else>
            <div :class="$style.empty">
              <p>체크인 히스토리가 없습니다! 분발해주세요!</p>
              <img src="@/assets/images/empty.png" alt="empty list">
            </div>
          </template>
        </div>
      </template>
    </MobileFullHeightModal>
  </div>
</template>

<script>

import MobileFullHeightModal from '@/components/Modal/MobileFullHeightModal';
import MapData from '@/constants/mapData';
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
  computed: {
    summarize() {
      return `${this.checkInList.length} / ${MapData.length} Checked In!  `;
    },
    totalCount() {
      const total = this.checkInList.reduce((acc, cur) => {
        return acc + cur.date.length;
      }, 0);
      return ` Total ${total}`;
    },
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
.container{
  height:100%;
}
.item{
  padding: 10px;
  border-bottom:1px solid #ddd;

  &:nth-child(2n){
    background-color: #fafafa;
  }
}
.name{
  font-size: 16px;
}
.date{
  font-size: 12px;
  color: #aaa;
}
.summarize{
  background-color:#e2e2e2;
  font-size: 18px;
  padding:5px;
  text-align: center;
}
.empty{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  p{
    font-size:16px;
  }
  img{
    width:100%;
    height:auto;
  }
}
</style>