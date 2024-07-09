"use strict";
const common_vendor = require("../common/vendor.js");
const activityList = () => "./activity/activityList.js";
const dynamicList = () => "./dynamic/dynamicList.js";
const _sfc_main = {
  components: {
    activityList,
    dynamicList
  },
  data() {
    return {
      statusBarHeight: 0,
      rightSafeArea: 0,
      windowHeight: 0,
      // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
      currentSwiper: 0,
      // tabs组件的current值，表示当前活动的tab选项
      currentTab: 0,
      // swiper组件的current值，表示当前那个swiper-item是活动的
      tabs: [
        {
          name: "活动"
        },
        {
          name: "推荐"
        },
        {
          name: "关注"
        }
      ]
      // 要展示的业务数据列表
    };
  },
  computed: {
    headerHeight() {
      return common_vendor.index.upx2px(80) + this.statusBarHeight;
    }
  },
  onLoad() {
    const app = getApp();
    const { statusBarHeight, rightSafeArea } = app.globalData;
    this.statusBarHeight = statusBarHeight;
    this.rightSafeArea = rightSafeArea;
    this.windowHeight = common_vendor.index.getSystemInfoSync().windowHeight;
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
      console.log("onreachBottom");
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
      }
    }
  }
};
if (!Array) {
  const _easycom_u_tabs_swiper2 = common_vendor.resolveComponent("u-tabs-swiper");
  const _component_activity_list = common_vendor.resolveComponent("activity-list");
  const _component_dynamic_list = common_vendor.resolveComponent("dynamic-list");
  (_easycom_u_tabs_swiper2 + _component_activity_list + _component_dynamic_list)();
}
const _easycom_u_tabs_swiper = () => "../uni_modules/vk-uview-ui/components/u-tabs-swiper/u-tabs-swiper.js";
if (!Math) {
  _easycom_u_tabs_swiper();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("tabs", "246f1857-0"),
    b: common_vendor.o($options.changeTab),
    c: common_vendor.o(($event) => $data.currentTab = $event),
    d: common_vendor.p({
      list: $data.tabs,
      ["is-scroll"]: false,
      ["active-color"]: "#000",
      ["inactive-color"]: "#989898",
      bold: false,
      height: 80,
      modelValue: $data.currentTab
    }),
    e: $data.statusBarHeight + "px",
    f: $data.rightSafeArea + "px",
    g: common_vendor.sr("activityList", "246f1857-1"),
    h: common_vendor.p({
      mode: "participate"
    }),
    i: common_vendor.o((...args) => $options.onreachBottom && $options.onreachBottom(...args)),
    j: common_vendor.sr("activityList1", "246f1857-2"),
    k: common_vendor.p({
      mode: "participate"
    }),
    l: common_vendor.o((...args) => $options.onreachBottom && $options.onreachBottom(...args)),
    m: common_vendor.sr("dynamicList", "246f1857-3"),
    n: common_vendor.o((...args) => $options.onreachBottom && $options.onreachBottom(...args)),
    o: $data.currentSwiper,
    p: common_vendor.o((...args) => $options.transition && $options.transition(...args)),
    q: common_vendor.o((...args) => $options.animationfinish && $options.animationfinish(...args)),
    r: $data.windowHeight - $options.headerHeight + "px",
    s: $options.headerHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-246f1857"], ["__file", "D:/project/uniapp/party-together-uni-app/pages/square.vue"]]);
wx.createPage(MiniProgramPage);
