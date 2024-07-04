"use strict";
const common_vendor = require("../common/vendor.js");
const waterFall = () => "../components/water-fall/water-fall.js";
const participatorList = () => "../components/participator-list/participator-list.js";
const InfoTagsFields = ["age", "region", "career", "mbti"];
const _sfc_main = {
  components: {
    waterFall,
    participatorList
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
      tabsHeight: common_vendor.index.upx2px(90),
      dynamicData: [],
      current: 1,
      size: 10,
      total: 100,
      dynamicDataLoading: false,
      activityData: [
        {
          id: 0,
          title: "这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题",
          content: "这是一个很长的活动内容",
          images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/10.JPG"],
          publisher: "丸子",
          publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
          startTime: 1719900150185,
          addressName: "文宋阁·肆舍",
          location: "浙江省杭州市萧山区望京C1座35楼E-F室",
          lnglat: [120.254429, 30.237911]
        },
        {
          id: 1,
          title: "这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题",
          content: "这是一个很长的活动内容",
          images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/10.JPG"],
          publisher: "丸子",
          publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
          startTime: 1719900150185,
          addressName: "文宋阁·肆舍",
          location: "浙江省杭州市萧山区望京C1座35楼E-F室",
          lnglat: [120.254429, 30.237911]
        },
        {
          id: 2,
          title: "这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题",
          content: "这是一个很长的活动内容",
          images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/10.JPG"],
          publisher: "丸子",
          publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
          startTime: 1719900150185,
          addressName: "文宋阁·肆舍",
          location: "浙江省杭州市萧山区望京C1座35楼E-F室",
          lnglat: [120.254429, 30.237911]
        }
      ],
      publishData: [
        {
          title: "这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题",
          content: "这是一个很长的活动内容",
          images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/21.JPG"],
          publisher: "周啊粥",
          publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
          startTime: 1821121211551,
          addressName: "西湖杨公堤",
          location: "浙江省杭州市萧山区望京C1座35楼E-F室",
          lnglat: [120.254429, 30.237911]
        }
      ]
    };
  },
  computed: {
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
  onPageScroll: function(e) {
    this.scrollTop = e.scrollTop;
    if (e.scrollTop <= common_vendor.index.upx2px(150)) {
      this.mineHeaderOpacity = e.scrollTop / common_vendor.index.upx2px(150);
    } else {
      this.mineHeaderOpacity = 1;
    }
  },
  onReachBottom() {
    console.log("onReachBottom");
    switch (this.currentTab) {
      case 0:
        if (this.dynamicData.length >= this.total)
          return;
        this.dynamicDataLoading = true;
        setTimeout(() => {
          this.current++;
          for (let i = 0; i < 10; i++) {
            this.dynamicData.push({
              id: this.dynamicData.length,
              title: "这是动态标题",
              content: "这是动态内容",
              images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/01.jpg"],
              publisher: "周啊粥",
              publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
              like: true,
              likeCount: 10
            });
          }
        }, 1e3);
        break;
    }
  },
  onReady() {
    for (let i = 0; i < 10; i++) {
      this.dynamicData.push({
        id: this.dynamicData.length,
        title: "这是动态标题",
        content: "这是动态内容",
        images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/01.jpg"],
        publisher: "周啊粥",
        publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
        like: true,
        likeCount: 10
      });
      this.total = 100;
    }
  },
  methods: {
    changeTab(e) {
      this.currentTab = e.index;
    },
    clickItem(item) {
      console.log(item);
    }
  },
  onPullDownRefresh() {
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  const _easycom_water_fall2 = common_vendor.resolveComponent("water-fall");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_participator_list2 = common_vendor.resolveComponent("participator-list");
  (_easycom_uni_icons2 + _easycom_u_tabs2 + _easycom_u_sticky2 + _easycom_u_loadmore2 + _easycom_water_fall2 + _easycom_uni_dateformat2 + _easycom_participator_list2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_u_tabs = () => "../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_sticky = () => "../uni_modules/vk-uview-ui/components/u-sticky/u-sticky.js";
const _easycom_u_loadmore = () => "../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
const _easycom_water_fall = () => "../components/water-fall/water-fall.js";
const _easycom_uni_dateformat = () => "../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_participator_list = () => "../components/participator-list/participator-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_u_tabs + _easycom_u_sticky + _easycom_u_loadmore + _easycom_water_fall + _easycom_uni_dateformat + _easycom_participator_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.userInfo.nickName),
    b: $data.navHeight + "px",
    c: $data.statusBarHeight + "px",
    d: $data.mineHeaderOpacity,
    e: $data.userInfo.avatar,
    f: common_vendor.t($data.userInfo.nickName),
    g: common_vendor.t($data.userInfo.account),
    h: common_vendor.t($data.userInfo.signature || "这个人还没有个性签名"),
    i: common_vendor.f($data.InfoTagsFields, (item, k0, i0) => {
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
    j: common_vendor.p({
      type: "gear",
      size: "28rpx",
      color: "#fff"
    }),
    k: $data.navHeight + "px",
    l: common_vendor.o($options.changeTab),
    m: common_vendor.o(($event) => $data.currentTab = $event),
    n: common_vendor.p({
      list: $data.tabs,
      ["is-scroll"]: false,
      ["active-color"]: "#000",
      height: 90,
      modelValue: $data.currentTab
    }),
    o: common_vendor.p({
      ["offset-top"]: $options.navHeightOfRpx,
      ["h5-nav-height"]: $data.navHeight
    }),
    p: common_vendor.w((slotProps, s0, i0) => {
      return {
        a: slotProps.item.images[0],
        b: common_vendor.t(slotProps.item.title),
        c: slotProps.item.publisherAvatar,
        d: common_vendor.t(slotProps.item.publisher),
        e: "1c081928-5-" + i0 + ",1c081928-4",
        f: common_vendor.p({
          type: slotProps.item.like ? "heart-filled" : "heart",
          color: slotProps.item.like ? "#e44747" : "#5f5f5f",
          size: "36rpx"
        }),
        g: common_vendor.t(slotProps.item.likeCount),
        h: i0,
        i: s0
      };
    }, {
      name: "d",
      path: "p",
      vueId: "1c081928-4"
    }),
    q: common_vendor.p({
      status: $data.dynamicDataLoading ? "loading" : $data.dynamicData.length >= $data.total ? "nomore" : "loadmore",
      ["load-text"]: {
        loadmore: "上拉加载",
        loading: "",
        nomore: "没有更多了"
      },
      ["font-size"]: "24"
    }),
    r: common_vendor.o($options.clickItem),
    s: common_vendor.p({
      data: $data.dynamicData
    }),
    t: $data.currentTab === 0,
    v: $data.screenHeight - $data.navHeight - $data.tabsHeight + "px",
    w: common_vendor.f($data.activityData, (item, k0, i0) => {
      return {
        a: item.images[0],
        b: common_vendor.t(item.title),
        c: "1c081928-7-" + i0,
        d: "1c081928-8-" + i0,
        e: common_vendor.p({
          date: item.startTime,
          format: "yyyy.MM.dd hh:mm"
        }),
        f: "1c081928-9-" + i0,
        g: common_vendor.t(item.addressName),
        h: "1c081928-10-" + i0,
        i: common_vendor.t(item.publisher),
        j: "1c081928-11-" + i0,
        k: item.id
      };
    }),
    x: common_vendor.p({
      type: "calendar",
      size: "32rpx"
    }),
    y: common_vendor.p({
      type: "location",
      size: "32rpx"
    }),
    z: common_vendor.p({
      type: "person",
      size: "32rpx"
    }),
    A: $data.currentTab === 1,
    B: $data.screenHeight - $data.navHeight - $data.tabsHeight + "px",
    C: common_vendor.f($data.publishData, (item, k0, i0) => {
      return {
        a: item.images[0],
        b: common_vendor.t(item.title),
        c: "1c081928-12-" + i0,
        d: "1c081928-13-" + i0,
        e: common_vendor.p({
          date: item.startTime,
          format: "yyyy.MM.dd hh:mm"
        }),
        f: "1c081928-14-" + i0,
        g: common_vendor.t(item.addressName),
        h: "1c081928-15-" + i0,
        i: common_vendor.t(item.publisher),
        j: "1c081928-16-" + i0,
        k: item.id
      };
    }),
    D: common_vendor.p({
      type: "calendar",
      size: "16"
    }),
    E: common_vendor.p({
      type: "location",
      size: "16"
    }),
    F: common_vendor.p({
      type: "person",
      size: "16"
    }),
    G: $data.currentTab === 2,
    H: $data.screenHeight - $data.navHeight - $data.tabsHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uniapp/party-together-uni-app/pages/mine.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
