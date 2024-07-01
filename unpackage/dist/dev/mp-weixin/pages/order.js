"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      storeInfo: {
        name: "浙江杭州文新地铁站店",
        distance: "200"
      },
      pickUpType: 0,
      // 0: 自提 1: 外送
      // 分类及商品列表
      categoryList: [
        {
          id: 0,
          name: "人气Top",
          desc: "必喝爆款，无限回购",
          goods: [
            {
              id: 0,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁生椰拿铁生椰拿铁生椰拿铁生椰拿铁生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！3年突破7亿杯，原创YYDS！3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            },
            {
              id: 1,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            },
            {
              id: 2,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            },
            {
              id: 3,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            },
            {
              id: 4,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            },
            {
              id: 5,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            },
            {
              id: 6,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            }
          ]
        },
        { id: 1, name: "爆款套餐", desc: "必喝爆款，无限回购" },
        { id: 2, name: "520限定", desc: "必喝爆款，无限回购" },
        { id: 3, name: "健康冰咖季", desc: "必喝爆款，无限回购" },
        { id: 4, name: "生椰家族", desc: "必喝爆款，无限回购" },
        { id: 5, name: "美式家族", desc: "必喝爆款，无限回购" },
        { id: 6, name: "酱香拿铁", desc: "必喝爆款，无限回购" },
        { id: 7, name: "中国茶咖", desc: "必喝爆款，无限回购" },
        { id: 8, name: "大师咖啡", desc: "必喝爆款，无限回购" },
        { id: 9, name: "瑞纳冰", desc: "必喝爆款，无限回购" },
        {
          id: 10,
          name: "SOE小黑杯",
          desc: "必喝爆款，无限回购",
          goods: [
            {
              id: 0,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            },
            {
              id: 1,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            },
            {
              id: 2,
              categoryId: 0,
              img: "https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg",
              name: "生椰拿铁",
              desc: "3年突破7亿杯，原创YYDS！",
              price: "11.02",
              preferentialPrice: "9.9"
            }
          ]
        }
      ],
      scrollViewHeight: 0,
      // 计算得来的菜单滚动区域高度，需要赋值给 scroll-view
      currentCategoryId: 0,
      // 当前选中的菜单分类 id
      menuRightScrollTop: 0,
      oldMenuRightScrollTop: 0,
      timer: null
    };
  },
  computed: {
    // 分类商品卡片高度
    categoryGoodsCardScrollTopMap() {
      const categoryListGoodsCardHeightMap = this.categoryList.map((item) => {
        return 30 + 40 + (item.goods && item.goods.length || 0) * 96 + 12;
      });
      return categoryListGoodsCardHeightMap.map((_item, index) => {
        return categoryListGoodsCardHeightMap.slice(0, index + 1).reduce((sum, c) => sum + c, 0);
      });
    }
  },
  methods: {
    // 自提 or 外送 切换
    handleChangePickUpType(type) {
      this.pickUpType = type;
    },
    // 选中菜单分类目录
    handleClickCategory(category, index) {
      if (category.id === this.currentCategoryId)
        return;
      this.currentCategoryId = category.id;
      this.menuRightScrollTop = this.oldMenuRightScrollTop;
      this.$nextTick(() => {
        this.menuRightScrollTop = index === 0 ? 0 : this.categoryGoodsCardScrollTopMap[index - 1];
      });
    },
    // 菜单右侧滚动监听
    handleMenuRightScroll(e) {
      for (let i = 0; i < this.categoryGoodsCardScrollTopMap.length; i++) {
        if (e.detail.scrollTop < this.categoryGoodsCardScrollTopMap[i]) {
          this.currentCategoryId = this.categoryList[i].id;
          this.oldMenuRightScrollTop = e.detail.scrollTop;
          break;
        }
      }
    }
  },
  onReady() {
    common_vendor.index.getSystemInfo({
      success: (res) => {
        const viewHeight = res.windowHeight;
        const scrollViewContainer = common_vendor.index.createSelectorQuery().select(".menu-container");
        scrollViewContainer.boundingClientRect().exec((data) => {
          this.scrollViewHeight = viewHeight - data[0].top;
        });
      }
    });
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  (_easycom_uni_icons2 + _easycom_uni_notice_bar2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_notice_bar = () => "../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_notice_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.storeInfo.name),
    b: common_vendor.p({
      type: "right",
      size: "14"
    }),
    c: common_vendor.p({
      type: "location",
      size: "14",
      color: "#666666"
    }),
    d: common_vendor.t($data.storeInfo.distance),
    e: $data.pickUpType === 0 ? 1 : "",
    f: $data.pickUpType === 1 ? 1 : "",
    g: common_vendor.o(($event) => $options.handleChangePickUpType($data.pickUpType === 0 ? 1 : 0)),
    h: common_vendor.p({
      ["show-icon"]: true,
      scrollable: true,
      ["background-color"]: "#f5f7fc",
      color: "#2d40ed",
      text: "拿铁咖啡限时优惠，快来和你的小伙伴一起体验 9.9 的夏日清爽吧～"
    }),
    i: common_vendor.f($data.categoryList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: "menu-left-" + item.id,
        d: item.id === $data.currentCategoryId ? 1 : "",
        e: common_vendor.o(($event) => $options.handleClickCategory(item, index), item.id)
      };
    }),
    j: $data.scrollViewHeight + "px",
    k: "menu-left-" + $data.currentCategoryId,
    l: common_vendor.f($data.categoryList, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: common_vendor.t(category.desc),
        c: common_vendor.f(category.goods, (product, k1, i1) => {
          return {
            a: product.img,
            b: common_vendor.t(product.name),
            c: common_vendor.t(product.desc),
            d: common_vendor.t(product.preferentialPrice),
            e: common_vendor.t(product.price),
            f: "eb44ff31-3-" + i0 + "-" + i1,
            g: product.id
          };
        }),
        d: category.id
      };
    }),
    m: common_vendor.p({
      type: "plus-filled",
      size: "30"
    }),
    n: $data.scrollViewHeight + "px",
    o: $data.menuRightScrollTop,
    p: common_vendor.o((...args) => $options.handleMenuRightScroll && $options.handleMenuRightScroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eb44ff31"], ["__file", "D:/project/uniapp/party-together-uni-app/pages/order.vue"]]);
wx.createPage(MiniProgramPage);
