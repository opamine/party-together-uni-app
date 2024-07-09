"use strict";
const common_vendor = require("../../common/vendor.js");
const BaseInfoFieldsList = [
  { fieldName: "账号", fieldKey: "account" },
  { fieldName: "名字", fieldKey: "nickName" },
  { fieldName: "个性签名", fieldKey: "signature" },
  { fieldName: "性别", fieldKey: "gender" },
  { fieldName: "生日", fieldKey: "birthday" },
  { fieldName: "地区", fieldKey: "region" },
  { fieldName: "职业", fieldKey: "career" },
  { fieldName: "人格类型", fieldKey: "mbti" },
  { fieldName: "背景图", fieldKey: "backgroundImage" }
];
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      BaseInfoFieldsList
    };
  },
  onLoad() {
    const app = getApp();
    this.userInfo = app.globalData.userInfo;
  },
  onReady() {
  },
  onShow() {
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatar,
    b: common_vendor.p({
      type: "camera",
      size: "30rpx",
      color: "#fff"
    }),
    c: common_vendor.f($data.BaseInfoFieldsList, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.fieldName),
        b: item.fieldKey === "backgroundImage"
      }, item.fieldKey === "backgroundImage" ? {
        c: $data.userInfo.backgroundImage
      } : item.fieldKey === "gender" ? {
        e: common_vendor.t($data.userInfo[item.fieldKey] === "male" ? "男" : "女")
      } : item.fieldKey === "birthday" ? {
        g: "5d1a1aa6-1-" + i0,
        h: common_vendor.p({
          date: $data.userInfo[item.fieldKey],
          format: "yyyy-MM-dd"
        })
      } : {
        i: common_vendor.t($data.userInfo[item.fieldKey])
      }, {
        d: item.fieldKey === "gender",
        f: item.fieldKey === "birthday",
        j: "5d1a1aa6-2-" + i0,
        k: item.fieldKey
      });
    }),
    d: common_vendor.p({
      type: "forward",
      size: "30rpx",
      color: "#c6c6c6"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d1a1aa6"], ["__file", "D:/project/uniapp/party-together-uni-app/pages/personal/edit.vue"]]);
wx.createPage(MiniProgramPage);
