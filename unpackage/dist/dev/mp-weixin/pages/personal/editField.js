"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tip: "",
      modifiable: false,
      // 是否可修改
      editFieldName: "",
      // 编辑的字段名称
      editFieldKey: "",
      // 编辑的字段
      value: void 0,
      // 当前值
      rule: {
        account: {
          pattern: "",
          message: "6-15 个字符，仅可使用英文（必须）、数字、下划线"
        },
        nickName: {
          pattern: "",
          message: "请设置 2-24 个字符，不包括 @<>/ 等无效字符哦"
        }
      },
      // 规则回显
      regionSelectorShow: false
    };
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    }
  },
  onLoad(options) {
    var _a;
    const { fieldKey } = options;
    const app = getApp();
    const { userInfo, BaseUserInfoFieldsList } = app.globalData;
    const targetEditFieldName = (_a = BaseUserInfoFieldsList.find(
      (item) => item.fieldKey === fieldKey
    )) == null ? void 0 : _a.fieldName;
    common_vendor.index.setNavigationBarTitle({
      title: `编辑${targetEditFieldName}`
    });
    this.editFieldName = targetEditFieldName;
    this.editFieldKey = fieldKey;
    this.value = userInfo[fieldKey];
    switch (fieldKey) {
      case "account":
        this.tip = !userInfo.accountModified ? "账号只可修改一次" : "修改次数已达上限";
        this.modifiable = !userInfo.accountModified;
        break;
      case "nickName":
        const nickNameModifiedRangeDays = (Date.now() - userInfo.nickNameLastModified) / (1 * 24 * 60 * 60 * 1e3);
        this.tip = nickNameModifiedRangeDays >= 7 ? "七天内可修改一次" : "抱歉，七天内只能修改一次";
        this.modifiable = nickNameModifiedRangeDays >= 7;
        break;
      case "signature":
        const signatureModifiedRangeDays = (Date.now() - userInfo.nickNameLastModified) / (1 * 24 * 60 * 60 * 1e3);
        this.tip = signatureModifiedRangeDays >= 3 ? "三天内可修改一次" : "抱歉，三天内只能修改一次";
        this.modifiable = signatureModifiedRangeDays >= 3;
        break;
      case "gender":
        this.modifiable = true;
        break;
      case "birthday":
        this.modifiable = true;
        break;
      case "region":
        this.modifiable = true;
        break;
    }
  },
  methods: {
    getDate(type) {
      const date = /* @__PURE__ */ new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    modifyGender(value) {
      this.value = value;
    },
    bindDateChange(e) {
      this.value = e.detail.value;
    },
    regionSelectConfirm(val) {
      const newVal = [val.province.name, val.city.name, val.area.name];
      this.value = newVal;
    },
    handleSave() {
      console.log(this.editFieldKey);
      console.log(this.value);
    }
  }
};
if (!Array) {
  const _easycom_u_field2 = common_vendor.resolveComponent("u-field");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_field2 + _easycom_uni_icons2 + _easycom_u_picker2 + _easycom_u_button2)();
}
const _easycom_u_field = () => "../../uni_modules/vk-uview-ui/components/u-field/u-field.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_u_picker = () => "../../uni_modules/vk-uview-ui/components/u-picker/u-picker.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_field + _easycom_uni_icons + _easycom_u_picker + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.tip
  }, $data.tip ? {
    b: common_vendor.t($data.tip)
  } : {}, {
    c: $data.editFieldKey === "account" || $data.editFieldKey === "nickName"
  }, $data.editFieldKey === "account" || $data.editFieldKey === "nickName" ? {
    d: common_vendor.t($data.value.length),
    e: common_vendor.t($data.editFieldKey === "account" ? 15 : 24),
    f: common_vendor.o(($event) => $data.value = $event),
    g: common_vendor.p({
      type: "text",
      disabled: !$data.modifiable,
      ["label-width"]: 0,
      ["border-bottom"]: false,
      clearable: false,
      maxlength: $data.editFieldKey === "account" ? 15 : 24,
      modelValue: $data.value
    })
  } : {}, {
    h: $data.editFieldKey === "signature"
  }, $data.editFieldKey === "signature" ? {
    i: common_vendor.o(($event) => $data.value = $event),
    j: common_vendor.p({
      type: "textarea",
      ["label-width"]: 0,
      ["border-bottom"]: false,
      clearable: false,
      maxlength: 100,
      modelValue: $data.value
    }),
    k: common_vendor.t($data.value.length),
    l: common_vendor.t(100)
  } : {}, {
    m: $data.editFieldKey === "gender"
  }, $data.editFieldKey === "gender" ? {
    n: common_vendor.p({
      type: "checkmarkempty",
      size: "28rpx"
    }),
    o: $data.value === "male",
    p: common_vendor.o(($event) => $options.modifyGender("male")),
    q: common_vendor.p({
      type: "checkmarkempty",
      size: "28rpx"
    }),
    r: $data.value === "female",
    s: common_vendor.o(($event) => $options.modifyGender("female"))
  } : {}, {
    t: $data.editFieldKey === "birthday"
  }, $data.editFieldKey === "birthday" ? {
    v: common_vendor.t($data.value),
    w: $data.value,
    x: $options.startDate,
    y: $options.endDate,
    z: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args))
  } : {}, {
    A: $data.editFieldKey === "region"
  }, $data.editFieldKey === "region" ? {
    B: common_vendor.t($data.value.join(" ")),
    C: common_vendor.o(($event) => $data.regionSelectorShow = true),
    D: common_vendor.o($options.regionSelectConfirm),
    E: common_vendor.o(($event) => $data.regionSelectorShow = $event),
    F: common_vendor.p({
      mode: "region",
      ["default-region"]: $data.value,
      ["confirm-color"]: "#333",
      modelValue: $data.regionSelectorShow
    })
  } : {}, {
    G: $data.rule[$data.editFieldKey]
  }, $data.rule[$data.editFieldKey] ? {
    H: common_vendor.t($data.rule[$data.editFieldKey].message)
  } : {}, {
    I: common_vendor.o($options.handleSave),
    J: common_vendor.p({
      ["custom-style"]: {
        backgroundColor: $data.modifiable ? "#333" : "#eee",
        color: $data.modifiable ? "#fff" : "#999",
        border: "none"
      },
      ["hover-class"]: "none",
      ["hair-line"]: false,
      disabled: !$data.modifiable
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b1402b4c"], ["__file", "D:/project/uniapp/party-together-uni-app/pages/personal/editField.vue"]]);
wx.createPage(MiniProgramPage);
