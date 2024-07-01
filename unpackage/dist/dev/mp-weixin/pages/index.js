"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-mendian",
      size: "40"
    }),
    b: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-waimaixinxi",
      size: "40"
    }),
    c: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-jifen-L",
      size: "40"
    }),
    d: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-huiyuanqia",
      size: "40"
    }),
    e: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-youhuiquan",
      size: "40"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uniapp/party-together-uni-app/pages/index.vue"]]);
wx.createPage(MiniProgramPage);
