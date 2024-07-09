"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
if (!Math) {
  "./pages/square.js";
  "./pages/order.js";
  "./pages/fans.js";
  "./pages/mine.js";
  "./pages/personal/edit.js";
}
const _sfc_main = {
  globalData: {
    statusBarHeight: 0,
    // 手机状态栏高度
    navigationBarHeight: 0,
    // 微信小程序导航栏高度，如果没有导航栏，高度为 0
    navHeight: 0,
    // 状态栏 + 导航栏 高度
    rightSafeArea: 0,
    // 右侧安全区（微信小程序胶囊和右边距）
    userInfo: {
      id: 1998,
      nickName: "周啊粥",
      account: "zzhou998",
      avatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
      signature: "❤ 逆水行舟，不进则退哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈asasasas",
      gender: "male",
      age: 26,
      birthday: 8839584e5,
      region: "浙江杭州",
      career: "互联网从业者",
      mbti: "INTJ",
      backgroundImage: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/baground01.jpg"
    }
  },
  onLaunch: function(e) {
    const statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const windowWidth = common_vendor.index.getSystemInfoSync().windowWidth;
    this.globalData.statusBarHeight = statusBarHeight;
    const custom = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    this.globalData.navigationBarHeight = custom.height + (custom.top - statusBarHeight) * 2;
    this.globalData.rightSafeArea = windowWidth - custom.left;
    this.globalData.navHeight = this.globalData.statusBarHeight + this.globalData.navigationBarHeight;
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/project/uniapp/party-together-uni-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(uni_modules_vkUviewUi_index.uView);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
