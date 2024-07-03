"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiSticky",
  emits: ["sticky", "change"],
  props: {
    scrollTop: {
      type: Number
    },
    //吸顶时与顶部的距离，单位px
    stickyTop: {
      type: [Number, String],
      default: 0
    },
    //是否指定容器，即内容放置插槽content内
    container: {
      type: Boolean,
      default: false
    },
    //是否是原生自带header
    isNativeHeader: {
      type: Boolean,
      default: true
    },
    //吸顶容器 高度 rpx
    stickyHeight: {
      type: String,
      default: "auto"
    },
    //占位容器背景颜色
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    //是否重新计算[有异步加载时使用,设置大于0的数]
    recalc: {
      type: Number,
      default: 0
    },
    //列表中的索引值
    index: {
      type: [Number, String],
      default: 0
    }
  },
  watch: {
    scrollTop(newValue, oldValue) {
      if (this.initialize != 0) {
        this.updateScrollChange(() => {
          this.updateStickyChange();
          this.initialize = 0;
        });
      } else {
        this.updateStickyChange();
      }
    },
    recalc(newValue, oldValue) {
      this.updateScrollChange(() => {
        this.updateStickyChange();
        this.initialize = 0;
      });
    }
  },
  created() {
    this.initialize = this.recalc;
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.updateScrollChange();
      }, 50);
    });
  },
  data() {
    const Id = `tui_${Math.ceil(Math.random() * 1e6).toString(36)}`;
    return {
      timer: null,
      top: 0,
      height: 0,
      isFixed: false,
      initialize: 0,
      //重新初始化
      tui_Id: Id
    };
  },
  methods: {
    updateStickyChange() {
      const top = this.top;
      const height = this.height;
      const scrollTop = this.scrollTop;
      let stickyTop = this.stickyTop;
      if (this.container) {
        this.isFixed = scrollTop + stickyTop >= top && scrollTop + stickyTop < top + height ? true : false;
      } else {
        this.isFixed = scrollTop + stickyTop >= top ? true : false;
      }
      this.$emit("sticky", {
        isFixed: this.isFixed,
        index: this.index
      });
    },
    updateScrollChange(callback) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        const selectId = `#${this.tui_Id}`;
        common_vendor.index.createSelectorQuery().in(this).select(selectId).fields({
          size: true,
          rect: true
        }, (res) => {
          if (res) {
            this.top = res.top + (this.scrollTop || 0);
            this.height = res.height;
            callback && callback();
            this.$emit("change", {
              index: Number(this.index),
              top: this.top
            });
          }
        }).exec();
      }, 0);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isFixed
  }, $data.isFixed ? {
    b: $props.stickyHeight,
    c: $props.backgroundColor
  } : {}, {
    d: $data.isFixed ? 1 : "",
    e: $data.isFixed ? $props.stickyTop + "px" : "auto",
    f: $data.tui_Id
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2e485390"], ["__file", "D:/project/uniapp/party-together-uni-app/components/thorui/tui-sticky/tui-sticky.vue"]]);
wx.createComponent(Component);
