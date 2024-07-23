"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        title: "",
        // 活动标题
        content: "",
        // 活动内容
        pictures: [],
        // 活动图片
        startTime: void 0,
        // 活动开始时间
        endTime: void 0,
        // 活动结束时间
        address: void 0,
        // 活动地址
        signUpDeadline: void 0,
        // 报名截止
        exitDeadline: void 0,
        // 退出截止
        phone: void 0,
        // 负责人联系电话
        groupChatQrcode: void 0
        // 群聊二维码图片
      },
      // 活动报名设置
      signUpConfigList: [{ id: Date.now(), count: void 0, price: void 0 }],
      rules: {
        title: [{ required: true, message: "请输入活动标题" }],
        content: [{ required: true, message: "请输入活动内容" }]
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
    changeCycle(val) {
      this.form.cycle = val;
    },
    addSignUpGroup() {
      this.signUpConfigList.push({
        id: Date.now(),
        count: void 0,
        price: void 0
      });
    },
    deleteSignUpGroup(index) {
      this.signUpConfigList.splice(index, 1);
    },
    submit() {
      const re = this.$refs.uploader.upload();
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
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_upload2 + _easycom_uni_icons2 + _easycom_u_form2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_upload = () => "../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_upload + _easycom_uni_icons + _easycom_u_form)();
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
    j: common_vendor.sr("uploader", "819605c9-6,819605c9-5"),
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
      ["max-count"]: 9
    }),
    o: common_vendor.p({
      label: "",
      ["border-bottom"]: false
    }),
    p: common_vendor.o(($event) => $data.form.startTime = $event),
    q: common_vendor.p({
      ["input-align"]: "right",
      disabled: true,
      placeholder: "请选择",
      modelValue: $data.form.startTime
    }),
    r: common_vendor.p({
      type: "forward",
      size: "30rpx",
      color: "#c6c6c6"
    }),
    s: common_vendor.p({
      label: "活动开始时间",
      prop: "startTime"
    }),
    t: common_vendor.o(($event) => $data.form.endTime = $event),
    v: common_vendor.p({
      ["input-align"]: "right",
      disabled: true,
      placeholder: "请选择",
      modelValue: $data.form.endTime
    }),
    w: common_vendor.p({
      type: "forward",
      size: "30rpx",
      color: "#c6c6c6"
    }),
    x: common_vendor.p({
      label: "活动结束时间",
      prop: "endTime"
    }),
    y: common_vendor.o(($event) => $data.form.address = $event),
    z: common_vendor.p({
      ["input-align"]: "right",
      disabled: true,
      placeholder: "请选择",
      modelValue: $data.form.address
    }),
    A: common_vendor.p({
      type: "location",
      size: "36rpx",
      color: "#c6c6c6"
    }),
    B: common_vendor.p({
      label: "活动地点",
      prop: "address"
    }),
    C: common_vendor.o(($event) => $data.form.signUpDeadline = $event),
    D: common_vendor.p({
      ["input-align"]: "right",
      disabled: true,
      placeholder: "请选择",
      modelValue: $data.form.signUpDeadline
    }),
    E: common_vendor.p({
      type: "forward",
      size: "30rpx",
      color: "#c6c6c6"
    }),
    F: common_vendor.p({
      label: "报名截止时间",
      prop: "signUpDeadline"
    }),
    G: common_vendor.o(($event) => $data.form.exitDeadline = $event),
    H: common_vendor.p({
      ["input-align"]: "right",
      disabled: true,
      placeholder: "请选择",
      modelValue: $data.form.exitDeadline
    }),
    I: common_vendor.p({
      type: "forward",
      size: "30rpx",
      color: "#c6c6c6"
    }),
    J: common_vendor.p({
      label: "退出截止时间",
      prop: "exitDeadline",
      ["border-bottom"]: false
    }),
    K: common_vendor.f($data.signUpConfigList, (item, index, i0) => {
      return common_vendor.e($data.signUpConfigList.length > 1 ? {
        a: common_vendor.t(index + 1),
        b: "819605c9-22-" + i0 + ",819605c9-0",
        c: common_vendor.p({
          type: "trash",
          size: "36rpx",
          color: "#fff"
        }),
        d: common_vendor.o(($event) => $options.deleteSignUpGroup(index), item.id)
      } : {}, {
        e: "819605c9-25-" + i0 + "," + ("819605c9-24-" + i0),
        f: common_vendor.o(($event) => item.count = $event, item.id),
        g: common_vendor.p({
          ["input-align"]: "right",
          placeholder: "请输入1-9999 的整数",
          modelValue: item.count
        }),
        h: "819605c9-24-" + i0 + "," + ("819605c9-23-" + i0),
        i: "819605c9-27-" + i0 + "," + ("819605c9-26-" + i0),
        j: common_vendor.o(($event) => item.price = $event, item.id),
        k: common_vendor.p({
          ["input-align"]: "right",
          placeholder: "默认 0 即免费，可输入 0-20万",
          modelValue: item.price
        }),
        l: "819605c9-26-" + i0 + "," + ("819605c9-23-" + i0),
        m: common_vendor.p({
          label: "价格(元)",
          ["border-bottom"]: index === $data.signUpConfigList.length - 1
        }),
        n: "819605c9-23-" + i0 + ",819605c9-0",
        o: index === $data.signUpConfigList.length - 1
      }, index === $data.signUpConfigList.length - 1 ? {
        p: "819605c9-28-" + i0 + ",819605c9-0",
        q: common_vendor.p({
          type: "plusempty",
          size: "36rpx"
        }),
        r: common_vendor.o((...args) => $options.addSignUpGroup && $options.addSignUpGroup(...args), item.id)
      } : {}, {
        s: item.id
      });
    }),
    L: $data.signUpConfigList.length > 1,
    M: common_vendor.p({
      label: "活动人数(人)"
    }),
    N: common_vendor.p({
      ["label-width"]: "180"
    }),
    O: common_vendor.o(($event) => $data.form.phone = $event),
    P: common_vendor.p({
      ["input-align"]: "right",
      placeholder: "请输入电话号码",
      modelValue: $data.form.phone
    }),
    Q: common_vendor.p({
      label: "联系电话",
      prop: "phone"
    }),
    R: common_vendor.o(($event) => $data.form.groupChatQrcode = $event),
    S: common_vendor.p({
      ["input-align"]: "right",
      disabled: true,
      placeholder: "请选择",
      modelValue: $data.form.groupChatQrcode
    }),
    T: common_vendor.p({
      type: "forward",
      size: "30rpx",
      color: "#c6c6c6"
    }),
    U: common_vendor.p({
      label: "群聊二维码",
      prop: "groupChatQrcode",
      ["border-bottom"]: false
    }),
    V: common_vendor.sr("form1", "819605c9-0"),
    W: common_vendor.p({
      model: $data.form,
      errorType: ["toast"],
      ["label-width"]: 180
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-819605c9"]]);
wx.createPage(MiniProgramPage);
