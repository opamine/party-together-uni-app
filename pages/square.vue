<template>
  <view
    class="square-header"
    :style="{ paddingTop: statusBarHeight + 'px', paddingRight: rightSafeArea + 'px' }"
  >
    <u-tabs-swiper
      ref="tabs"
      :list="tabs"
      :is-scroll="false"
      v-model="currentTab"
      @change="changeTab"
      active-color="#000"
      inactive-color="#989898"
      :bold="false"
      :height="80"
    ></u-tabs-swiper>
  </view>
  <view class="square-content" :style="{ paddingTop: headerHeight + 'px' }">
    <swiper
      :current="currentSwiper"
      @transition="transition"
      @animationfinish="animationfinish"
      :style="{ height: windowHeight - headerHeight + 'px' }"
    >
      <swiper-item class="swiper-item">
        <scroll-view scroll-y style="height: 100%" @scrolltolower="onreachBottom">
          <activity-list ref="activityList" mode="participate"></activity-list>
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view scroll-y style="height: 100%" @scrolltolower="onreachBottom">
          <activity-list ref="activityList1" mode="participate"></activity-list>
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view scroll-y style="height: 100%" @scrolltolower="onreachBottom">
          <dynamic-list ref="dynamicList"></dynamic-list>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import activityList from './activity/activityList.vue';
  import dynamicList from './dynamic/dynamicList.vue';

  export default {
    components: {
      activityList,
      dynamicList,
    },
    data() {
      return {
        statusBarHeight: 0,
        rightSafeArea: 0,
        windowHeight: 0,
        // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
        currentSwiper: 0, // tabs组件的current值，表示当前活动的tab选项
        currentTab: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
        tabs: [
          {
            name: '活动',
          },
          {
            name: '推荐',
          },
          {
            name: '关注',
          },
        ], // 要展示的业务数据列表
      };
    },
    computed: {
      headerHeight() {
        return uni.upx2px(80) + this.statusBarHeight;
      },
    },
    onLoad() {
      const app = getApp();
      const { statusBarHeight, rightSafeArea } = app.globalData;
      this.statusBarHeight = statusBarHeight;
      this.rightSafeArea = rightSafeArea;
      this.windowHeight = uni.getSystemInfoSync().windowHeight;
    },
    methods: {
      // tabs通知swiper切换
      changeTab(index) {
        this.currentSwiper = index;
      },
      // swiper-item 左右移动，通知 tabs 的滑块跟随移动
      transition(e) {
        let dx = e.detail.dx;
        this.$refs.tabs.setDx(dx);
      },
      // 由于 swiper 的内部机制问题，快速切换 swiper 不会触发 dx 的连续变化，需要在结束时重置状态
      // swiper 滑动结束，分别设置 tabs 和 swiper 的状态
      animationfinish(e) {
        const current = e.detail.current;
        this.$refs.tabs.setFinishCurrent(current);
        this.currentSwiper = current;
        this.currentTab = current;
      },
      // scroll-view 到底部加载更多
      onreachBottom() {
        console.log('onreachBottom');
        switch (this.currentTab) {
          case 0:
            this.$refs.activityList.getData();
            break;
          case 1:
            this.$refs.activityList1.getData();
            break;
          case 2:
            this.$refs.dynamicList.getData();
            break;
          default:
            break;
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .square-header {
    position: fixed;
    width: 100%;
    background-color: #fff;
  }
</style>
