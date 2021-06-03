<template>
  <div :class="$style.container">
    <div v-for="item in MapData" :key="item.daumId" :class="[$style.item, { [$style.checkedIn]: hasCheckedIn(item.daumId) }]">
      <span>{{ item.name }}</span>
      <div v-if="hasCheckedIn(item.daumId)" :class="$style.checkInStamp">
        <font-awesome-icon icon="check-circle" />
      </div>
    </div>
  </div>
</template>

<script>
import MapData from '@/constants/mapData';
import { getCheckedInData, hasCheckedInById } from '@/utils/CheckedIn.utils';
import { getMapDataById } from '@/utils/MapData.utils';

export default {

  data() {
    return {
      checkInList: [],
      MapData: MapData,
    };
  },
  computed: { },
  created() {
    this.checkInList = getCheckedInData();
  },
  methods: {
    getMapDataById(id) {
      return getMapDataById(id);
    },
    hasCheckedIn(id) {
      return hasCheckedInById(id);
    },
  },
};
</script>

<style lang="scss" module>
.container{
  display:flex;
  flex-wrap: wrap;
}
.item{
  width:50%;
  padding:10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;

  box-shadow: inset 6px 6px 0 0 #ffffff, inset -6px -6px 0 0 #bdbdbd;
  border: solid 3px #000000;
  background-color: #f5f5f5;
  position: relative;
  opacity: 0.3;

  &.checkedIn{
    opacity: 1;
  }
  .checkInStamp{
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 50px;
    transform: rotate(-20deg);
    color: red;
  }
}
</style>