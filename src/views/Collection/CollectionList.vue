<template>
  <div>
    <template v-if="checkInList.length">
      <div :class="$style.summarize">
        {{ summarize }}
        {{ totalCount }}
      </div>
      <ul>
        <li v-for="item in checkInList" :key="item.id" :class="$style.item" @click="$emit('show-place-info-window', item.id)">
          <div :class="$style.name">
            {{ actions.getMapDataById(item.id).name }}
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

<script>
import { defineComponent, ref, unref, computed } from '@vue/composition-api';

import MapData from '@/constants/mapData';
import { getCheckedInData } from '@/utils/CheckedIn.utils';
import { getMapDataById } from '@/utils/MapData.utils';

export default defineComponent({

  setup() {
    const checkInList = ref([]);
    // assign을 할 경우에는 unref(checkInList) =  이렇게는 불가능
    checkInList.value = getCheckedInData().sort((a, b) => b.date.length - a.date.length);

    const summarize = computed(() => {
      // unref를 하지 않고 checkInList.value로 접근하는 방법도 있다
      return `${unref(checkInList).length} / ${MapData.length} Checked In!  `;
    });

    const totalCount = computed(() => {
      const total = unref(checkInList).reduce((acc, cur) => {
        return acc + cur.date.length;
      }, 0);
      return ` Total ${total}`;
    });

    const actions = {
      getMapDataById,
    };

    return {
      checkInList,
      summarize,
      totalCount,
      actions,
    };
  },

});
</script>

<style lang="scss" module>

.item{
  padding: 10px;
  border-bottom:1px solid #ddd;

  &:nth-child(2n){
    background-color: #f6f8fa
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