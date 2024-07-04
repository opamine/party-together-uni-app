"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
if (!Math) {
  "./pages/index.js";
  "./pages/order.js";
  "./pages/fans.js";
  "./pages/mine.js";
}
const _sfc_main = {
  onLaunch: function(e) {
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
