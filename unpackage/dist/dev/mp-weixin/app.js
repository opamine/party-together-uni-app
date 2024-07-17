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
  "./pages/personal/editField.js";
}
const BaseUserInfoFieldsList = [
  { fieldName: "账号", fieldKey: "account" },
  { fieldName: "昵称", fieldKey: "nickName" },
  { fieldName: "个性签名", fieldKey: "signature" },
  { fieldName: "性别", fieldKey: "gender" },
  { fieldName: "生日", fieldKey: "birthday" },
  { fieldName: "地区", fieldKey: "region" },
  { fieldName: "职业", fieldKey: "career" },
  { fieldName: "人格类型", fieldKey: "mbti" },
  { fieldName: "背景图", fieldKey: "backgroundImage" }
];
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
      nickNameLastModified: 1620773800570,
      account: "zzhou998",
      accountModified: false,
      avatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
      signature: "❤ 逆水行舟，不进则退",
      signatureLastModified: 1720773800570,
      gender: "male",
      age: 26,
      birthday: "1998-01-05",
      region: ["浙江省", "杭州市", "西湖区"],
      career: ["互联网-互联网从业者", "互联网-前端开发工程师"],
      mbti: "INTJ",
      backgroundImage: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/baground01.jpg"
    },
    BaseUserInfoFieldsList
  },
  onLaunch(e) {
    const statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const windowWidth = common_vendor.index.getSystemInfoSync().windowWidth;
    this.globalData.statusBarHeight = statusBarHeight;
    const custom = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    this.globalData.navigationBarHeight = custom.height + (custom.top - statusBarHeight) * 2;
    this.globalData.rightSafeArea = windowWidth - custom.left;
    this.globalData.navHeight = this.globalData.statusBarHeight + this.globalData.navigationBarHeight;
    console.log("App Launch");
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_vkUviewUi_index.uView);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
