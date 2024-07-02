<template>
  <view class="participator-list-view">
    <view
      class="avatars-container"
      :style="{
        width: (data.length > 0 ? (data.length > 5 ? 5 : data.length) + 1 : 0) * 25 + 'rpx',
      }"
    >
      <image
        v-for="(item, index) in data"
        :key="index"
        :src="item"
        :style="{ top: 0, left: index * 25 + 'rpx' }"
      ></image>
    </view>
    <view class="describle-container"> {{ data.length }}人参与 </view>
  </view>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => [
          'https://avatars.githubusercontent.com/u/49026458?v=4',
          'https://avatars.githubusercontent.com/u/2035953?s=40&v=4',
          'https://avatars.githubusercontent.com/u/88035011?s=40&v=4',
        ],
      },
    },
  };
</script>
<style lang="scss" scoped>
  .participator-list-view {
    display: flex;
    align-items: center;
    .avatars-container {
      position: relative;
      height: 50rpx;
      margin-right: 12rpx;
      image {
        position: absolute;
        display: block;
        width: 50rpx;
        height: 50rpx;
        border: 2rpx solid #fff;
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
      }
    }
    .describle-container {
      font-size: 24rpx;
      color: #888;
    }
  }
</style>
