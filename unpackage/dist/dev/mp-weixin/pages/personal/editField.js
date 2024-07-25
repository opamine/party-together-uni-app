"use strict";
const common_vendor = require("../../common/vendor.js");
const MbtiData = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP"
];
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
          message: "6-15 个字符，仅可使用英文（必须）、数字、下划线"
        },
        nickName: {
          message: "请设置 2-24 个字符，不包括 @<>/ 等无效字符哦"
        }
      },
      // 规则回显
      regionSelectorShow: false,
      careerSelectorShow: false,
      careerOriginData: [
        {
          id: 0,
          name: "互联网",
          children: [
            { id: 0, name: "互联网从业者" },
            { id: 1, name: "前端开发工程师" },
            { id: 2, name: "后端开发工程师" }
          ]
        },
        {
          id: 1,
          name: "科技数码",
          children: [
            { id: 0, name: "数码博主" },
            { id: 1, name: "摄影博主" }
          ]
        }
      ],
      careerData: [
        ["互联网", "科技数码"],
        ["互联网从业者", "前端开发工程师", "后端开发工程师"]
      ],
      careerSelectorDefaultSelect: [0, 0],
      MbtiData,
      mbtiSelectorShow: false,
      mbtiSelectorDefaultSelect: [0]
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
    this.value = fieldKey === "career" ? [...userInfo[fieldKey]] : userInfo[fieldKey];
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
      case "career":
        this.modifiable = true;
        break;
      case "mbti":
        this.modifiable = true;
        break;
      default:
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
    bindBirthdayDateChange(e) {
      this.value = e.detail.value;
    },
    regionSelectConfirm(val) {
      const newVal = [val.province.name, val.city.name, val.area.name];
      this.value = newVal;
    },
    removeCareer(index) {
      this.value.splice(index, 1);
    },
    careerSelectStart() {
      if (this.value && this.value.length) {
        const lastCareerArr = this.value[this.value.length - 1].split("-");
        const columnIndex0 = this.careerOriginData.findIndex(
          (item) => item.name === lastCareerArr[0]
        );
        const columnIndex1 = this.careerOriginData[columnIndex0].children.findIndex(
          (item) => item.name === lastCareerArr[1]
        );
        this.careerSelectorDefaultSelect = [columnIndex0, columnIndex1];
        this.careerData[1] = this.careerOriginData[columnIndex0].children.map(
          (item) => item.name
        );
      } else {
        this.careerSelectorDefaultSelect = [0, 0];
        this.careerData[1] = this.careerOriginData[0].children.map((item) => item.name);
      }
      this.careerSelectorShow = true;
    },
    careerColumnChange({ column, index }) {
      if (column === 0) {
        this.careerData[1] = this.careerOriginData[index].children.map((item) => item.name);
      }
    },
    careerSelectConfirm(val) {
      const newCareer = this.careerData[0][val[0]] + "-" + this.careerData[1][val[1]];
      this.value.push(newCareer);
    },
    mbtiSelectStart() {
      if (this.value) {
        const targetIndex = this.MbtiData.findIndex((item) => item === this.value);
        this.mbtiSelectorDefaultSelect = targetIndex > -1 ? [targetIndex] : [0];
      } else {
        this.mbtiSelectorDefaultSelect = [0];
      }
      this.mbtiSelectorShow = true;
    },
    mbtiSelectConfirm(e) {
      this.value = this.MbtiData[e[0]];
    },
    handleSave() {
      if (["account", "nickName"].includes(this.editFieldKey)) {
        if (this.editFieldKey === "account") {
          const valid = this.value && /^\w{6,15}$/.test(this.value) && /[a-zA-Z]/.exec(this.value);
          if (!valid) {
            return common_vendor.index.showToast({
              icon: "none",
              title: `账号格式不符`,
              duration: 2e3
            });
          }
        }
        if (this.editFieldKey === "nickName") {
          const valid = this.value && /^[^@<>/]{2,24}$/.test(this.value);
          console.log(valid);
          if (!valid) {
            return common_vendor.index.showToast({
              icon: "none",
              title: `昵称格式不符`,
              duration: 2e3
            });
          }
        }
      }
      console.log(this.editFieldName);
      console.log(this.editFieldKey);
      console.log(this.value);
      const app = getApp();
      const { userInfo } = app.globalData;
      userInfo[this.editFieldKey] = this.value;
      common_vendor.index.navigateBack();
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
    z: common_vendor.o((...args) => $options.bindBirthdayDateChange && $options.bindBirthdayDateChange(...args))
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
      ["confirm-color"]: "#272a30",
      modelValue: $data.regionSelectorShow
    })
  } : {}, {
    G: $data.editFieldKey === "career"
  }, $data.editFieldKey === "career" ? common_vendor.e({
    H: common_vendor.f($data.value, (item, index, i0) => {
      return {
        a: common_vendor.t(item.split("-")[1]),
        b: common_vendor.o(($event) => $options.removeCareer(index), item),
        c: "b1402b4c-5-" + i0,
        d: item
      };
    }),
    I: common_vendor.p({
      type: "closeempty",
      size: "28rpx"
    }),
    J: $data.value.length < 2
  }, $data.value.length < 2 ? {
    K: common_vendor.p({
      type: "plusempty",
      size: "28rpx",
      color: "#515151"
    }),
    L: common_vendor.o((...args) => $options.careerSelectStart && $options.careerSelectStart(...args))
  } : {}, {
    M: common_vendor.t($data.value && $data.value.length || 0),
    N: common_vendor.o($options.careerColumnChange),
    O: common_vendor.o($options.careerSelectConfirm),
    P: common_vendor.o(($event) => $data.careerSelectorShow = $event),
    Q: common_vendor.p({
      mode: "multiSelector",
      range: $data.careerData,
      ["default-selector"]: $data.careerSelectorDefaultSelect,
      ["confirm-color"]: "#272a30",
      modelValue: $data.careerSelectorShow
    })
  }) : {}, {
    R: $data.editFieldKey === "mbti"
  }, $data.editFieldKey === "mbti" ? {
    S: common_vendor.t($data.value),
    T: common_vendor.o((...args) => $options.mbtiSelectStart && $options.mbtiSelectStart(...args)),
    U: common_vendor.o($options.mbtiSelectConfirm),
    V: common_vendor.o(($event) => $data.mbtiSelectorShow = $event),
    W: common_vendor.p({
      mode: "selector",
      range: $data.MbtiData,
      ["default-selector"]: $data.mbtiSelectorDefaultSelect,
      ["confirm-color"]: "#272a30",
      modelValue: $data.mbtiSelectorShow
    })
  } : {}, {
    X: $data.rule[$data.editFieldKey]
  }, $data.rule[$data.editFieldKey] ? {
    Y: common_vendor.t($data.rule[$data.editFieldKey].message)
  } : {}, {
    Z: common_vendor.o($options.handleSave),
    aa: common_vendor.p({
      ["custom-style"]: {
        backgroundColor: $data.modifiable ? "#272a30" : "#eee",
        color: $data.modifiable ? "#fff" : "#999",
        border: "none"
      },
      ["hover-class"]: "none",
      ["hair-line"]: false,
      disabled: !$data.modifiable
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b1402b4c"]]);
wx.createPage(MiniProgramPage);
