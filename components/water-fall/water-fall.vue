<template>
  <view class="scroll-view-content">
    <view
      class="column"
      v-for="(arr, index) in dataArr"
      :style="{ flex: 1, marginRight: index === 0 ? '8px' : '0px' }"
      :key="index"
    >
      <view class="column-item" v-for="(item, index) in arr" :key="index" @click="clickItem(item)">
        <slot :item="item"></slot>
      </view>
    </view>
  </view>
  <slot name="bottom"></slot>
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
    },
  };
</script>
<style lang="scss" scoped>
  .scroll-view-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
  }

  .column {
    flex-shrink: 0;
    .column-item {
      margin-bottom: 16rpx;
    }
  }
</style>
