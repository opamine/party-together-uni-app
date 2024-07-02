"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    data: {
      type: Array,
      default: () => [
        "https://avatars.githubusercontent.com/u/49026458?v=4",
        "https://avatars.githubusercontent.com/u/2035953?s=40&v=4",
        "https://avatars.githubusercontent.com/u/88035011?s=40&v=4"
      ]
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.data, (item, index, i0) => {
      return {
        a: index,
        b: item,
        c: index * 25 + "rpx"
      };
    }),
    b: ($props.data.length > 0 ? ($props.data.length > 5 ? 5 : $props.data.length) + 1 : 0) * 25 + "rpx",
    c: common_vendor.t($props.data.length)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-01ae09b0"], ["__file", "D:/project/uniapp/party-together-uni-app/components/participator-list/participator-list.vue"]]);
wx.createComponent(Component);
