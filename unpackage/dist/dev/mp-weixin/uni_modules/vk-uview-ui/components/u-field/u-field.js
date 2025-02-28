"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-field",
  emits: ["update:modelValue", "input", "focus", "blur", "confirm", "right-icon-click", "click"],
  props: {
    value: [Number, String],
    modelValue: [Number, String],
    icon: String,
    rightIcon: String,
    arrowDirection: {
      type: String,
      default: "right"
    },
    required: Boolean,
    label: String,
    password: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    // 左边标题的宽度单位rpx
    labelWidth: {
      type: [Number, String],
      default: 130
    },
    // 对齐方式，left|center|right
    labelAlign: {
      type: String,
      default: "left"
    },
    inputAlign: {
      type: String,
      default: "left"
    },
    iconColor: {
      type: String,
      default: "#606266"
    },
    autoHeight: {
      type: Boolean,
      default: true
    },
    errorMessage: {
      type: [String, Boolean],
      default: ""
    },
    placeholder: String,
    placeholderStyle: String,
    focus: Boolean,
    fixed: Boolean,
    type: {
      type: String,
      default: "text"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    confirmType: {
      type: String,
      default: "done"
    },
    // lable的位置，可选为 left-左边，top-上边
    labelPosition: {
      type: String,
      default: "left"
    },
    // 输入框的自定义样式
    fieldStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 清除按钮的大小
    clearSize: {
      type: [Number, String],
      default: 30
    },
    // lable左边的图标样式，对象形式
    iconStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 是否显示上边框
    borderTop: {
      type: Boolean,
      default: false
    },
    // 是否显示下边框
    borderBottom: {
      type: Boolean,
      default: true
    },
    // 是否自动去除两端的空格
    trim: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      focused: false,
      itemIndex: 0
    };
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    inputWrapStyle() {
      let style = {};
      style.textAlign = this.inputAlign;
      if (this.labelPosition == "left") {
        style.margin = `0 8rpx`;
      } else {
        style.marginRight = `8rpx`;
      }
      return style;
    },
    rightIconStyle() {
      let style = {};
      let arrowDirectionObj = {
        "top": "-90deg",
        "bottom": "90deg",
        "left": "180deg",
        "right": "0deg"
      };
      let deg = arrowDirectionObj[this.arrowDirection] || "0deg";
      style.transform = "rotate(" + deg + ")";
      return style;
    },
    labelStyle() {
      let style = {};
      if (this.labelAlign == "left")
        style.justifyContent = "flext-start";
      if (this.labelAlign == "center")
        style.justifyContent = "center";
      if (this.labelAlign == "right")
        style.justifyContent = "flext-end";
      return style;
    },
    // uni不支持在computed中写style.justifyContent = 'center'的形式，故用此方法
    justifyContent() {
      if (this.labelAlign == "left")
        return "flex-start";
      if (this.labelAlign == "center")
        return "center";
      if (this.labelAlign == "right")
        return "flex-end";
    },
    // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
    inputMaxlength() {
      return Number(this.maxlength);
    },
    // label的位置
    fieldInnerStyle() {
      let style = {};
      if (this.labelPosition == "left") {
        style.flexDirection = "row";
      } else {
        style.flexDirection = "column";
      }
      return style;
    }
  },
  methods: {
    onInput(event) {
      let value = event.detail.value;
      if (this.trim)
        value = this.$u.trim(value);
      this.$emit("input", value);
      this.$emit("update:modelValue", value);
    },
    onFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    onBlur(event) {
      setTimeout(() => {
        this.focused = false;
      }, 100);
      this.$emit("blur", event);
    },
    onConfirm(e) {
      this.$emit("confirm", e.detail.value);
    },
    onClear(event) {
      this.$emit("input", "");
      this.$emit("update:modelValue", "");
    },
    rightIconClick() {
      this.$emit("right-icon-click");
      this.$emit("click");
    },
    fieldClick() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.icon
  }, $props.icon ? {
    b: common_vendor.p({
      size: "32",
      ["custom-style"]: $props.iconStyle,
      name: $props.icon,
      color: $props.iconColor
    })
  } : {}, {
    c: common_vendor.t($props.label),
    d: common_vendor.n(_ctx.$slots.icon || $props.icon ? "u-label-left-gap" : ""),
    e: common_vendor.n($props.required ? "u-required" : ""),
    f: $options.justifyContent,
    g: $props.labelPosition == "left" ? `0 0 ${$props.labelWidth}rpx` : "1",
    h: $props.type == "textarea"
  }, $props.type == "textarea" ? {
    i: common_vendor.s($props.fieldStyle),
    j: $options.valueCom,
    k: $props.placeholder,
    l: $props.placeholderStyle,
    m: $props.disabled,
    n: $options.inputMaxlength,
    o: $props.focus,
    p: $props.autoHeight,
    q: $props.fixed,
    r: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    s: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    t: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    v: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args)),
    w: common_vendor.o((...args) => $options.fieldClick && $options.fieldClick(...args))
  } : {
    x: common_vendor.s($props.fieldStyle),
    y: $props.type,
    z: $options.valueCom,
    A: $props.password || $props.type === "password",
    B: $props.placeholder,
    C: $props.placeholderStyle,
    D: $props.disabled,
    E: $options.inputMaxlength,
    F: $props.focus,
    G: $props.confirmType,
    H: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    I: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    J: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    K: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args)),
    L: common_vendor.o((...args) => $options.fieldClick && $options.fieldClick(...args))
  }, {
    M: common_vendor.s($options.inputWrapStyle),
    N: $props.clearable && $options.valueCom != "" && $data.focused
  }, $props.clearable && $options.valueCom != "" && $data.focused ? {
    O: common_vendor.o($options.onClear),
    P: common_vendor.p({
      size: $props.clearSize,
      name: "close-circle-fill",
      color: "#c0c4cc"
    })
  } : {}, {
    Q: $props.rightIcon
  }, $props.rightIcon ? {
    R: common_vendor.o($options.rightIconClick),
    S: common_vendor.s($options.rightIconStyle),
    T: common_vendor.p({
      name: $props.rightIcon,
      color: "#c0c4cc",
      size: "26"
    })
  } : {}, {
    U: common_vendor.n($props.type == "textarea" ? "u-textarea-inner" : ""),
    V: common_vendor.n("u-label-postion-" + $props.labelPosition),
    W: $props.errorMessage !== false && $props.errorMessage != ""
  }, $props.errorMessage !== false && $props.errorMessage != "" ? {
    X: common_vendor.t($props.errorMessage),
    Y: $props.labelWidth + "rpx"
  } : {}, {
    Z: $props.borderTop ? 1 : "",
    aa: $props.borderBottom ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-69c4c737"]]);
wx.createComponent(Component);
