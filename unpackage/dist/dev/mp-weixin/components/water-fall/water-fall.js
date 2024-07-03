"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["data"],
  data() {
    return {
      dataArr: [[], []]
    };
  },
  mounted() {
    this.handleData();
  },
  watch: {
    data: {
      handler() {
        this.handleData();
      },
      deep: true
    }
  },
  methods: {
    handleData() {
      this.data.forEach((item, index) => {
        const newIndex = index % 2;
        this.dataArr[newIndex].push(item);
      });
    },
    // 子元素点击事件
    clickItem(item) {
      this.$emit("clickItem", item);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.dataArr, (arr, index, i0) => {
      return {
        a: common_vendor.f(arr, (item, index2, i1) => {
          return {
            a: "d-" + i0 + "-" + i1,
            b: common_vendor.r("d", {
              item
            }, i0 + "-" + i1),
            c: index2,
            d: common_vendor.o(($event) => $options.clickItem(item), index2)
          };
        }),
        b: index === 0 ? "8px" : "0px",
        c: index
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c724d0a7"], ["__file", "D:/project/uniapp/party-together-uni-app/components/water-fall/water-fall.vue"]]);
wx.createComponent(Component);
