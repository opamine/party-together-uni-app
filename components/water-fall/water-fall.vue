<template>
  <scroll-view
    class="scroll-view"
    :scroll-y="true"
    @scrolltoupper="scrolltoupper"
    @scrolltolower="scrolltolower"
    :style="{ height: '100%' }"
  >
    <view class="scroll-view-content">
      <view
        class="column"
        v-for="(arr, index) in dataArr"
        :style="{ flex: 1, marginRight: index === 0 ? '8px' : '0px' }"
        :key="index"
      >
        <view
          class="column-item"
          v-for="(item, index) in arr"
          :key="index"
          @click="clickItem(item)"
        >
          <slot :item="item"></slot>
        </view>
      </view>
    </view>
    <slot name="bottom"></slot>
  </scroll-view>
</template>
<script>
  export default {
    props: ['data'],
    data() {
      return {
        dataArr: [[], []],
      };
    },
    mounted() {
      this.handleData();
    },
    watch: {
      data: {
        handler() {
          this.handleData();
        },
        deep: true,
      },
    },
    methods: {
      handleData() {
        this.data.forEach((item, index) => {
          const newIndex = index % 2;
          this.dataArr[newIndex].push(item);
        });
      },
      // 子元素点击事件
      clickItem(item) {
        this.$emit('clickItem', item);
      },
      // 滚动到顶部触发
      scrolltoupper() {
        this.$emit('scrolltoupper');
      },
      // 滚动到底部触发
      scrolltolower() {
        this.$emit('scrolltolower');
      },
    },
  };
</script>
<style lang="scss" scoped>
  /* #ifdef H5 || MP-WEIXIN */
  // 通过样式穿透，隐藏H5下，scroll-view下的滚动条
  .scroll-view ::v-deep ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }

  /* #endif */
  .scroll-view-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  .column {
    flex-shrink: 0;
    .column-item {
      margin-bottom: 8px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
</style>
