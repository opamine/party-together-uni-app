"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    mode: {
      type: String,
      validator: (value) => ["participate", "publish"].includes(value)
    }
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
            title: "这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题",
            content: "这是一个很长的活动内容",
            images: ["https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/10.JPG"],
            publisher: "丸子",
            publisherAvatar: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png",
            startTime: 1719900150185,
            addressName: "文宋阁·肆舍",
            location: "浙江省杭州市萧山区望京C1座35楼E-F室",
            lnglat: [120.254429, 30.237911]
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
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_participator_list2 = common_vendor.resolveComponent("participator-list");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_participator_list2 + _easycom_u_loadmore2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_participator_list = () => "../../components/participator-list/participator-list.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_participator_list + _easycom_u_loadmore)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.data, (item, k0, i0) => {
      return {
        a: item.images[0],
        b: common_vendor.t(item.title),
        c: "7e55ff70-0-" + i0,
        d: "7e55ff70-1-" + i0,
        e: common_vendor.p({
          date: item.startTime,
          format: "yyyy.MM.dd hh:mm"
        }),
        f: "7e55ff70-2-" + i0,
        g: common_vendor.t(item.addressName),
        h: "7e55ff70-3-" + i0,
        i: common_vendor.t(item.publisher),
        j: "7e55ff70-4-" + i0,
        k: item.id,
        l: common_vendor.o((...args) => $options.clickItem && $options.clickItem(...args), item.id)
      };
    }),
    b: common_vendor.p({
      type: "calendar",
      size: "32rpx"
    }),
    c: common_vendor.p({
      type: "location",
      size: "32rpx"
    }),
    d: common_vendor.p({
      type: "person",
      size: "32rpx"
    }),
    e: common_vendor.p({
      status: $data.loading ? "loading" : $data.data.length >= $data.total ? "nomore" : "loadmore",
      ["load-text"]: {
        loadmore: "上拉加载",
        loading: "",
        nomore: "没有更多了"
      },
      ["font-size"]: "24"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7e55ff70"], ["__file", "D:/project/uniapp/party-together-uni-app/pages/activity/activityList.vue"]]);
wx.createComponent(Component);
