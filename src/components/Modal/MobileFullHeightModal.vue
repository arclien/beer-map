<template>
  <modal
    :name="modalName"
    :adaptive="true"
    :height="'100%'">
    <div :class="$style.modal">
      <div :class="$style.header">
        <div :class="$style.left">
          <div :class="$style.icon" @click="closeModal(modalId)">
            <font-awesome-icon icon="times" />
          </div>
        </div>

        <div :class="$style.title">
          <div :class="$style.text">
            {{ title }}
          </div>
        </div>

        <div :class="$style.right">
          <div :class="$style.button" @click="onHeaderButtonClick">
            {{ headerButtonText }}
          </div>
        </div>
      </div>
      <div :class="$style.body">
        <div :class="$style.content">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import MobileFullHeightModalMixin from '@/mixins/MobileFullHeightModal';

export default {
  name: 'MobileFullHeightModal',
  mixins: [MobileFullHeightModalMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
    headerButtonText: {
      type: String,
      default: '',
    },
    onHeaderButtonClick: {
      type: Function,
      default: () => {},
    },
    modalId: {
      type: String,
      default: '',
    },
  },
  computed: {
    modalName() {
      return `mobile-full-height-modal-${this.modalId}`;
    },
  },
};
</script>

<style lang="scss" module>

.modal{
  background-color: #fff;
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 1;
  top:0px;
}

.header{
  display: flex;
  align-items: center;
  background-color: #222;
  position: relative;
  justify-content: space-between;
  padding: 16px 0px;
  height: 16px;

  .left{
    width: 90px;
    max-width: 90px;
    text-align: left;
    .icon{
      color:#fff;
      box-sizing: content-box;
      width: 14px;
      height: 14px;
      padding: 10px 10px 10px 16px;
      vertical-align: middle;
    }
  }
  .right{
    width: 90px;
    max-width: 90px;
    text-align: right;
  }

  .title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    // 좌우 영역 각각 90px
    width: calc(100vw - 180px);
    max-width: calc(100vw - 180px);
    text-align: center;

    .text{
      font-size:16px;
      color:#fff;
    }
  }
}
.body{
  width: 100%;
  height: calc(100% - 48px);

  .content{
    height: 100%;
    overflow-y: auto;
  }
}
</style>