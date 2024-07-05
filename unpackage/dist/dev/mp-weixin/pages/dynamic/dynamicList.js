"use strict";
const common_vendor = require("../../common/vendor.js");
const waterFall = () => "../../components/water-fall/water-fall.js";
const _sfc_main = {
  components: {
    waterFall
  },
  data() {
    return {
      data: [],
      loading: false,
      current: 1,
      size: 10,
      total: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.current > 1 && this.data.length >= this.total)
        return;
      this.loading = true;
      setTimeout(() => {
        this.current++;
        const resultData = [];
        for (let i = 0; i < 10; i++) {
          resultData.push({
            id: i + (this.current - 1) * this.size,
            title: "这是动态标题",
            content: "这是动态内容",
            images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/01.jpg"],
            publisher: "周啊粥",
            publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
            like: true,
            likeCount: 10
          });
        }
        this.data = this.data.concat(resultData);
        this.current++;
        this.total = 20;
        this.$nextTick(() => {
          this.loading = false;
        });
      }, 1e3);
    },
    clickItem(item) {
      console.log(item);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  const _easycom_water_fall2 = common_vendor.resolveComponent("water-fall");
  (_easycom_uni_icons2 + _easycom_u_loadmore2 + _easycom_water_fall2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
const _easycom_water_fall = () => "../../components/water-fall/water-fall.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_u_loadmore + _easycom_water_fall)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w((slotProps, s0, i0) => {
      return {
        a: slotProps.item.images[0],
        b: common_vendor.t(slotProps.item.title),
        c: slotProps.item.publisherAvatar,
        d: common_vendor.t(slotProps.item.publisher),
        e: "90af92a5-1-" + i0 + ",90af92a5-0",
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
      path: "a",
      vueId: "90af92a5-0"
    }),
    b: common_vendor.p({
      status: $data.loading ? "loading" : $data.data.length >= $data.total ? "nomore" : "loadmore",
      ["load-text"]: {
        loadmore: "上拉加载",
        loading: "",
        nomore: "没有更多了"
      },
      ["font-size"]: "24"
    }),
    c: common_vendor.o($options.clickItem),
    d: common_vendor.p({
      data: $data.data
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-90af92a5"], ["__file", "D:/project/uniapp/party-together-uni-app/pages/dynamic/dynamicList.vue"]]);
wx.createComponent(Component);
