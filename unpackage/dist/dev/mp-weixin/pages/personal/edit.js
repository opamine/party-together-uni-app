"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      BaseUserInfoFieldsList: []
    };
  },
  onLoad() {
    const app = getApp();
    this.BaseUserInfoFieldsList = app.globalData.BaseUserInfoFieldsList;
  },
  onShow() {
    const app = getApp();
    this.userInfo = app.globalData.userInfo;
    console.log(this.userInfo.account);
  },
  methods: {
    editField(item) {
      if (item.fieldKey === "backgroundImage")
        ;
      else {
        common_vendor.index.navigateTo({
          url: `/pages/personal/editField?fieldKey=${item.fieldKey}`
        });
      }
    },
    backgroundImageUploadSuccess(res) {
      this.$set(this.userInfo, "backgroundImage", res.data);
    },
    backgroundImageUploadError(err) {
      console.log(err);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_icons2 + _easycom_u_upload2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_u_upload = () => "../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_u_upload + _easycom_uni_dateformat)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatar,
    b: common_vendor.p({
      type: "camera",
      size: "30rpx",
      color: "#fff"
    }),
    c: common_vendor.f($data.BaseUserInfoFieldsList, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.fieldName),
        b: item.fieldKey === "backgroundImage"
      }, item.fieldKey === "backgroundImage" ? {
        c: $data.userInfo.backgroundImage,
        d: common_vendor.sr("uUpload1", "5d1a1aa6-1-" + i0, {
          "f": 1
        }),
        e: common_vendor.o($options.backgroundImageUploadSuccess, item.fieldKey),
        f: common_vendor.o($options.backgroundImageUploadError, item.fieldKey),
        g: "5d1a1aa6-1-" + i0,
        h: common_vendor.p({
          header: {
            Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjU2YjNhMzg1YjY1MjI3ZjBiYmFlODcwIiwiaWF0IjoxNzIxMjAzNzg4LCJleHAiOjE3MjE0NjI5ODh9.UcmK7_bBxiGrj_P7TvW1htND9HHaUWMZZ6-JfHaHJqGrw64A1tOj3ziC_Gg-UTcMkebUwQz03SWOASslJ35M0vX_wsrNi25ZinxRbPfHfY_Y_uP9hdjYa5yHRkxI7pVko8Q2uErpDdNs7_wN_UTJxnmaH5i4ZAfP88q3TLwDuj9uKbk_0EJjIEQYgsVoevzGuYBqZwWaHZfOYLYPPiNXWSW-zo0e9S-NwMNy6RGiAK8nfCjWyytu3t2C2MUgDpMdl_6J-dpZOi3HINAGsieDGf30tY2T06bh9Q-9Z1aDHNNBjz_yQcX10Na_ScR9gvpmBv02vYon2ZKmKo32ZLBwRQ"
          },
          action: "https://ramses.cn/api/upload/file",
          ["auto-upload"]: true,
          ["show-upload-list"]: false,
          ["custom-btn"]: true
        })
      } : item.fieldKey === "gender" ? {
        j: common_vendor.t($data.userInfo[item.fieldKey] === "male" ? "男" : "女")
      } : item.fieldKey === "birthday" ? {
        l: "5d1a1aa6-2-" + i0,
        m: common_vendor.p({
          date: $data.userInfo[item.fieldKey],
          format: "yyyy-MM-dd"
        })
      } : item.fieldKey === "region" ? {
        o: common_vendor.t($data.userInfo[item.fieldKey].join(" "))
      } : item.fieldKey === "career" ? {
        q: common_vendor.t($data.userInfo[item.fieldKey] && $data.userInfo[item.fieldKey].length && $data.userInfo[item.fieldKey].map((item2) => item2.split("-")[1]).join(" ") || "选择职业")
      } : {
        r: common_vendor.t($data.userInfo[item.fieldKey])
      }, {
        i: item.fieldKey === "gender",
        k: item.fieldKey === "birthday",
        n: item.fieldKey === "region",
        p: item.fieldKey === "career",
        s: "5d1a1aa6-3-" + i0,
        t: item.fieldKey,
        v: common_vendor.o(($event) => $options.editField(item), item.fieldKey)
      });
    }),
    d: common_vendor.p({
      type: "forward",
      size: "30rpx",
      color: "#c6c6c6"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d1a1aa6"]]);
wx.createPage(MiniProgramPage);
