"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      BaseUserInfoFieldsList: []
      // editModalShow: false,
      // editFieldName: '',
      // editFieldKey: '',
      // value: '',
    };
  },
  onLoad() {
    const app = getApp();
    const { userInfo, BaseUserInfoFieldsList } = app.globalData;
    this.userInfo = userInfo;
    this.BaseUserInfoFieldsList = BaseUserInfoFieldsList;
  },
  onReady() {
  },
  onShow() {
  },
  methods: {
    editField(item) {
      common_vendor.index.navigateTo({
        url: `/pages/personal/editField?fieldKey=${item.fieldKey}`
      });
    }
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
    c: common_vendor.f($data.BaseUserInfoFieldsList, (item, k0, i0) => {
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
      } : item.fieldKey === "region" ? {
        j: common_vendor.t($data.userInfo[item.fieldKey].join(" "))
      } : {
        k: common_vendor.t($data.userInfo[item.fieldKey])
      }, {
        d: item.fieldKey === "gender",
        f: item.fieldKey === "birthday",
        i: item.fieldKey === "region",
        l: "5d1a1aa6-2-" + i0,
        m: item.fieldKey,
        n: common_vendor.o(($event) => $options.editField(item), item.fieldKey)
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
