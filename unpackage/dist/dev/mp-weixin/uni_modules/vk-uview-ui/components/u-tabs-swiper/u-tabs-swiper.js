"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_vkUviewUi_libs_function_colorGradient = require("../../libs/function/colorGradient.js");
let color = uni_modules_vkUviewUi_libs_function_colorGradient.colorGradient;
const { windowWidth } = common_vendor.index.getSystemInfoSync();
const preId = "UEl_";
const _sfc_main = {
  name: "u-tabs-swiper",
  emits: ["update:modelValue", "input", "change"],
  props: {
    // 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度
    isScroll: {
      type: Boolean,
      default: true
    },
    //需循环的标签列表
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    // 当前活动tab的索引
    current: {
      type: [Number, String],
      default: 0
    },
    // 导航栏的高度和行高，单位rpx
    height: {
      type: [Number, String],
      default: 80
    },
    // 字体大小，单位rpx
    fontSize: {
      type: [Number, String],
      default: 30
    },
    // 过渡动画时长, 单位s
    // duration: {
    // 	type: [Number, String],
    // 	default: 0.5
    // },
    swiperWidth: {
      //line3生效, 外部swiper的宽度, 单位rpx
      type: [String, Number],
      default: 750
    },
    // 选中项的主题颜色
    activeColor: {
      type: String,
      default: "#2979ff"
    },
    // 未选中项的颜色
    inactiveColor: {
      type: String,
      default: "#303133"
    },
    // 菜单底部移动的bar的宽度，单位rpx
    barWidth: {
      type: [Number, String],
      default: 40
    },
    // 移动bar的高度
    barHeight: {
      type: [Number, String],
      default: 6
    },
    // 单个tab的左或右内边距（各占一半），单位rpx
    gutter: {
      type: [Number, String],
      default: 40
    },
    // 如果是绝对定位，添加z-index值
    zIndex: {
      type: [Number, String],
      default: 1
    },
    // 导航栏的背景颜色
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    //滚动至中心目标类型
    autoCenterMode: {
      type: String,
      default: "window"
    },
    // 读取传入的数组对象的属性(tab名称)
    name: {
      type: String,
      default: "name"
    },
    // 读取传入的数组对象的属性(徽标数)
    count: {
      type: String,
      default: "count"
    },
    // 徽标数位置偏移
    offset: {
      type: Array,
      default: () => {
        return [5, 20];
      }
    },
    // 活动tab字体是否加粗
    bold: {
      type: Boolean,
      default: true
    },
    // 当前活动tab item的样式
    activeItemStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 是否显示底部的滑块
    showBar: {
      type: Boolean,
      default: true
    },
    // 底部滑块的自定义样式
    barStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      scrollLeft: 0,
      // 滚动scroll-view的左边滚动距离
      tabQueryInfo: [],
      // 存放对tab菜单查询后的节点信息
      windowWidth: 0,
      // 屏幕宽度，单位为px
      //scrollBarLeft: 0, // 移动bar需要通过translateX()移动的距离
      animationFinishCurrent: this.current,
      componentsWidth: 0,
      line3AddDx: 0,
      line3Dx: 0,
      preId,
      sW: 0,
      tabsInfo: [],
      colorGradientArr: [],
      colorStep: 100
      // 两个颜色之间的渐变等分
    };
  },
  computed: {
    // 获取当前活跃的current值
    getCurrent() {
      const current = Number(this.current);
      if (current > this.getTabs.length - 1) {
        return this.getTabs.length - 1;
      }
      if (current < 0)
        return 0;
      return current;
    },
    getTabs() {
      return this.list;
    },
    // 滑块需要移动的距离
    scrollBarLeft() {
      return Number(this.line3Dx) + Number(this.line3AddDx);
    },
    // 滑块的宽度转为px单位
    barWidthPx() {
      return common_vendor.index.upx2px(this.barWidth);
    },
    // tab的样式
    tabItemStyle() {
      return (index) => {
        let style = {
          height: this.height + "rpx",
          lineHeight: this.height + "rpx",
          padding: `0 ${this.gutter / 2}rpx`,
          color: this.tabsInfo.length > 0 ? this.tabsInfo[index] ? this.tabsInfo[index].color : this.activeColor : this.inactiveColor,
          fontSize: this.fontSize + "rpx",
          zIndex: this.zIndex + 2,
          fontWeight: index == this.getCurrent && this.bold ? "bold" : "normal"
        };
        if (index == this.getCurrent) {
          style = Object.assign(style, this.activeItemStyle);
        }
        return style;
      };
    },
    // 底部滑块的样式
    tabBarStyle() {
      let style = {
        width: this.barWidthPx + "px",
        height: this.barHeight + "rpx",
        borderRadius: "100px",
        backgroundColor: this.activeColor,
        left: this.scrollBarLeft + "px"
      };
      return Object.assign(style, this.barStyle);
    }
  },
  watch: {
    current(n, o) {
      this.change(n);
      this.setFinishCurrent(n);
    },
    list() {
      this.$nextTick(() => {
        this.init();
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.countPx();
      await this.getTabsInfo();
      this.countLine3Dx();
      this.getQuery(() => {
        this.setScrollViewToCenter();
      });
      this.colorGradientArr = color.colorGradient(this.inactiveColor, this.activeColor, this.colorStep);
    },
    // 获取各个tab的节点信息
    getTabsInfo() {
      return new Promise((resolve, reject) => {
        let view = common_vendor.index.createSelectorQuery().in(this);
        for (let i = 0; i < this.list.length; i++) {
          view.select("." + preId + i).boundingClientRect();
        }
        view.exec((res) => {
          const arr = [];
          for (let i = 0; i < res.length; i++) {
            res[i].color = this.inactiveColor;
            if (i == this.getCurrent)
              res[i].color = this.activeColor;
            arr.push(res[i]);
          }
          this.tabsInfo = arr;
          resolve();
        });
      });
    },
    // 当swiper滑动结束，计算滑块最终要停留的位置
    countLine3Dx() {
      const tab = this.tabsInfo[this.animationFinishCurrent];
      if (tab)
        this.line3Dx = tab.left + tab.width / 2 - this.barWidthPx / 2 - this.tabsInfo[0].left;
    },
    countPx() {
      this.sW = common_vendor.index.upx2px(Number(this.swiperWidth));
    },
    emit(index) {
      this.$emit("change", index);
    },
    change() {
      this.setScrollViewToCenter();
    },
    getQuery(cb) {
      try {
        let view = common_vendor.index.createSelectorQuery().in(this).select(".u-tabs");
        view.fields(
          {
            size: true
          },
          (data) => {
            if (data) {
              this.componentsWidth = data.width;
              if (cb && typeof cb === "function")
                cb(data);
            } else {
              this.getQuery(cb);
            }
          }
        ).exec();
      } catch (e) {
        this.componentsWidth = windowWidth;
      }
    },
    // 把活动tab移动到屏幕中心点
    setScrollViewToCenter() {
      let tab;
      tab = this.tabsInfo[this.animationFinishCurrent];
      if (tab) {
        let tabCenter = tab.left + tab.width / 2;
        let fatherWidth;
        if (this.autoCenterMode === "window") {
          fatherWidth = windowWidth;
        } else {
          fatherWidth = this.componentsWidth;
        }
        this.scrollLeft = tabCenter - fatherWidth / 2;
      }
    },
    setDx(dx) {
      let nextTabIndex = dx > 0 ? this.animationFinishCurrent + 1 : this.animationFinishCurrent - 1;
      nextTabIndex = nextTabIndex <= 0 ? 0 : nextTabIndex;
      nextTabIndex = nextTabIndex >= this.list.length ? this.list.length - 1 : nextTabIndex;
      this.tabsInfo[nextTabIndex];
      let nowTab = this.tabsInfo[this.animationFinishCurrent];
      let nowTabX = nowTab.left + nowTab.width / 2;
      let nextTab = this.tabsInfo[nextTabIndex];
      let nextTabX = nextTab.left + nextTab.width / 2;
      let distanceX = Math.abs(nextTabX - nowTabX);
      this.line3AddDx = dx / this.sW * distanceX;
      this.setTabColor(this.animationFinishCurrent, nextTabIndex, dx);
    },
    // 设置tab的颜色
    setTabColor(nowTabIndex, nextTabIndex, dx) {
      let colorIndex = Math.abs(Math.ceil(dx / this.sW * 100));
      let colorLength = this.colorGradientArr.length;
      colorIndex = colorIndex >= colorLength ? colorLength - 1 : colorIndex <= 0 ? 0 : colorIndex;
      this.tabsInfo[nextTabIndex].color = this.colorGradientArr[colorIndex];
      this.tabsInfo[nowTabIndex].color = this.colorGradientArr[colorLength - 1 - colorIndex];
    },
    // swiper结束滑动
    setFinishCurrent(current) {
      this.tabsInfo.map((val, index) => {
        if (current == index)
          val.color = this.activeColor;
        else
          val.color = this.inactiveColor;
        return val;
      });
      this.line3AddDx = 0;
      this.animationFinishCurrent = current;
      this.countLine3Dx();
    }
  }
};
if (!Array) {
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  _easycom_u_badge2();
}
const _easycom_u_badge = () => "../u-badge/u-badge.js";
if (!Math) {
  _easycom_u_badge();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($options.getTabs, (item, index, i0) => {
      return {
        a: "d226c2b0-0-" + i0,
        b: common_vendor.p({
          count: item[$props.count] || item["count"] || 0,
          offset: $props.offset,
          size: "mini"
        }),
        c: common_vendor.t(item[$props.name] || item["name"]),
        d: common_vendor.s($options.tabItemStyle(index)),
        e: index,
        f: common_vendor.n($data.preId + index),
        g: common_vendor.o(($event) => $options.emit(index), index)
      };
    }),
    b: $props.showBar
  }, $props.showBar ? {
    c: common_vendor.s($options.tabBarStyle)
  } : {}, {
    d: !$props.isScroll ? 1 : "",
    e: $data.scrollLeft,
    f: $props.zIndex + 1,
    g: $props.zIndex,
    h: $props.bgColor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d226c2b0"]]);
wx.createComponent(Component);
