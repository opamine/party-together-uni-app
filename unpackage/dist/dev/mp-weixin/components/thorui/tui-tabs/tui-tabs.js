"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiTabs",
  emits: ["change"],
  props: {
    //标签页
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    //显示文本字段名称
    field: {
      type: String,
      default: "name"
    },
    badgeField: {
      type: String,
      default: "num"
    },
    //tabs宽度，不传值则默认使用windowWidth，单位px
    width: {
      type: [Number, String],
      default: 0
    },
    //rpx
    height: {
      type: Number,
      default: 80
    },
    //rpx 只对左右padding起作用，上下为0
    padding: {
      type: Number,
      default: 30
    },
    //背景色
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    //是否固定
    isFixed: {
      type: Boolean,
      default: false
    },
    //px
    top: {
      type: Number,
      default: 0
    },
    //是否去掉底部线条
    unlined: {
      type: Boolean,
      default: false
    },
    //当前选项卡
    currentTab: {
      type: Number,
      default: 0
    },
    isSlider: {
      type: Boolean,
      default: true
    },
    //滑块宽度
    sliderWidth: {
      type: Number,
      default: 68
    },
    //滑块高度
    sliderHeight: {
      type: Number,
      default: 6
    },
    //滑块背景颜色
    sliderBgColor: {
      type: String,
      default: ""
    },
    sliderRadius: {
      type: String,
      default: "50rpx"
    },
    //滑块bottom
    bottom: {
      type: String,
      default: "0"
    },
    //标签页宽度
    itemWidth: {
      type: String,
      default: ""
    },
    //字体颜色
    color: {
      type: String,
      default: "#666"
    },
    //选中后字体颜色
    selectedColor: {
      type: String,
      default: ""
    },
    //字体大小
    size: {
      type: Number,
      default: 28
    },
    //选中后 是否加粗 ，未选中则无效
    bold: {
      type: Boolean,
      default: false
    },
    //2.3.0+
    scale: {
      type: [Number, String],
      default: 1
    },
    //角标字体颜色
    badgeColor: {
      type: String,
      default: "#fff"
    },
    //角标背景颜色
    badgeBgColor: {
      type: String,
      default: ""
    },
    zIndex: {
      type: [Number, String],
      default: 996
    }
  },
  watch: {
    currentTab() {
      this.checkCor();
    },
    tabs() {
      this.checkCor();
    },
    width(val) {
      this.tabsWidth = val;
      this.checkCor();
    }
  },
  computed: {
    getItemWidth() {
      let width = 100 / (this.tabs.length || 4) + "%";
      return this.itemWidth ? this.itemWidth : width;
    },
    getSliderBgColor() {
      return this.sliderBgColor || common_vendor.index && common_vendor.index.$tui && common_vendor.index.$tui.color.primary || "#5677fc";
    },
    getSelectedColor() {
      return this.selectedColor || common_vendor.index && common_vendor.index.$tui && common_vendor.index.$tui.color.primary || "#5677fc";
    },
    getBadgeBgColor() {
      return this.badgeBgColor || common_vendor.index && common_vendor.index.$tui && common_vendor.index.$tui.color.pink || "#f74d54";
    }
  },
  created() {
    setTimeout(() => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          this.winWidth = res.windowWidth;
          this.tabsWidth = this.width == 0 ? this.winWidth : Number(this.width);
          this.checkCor();
        }
      });
    }, 0);
  },
  data() {
    return {
      winWidth: 0,
      tabsWidth: 0,
      scrollLeft: 0
    };
  },
  methods: {
    checkCor: function() {
      let tabsNum = this.tabs.length;
      let padding = common_vendor.index.upx2px(Number(this.padding));
      let width = this.tabsWidth - padding * 2;
      let left = (width / tabsNum - common_vendor.index.upx2px(Number(this.sliderWidth))) / 2 + padding;
      let scrollLeft = left;
      if (this.currentTab > 0) {
        scrollLeft = scrollLeft + width / tabsNum * this.currentTab;
      }
      this.scrollLeft = scrollLeft;
    },
    // 点击标题切换当前页时改变样式
    swichTabs: function(index) {
      let item = this.tabs[index];
      if (item && item.disabled)
        return;
      if (this.currentTab == index) {
        return false;
      } else {
        this.$emit("change", {
          index: Number(index),
          item
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.tabsWidth > 0
  }, $data.tabsWidth > 0 ? common_vendor.e({
    b: common_vendor.f($props.tabs, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item[$props.field]),
        b: item[$props.badgeField] || item.isDot
      }, item[$props.badgeField] || item.isDot ? {
        c: common_vendor.t(item.isDot ? "" : item[$props.badgeField]),
        d: common_vendor.n(item.isDot ? "tui-badge__dot" : "tui-tabs__badge"),
        e: $props.badgeColor,
        f: $options.getBadgeBgColor
      } : {}, {
        g: item.disabled ? 1 : "",
        h: $props.currentTab == index ? $options.getSelectedColor : $props.color,
        i: $props.bold && $props.currentTab == index ? "bold" : "normal",
        j: `scale(${$props.currentTab == index ? $props.scale : 1})`,
        k: index,
        l: common_vendor.o(($event) => $options.swichTabs(index), index)
      });
    }),
    c: $props.size + "rpx",
    d: $options.getItemWidth,
    e: $props.height + "rpx",
    f: $props.isSlider
  }, $props.isSlider ? {
    g: "translateX(" + $data.scrollLeft + "px)",
    h: $props.sliderWidth + "rpx",
    i: $props.sliderHeight + "rpx",
    j: $props.sliderRadius,
    k: $props.bottom,
    l: $options.getSliderBgColor,
    m: $props.bottom == "50%" ? "-" + $props.sliderHeight / 2 + "rpx" : 0
  } : {}, {
    n: common_vendor.n($props.isFixed ? "tui-tabs-fixed" : "tui-tabs-relative"),
    o: common_vendor.n($props.unlined ? "tui-unlined" : ""),
    p: $data.tabsWidth + "px",
    q: $props.height + "rpx",
    r: `0 ${$props.padding}rpx`,
    s: $props.backgroundColor,
    t: $props.isFixed ? $props.top + "px" : "auto",
    v: $props.isFixed ? $props.zIndex : "auto"
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-00f3d717"], ["__file", "D:/project/uniapp/party-together-uni-app/components/thorui/tui-tabs/tui-tabs.vue"]]);
wx.createComponent(Component);
