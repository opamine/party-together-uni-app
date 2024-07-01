"use strict";
const common_vendor = require("../common/vendor.js");
const tuiTabs = () => "../components/thorui/tui-tabs/tui-tabs.js";
const waterFall = () => "../components/water-fall/water-fall.js";
const InfoTagsFields = ["age", "region", "career", "mbti"];
const _sfc_main = {
  components: {
    tuiTabs,
    waterFall
  },
  data() {
    return {
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
          name: "活动"
        },
        {
          name: "我的发布"
        }
      ],
      dynamicData: [
        {
          id: 0,
          title: "这是动态标题",
          content: "这是动态内容",
          images: [
            "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240701193658.jpg"
          ],
          publisher: "周啊粥",
          publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
          like: true,
          likeCount: 10
        },
        {
          id: 1,
          title: "这是动态标题",
          content: "这是动态内容",
          images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/IMG_E3164.JPG"],
          publisher: "周啊粥",
          publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
          like: false,
          likeCount: 20
        },
        {
          id: 2,
          title: "这是动态标题",
          content: "这是动态内容",
          images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/IMG_E3164.JPG"],
          publisher: "周啊粥",
          publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
          like: false,
          likeCount: 20
        },
        {
          id: 3,
          title: "这是动态标题",
          content: "这是动态内容",
          images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/IMG_E3164.JPG"],
          publisher: "周啊粥",
          publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
          like: false,
          likeCount: 20
        }
      ],
      activityData: [],
      publishData: []
    };
  },
  methods: {
    changeTab(e) {
      this.currentTab = e.index;
    },
    clickItem(item) {
      console.log(item);
    },
    scrollToUpper() {
      console.log("滚到顶了");
    },
    scrollToLower() {
      console.log("滚到底了");
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
  const _component_tui_tabs = common_vendor.resolveComponent("tui-tabs");
  const _easycom_water_fall2 = common_vendor.resolveComponent("water-fall");
  (_easycom_uni_icons2 + _component_tui_tabs + _easycom_water_fall2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_water_fall = () => "../components/water-fall/water-fall.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_water_fall)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatar,
    b: common_vendor.t($data.userInfo.nickName),
    c: common_vendor.t($data.userInfo.account),
    d: common_vendor.t($data.userInfo.signature || "这个人还没有个性签名"),
    e: common_vendor.f($data.InfoTagsFields, (item, k0, i0) => {
      return common_vendor.e({
        a: item === "age"
      }, item === "age" ? {
        b: "1c081928-0-" + i0,
        c: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-40nan-1",
          size: "12",
          color: "#7fc1fe"
        })
      } : {}, {
        d: common_vendor.t($data.userInfo[item]),
        e: item === "age" && $data.userInfo[item]
      }, item === "age" && $data.userInfo[item] ? {} : {}, {
        f: item
      });
    }),
    f: common_vendor.p({
      type: "gear",
      size: "20",
      color: "#fff"
    }),
    g: common_vendor.o($options.changeTab),
    h: common_vendor.p({
      tabs: $data.tabs,
      currentTab: $data.currentTab,
      sliderBgColor: "#000000",
      selectedColor: "#000",
      height: 90
    }),
    i: common_vendor.w((slotProps, s0, i0) => {
      return {
        a: slotProps.item.images[0],
        b: common_vendor.t(slotProps.item.title),
        c: slotProps.item.publisherAvatar,
        d: common_vendor.t(slotProps.item.publisher),
        e: "1c081928-4-" + i0 + ",1c081928-3",
        f: common_vendor.p({
          type: slotProps.item.like ? "heart-filled" : "heart",
          color: slotProps.item.like ? "#e44747" : "#5f5f5f",
          size: "18"
        }),
        g: common_vendor.t(slotProps.item.likeCount),
        h: i0,
        i: s0
      };
    }, {
      name: "d",
      path: "i",
      vueId: "1c081928-3"
    }),
    j: common_vendor.o($options.clickItem),
    k: common_vendor.o($options.scrollToUpper),
    l: common_vendor.o($options.scrollToLower),
    m: common_vendor.p({
      data: $data.dynamicData
    }),
    n: $data.currentTab
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uniapp/party-together-uni-app/pages/mine.vue"]]);
wx.createPage(MiniProgramPage);
