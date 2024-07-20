"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        title: "",
        content: ""
      },
      rules: {
        title: [{ required: true, message: "请输入活动标题", trigger: ["change", "blur"] }],
        content: [{ required: true, message: "请输入活动内容", trigger: ["change", "blur"] }]
      }
    };
  },
  onReady() {
    this.$refs.form1.setRules(this.rules);
  },
  methods: {
    uploadSuccess(data) {
      console.log(data);
    },
    uploadError(res) {
      console.log(res);
    },
    uploadAllSuccess(lists) {
      console.log(lists);
    },
    submit() {
      const re = this.$refs.uUpload.upload();
      console.log(re);
      this.$refs.form1.validate((valid) => {
        console.log(valid);
        if (valid) {
          common_vendor.index.showToast({
            icon: "none",
            title: "表单验证通过"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_upload2 + _easycom_u_form2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_upload = () => "../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_upload + _easycom_u_form)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.form.title = $event),
    b: common_vendor.p({
      placeholder: "活动标题",
      maxlength: "20",
      modelValue: $data.form.title
    }),
    c: common_vendor.t($data.form.title && $data.form.title.length || 0),
    d: common_vendor.p({
      label: "",
      prop: "title"
    }),
    e: common_vendor.o(($event) => $data.form.content = $event),
    f: common_vendor.p({
      type: "textarea",
      placeholder: "描述一下活动内容吧",
      height: "250",
      maxlength: "8000",
      modelValue: $data.form.content
    }),
    g: common_vendor.t($data.form.content && $data.form.content.length || 0),
    h: common_vendor.t(8e3),
    i: common_vendor.p({
      label: "",
      prop: "content"
    }),
    j: common_vendor.sr("uUpload", "819605c9-6,819605c9-5"),
    k: common_vendor.o($options.uploadSuccess),
    l: common_vendor.o($options.uploadError),
    m: common_vendor.o($options.uploadAllSuccess),
    n: common_vendor.p({
      action: "https://ramses.cn/api/upload/file",
      header: {
        Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjU2YjNhMzg1YjY1MjI3ZjBiYmFlODcwIiwiaWF0IjoxNzIxMzc0NjA1LCJleHAiOjE3MjE2MzM4MDV9.O6g4ZqUKVA_ig00lIXtXfeBHeXCqa66NT8XzKV3bRkypOPX9FGm-UqZPGtxUoWo9zVK64Z2dPrDyK-6DNkMrRt1JGOoY1b60jtrAvLt7c7eXSbC6TZbvVHZ36xSEm9o21l9DytSv4eKvGehmiGyM1JHyRiHj70Mqez9qZE2ksLP7b3SHqzbrFNI00yqY3QwwDeHz8D5rDPR5ko4NF1Inm5OE4Mq27gDeSmaKm5zVc0jCROvr-2BOY_8fRz3iolBiv1g6gXbn5newGWoPZufRx_QGwZlFUavt0gvqLmnJdATw8bOBR-9BmWBoB82BylUL5bGqzGbv89RvhWLOwwq83g"
      },
      ["auto-upload"]: false,
      ["max-size"]: 30 * 1024 * 1024,
      ["max-count"]: 3
    }),
    o: common_vendor.p({
      label: ""
    }),
    p: common_vendor.sr("form1", "819605c9-0"),
    q: common_vendor.p({
      model: $data.form,
      errorType: ["toast"]
    }),
    r: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-819605c9"]]);
wx.createPage(MiniProgramPage);
