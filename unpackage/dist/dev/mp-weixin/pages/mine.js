"use strict";
const common_vendor = require("../common/vendor.js");
const waterFall = () => "../components/water-fall/water-fall.js";
const participatorList = () => "../components/participator-list/participator-list.js";
const dynamicList = () => "./dynamic/dynamicList.js";
const activityList = () => "./activity/activityList.js";
const InfoTagsFields = ["age", "region", "career", "mbti"];
const _sfc_main = {
  components: {
    waterFall,
    participatorList,
    dynamicList,
    activityList
  },
  data() {
    return {
      screenHeight: 0,
      // px
      navHeight: 0,
      // px
      statusBarHeight: 0,
      // px
      navigationBarHeight: 0,
      // px
      mineHeaderOpacity: 0,
      mineContentHeight: 0,
      scrollTop: 0,
      userInfo: {
        id: 1998,
        nickName: "周啊粥",
        account: "zzhou998",
        avatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
        signature: "❤ 逆水行舟，不进则退",
        gender: "male",
        age: 26,
        region: "浙江杭州",
        career: "互联网从业者",
        mbti: "INTJ"
      },
      InfoTagsFields,
      currentTab: 0,
      tabs: [
        {
          name: "动态"
        },
        {
          name: "活动参与"
        },
        {
          name: "我的发布"
        }
      ],
      tabsHeight: common_vendor.index.upx2px(90)
    };
  },
  computed: {
    // 导航栏高度 rpx 为单位，u-sticky 组件需要使用
    navHeightOfRpx() {
      return this.navHeight / (common_vendor.index.upx2px(100) / 100);
    }
  },
  onLoad() {
    this.screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
    this.statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const custom = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    this.navigationBarHeight = custom.height + (custom.top - common_vendor.index.getSystemInfoSync().statusBarHeight) * 2;
    this.navHeight = this.statusBarHeight + this.navigationBarHeight;
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
    if (e.scrollTop <= common_vendor.index.upx2px(150)) {
      this.mineHeaderOpacity = e.scrollTop / common_vendor.index.upx2px(150);
    } else {
      this.mineHeaderOpacity = 1;
    }
  },
  onPullDownRefresh() {
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  onReachBottom() {
    console.log("reachBottom");
    switch (this.currentTab) {
      case 0:
        this.$refs.dynamicList.getData();
        break;
      case 1:
        this.$refs.activityList.getData();
        break;
      case 2:
        this.$refs.publishList.getData();
        break;
    }
  },
  onReady() {
    common_vendor.index.createSelectorQuery().select(".mine-content").boundingClientRect((data) => {
      this.mineContentHeight = data.height;
    }).exec();
  },
  methods: {
    changeTab(e) {
      this.currentTab = e.index;
      if (this.scrollTop >= this.mineContentHeight - this.navHeight) {
        common_vendor.index.pageScrollTo({
          scrollTop: this.mineContentHeight - this.navHeight,
          duration: 0
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  const _component_dynamic_list = common_vendor.resolveComponent("dynamic-list");
  const _component_activity_list = common_vendor.resolveComponent("activity-list");
  (_easycom_uni_icons2 + _easycom_u_tabs2 + _easycom_u_sticky2 + _component_dynamic_list + _component_activity_list)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_u_tabs = () => "../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_sticky = () => "../uni_modules/vk-uview-ui/components/u-sticky/u-sticky.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_u_tabs + _easycom_u_sticky)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.navHeight
  }, $data.navHeight ? {
    b: common_vendor.t($data.userInfo.nickName),
    c: $data.navHeight + "px",
    d: $data.statusBarHeight + "px",
    e: $data.mineHeaderOpacity
  } : {}, {
    f: $data.userInfo.avatar,
    g: common_vendor.t($data.userInfo.nickName),
    h: common_vendor.t($data.userInfo.account),
    i: common_vendor.t($data.userInfo.signature || "这个人还没有个性签名"),
    j: common_vendor.f($data.InfoTagsFields, (item, k0, i0) => {
      return common_vendor.e({
        a: item === "age"
      }, item === "age" ? {
        b: "1c081928-0-" + i0,
        c: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-40nan-1",
          size: "24rpx",
          color: "#7fc1fe"
        })
      } : {}, {
        d: common_vendor.t($data.userInfo[item]),
        e: item === "age" && $data.userInfo[item]
      }, item === "age" && $data.userInfo[item] ? {} : {}, {
        f: item
      });
    }),
    k: common_vendor.p({
      type: "gear",
      size: "30rpx",
      color: "#fff"
    }),
    l: $data.navHeight + "px",
    m: common_vendor.o($options.changeTab),
    n: common_vendor.o(($event) => $data.currentTab = $event),
    o: common_vendor.p({
      list: $data.tabs,
      ["is-scroll"]: false,
      ["active-color"]: "#000",
      ["inactive-color"]: "#989898",
      bold: false,
      height: 90,
      modelValue: $data.currentTab
    }),
    p: common_vendor.p({
      ["offset-top"]: $options.navHeightOfRpx,
      ["h5-nav-height"]: $data.navHeight
    }),
    q: common_vendor.sr("dynamicList", "1c081928-4"),
    r: $data.currentTab === 0,
    s: $data.screenHeight - $data.navHeight - $data.tabsHeight + "px",
    t: common_vendor.sr("activityList", "1c081928-5"),
    v: common_vendor.p({
      mode: "participate"
    }),
    w: $data.currentTab === 1,
    x: $data.screenHeight - $data.navHeight - $data.tabsHeight + "px",
    y: common_vendor.sr("publishList", "1c081928-6"),
    z: common_vendor.p({
      mode: "publish"
    }),
    A: $data.currentTab === 2,
    B: $data.screenHeight - $data.navHeight - $data.tabsHeight + "px"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uniapp/party-together-uni-app/pages/mine.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
