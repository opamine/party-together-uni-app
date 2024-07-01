"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      applicationData: [
        {
          id: 0,
          avatar: "https://avatars.githubusercontent.com/u/39261479?s=64&v=4",
          name: "李思思"
        },
        {
          id: 1,
          avatar: "https://avatars.githubusercontent.com/u/11247099?s=64&v=4",
          name: "肖恩"
        },
        {
          id: 2,
          avatar: "https://avatars.githubusercontent.com/u/10172199?s=96&v=4",
          name: "Devikl"
        },
        {
          id: 3,
          avatar: "https://avatars.githubusercontent.com/u/10172199?s=96&v=4",
          name: "Devikl"
        }
      ],
      collapseExpandIndexArray: ["0", "1"],
      groupListData: [
        { id: 0, groupName: "A组" },
        { id: 1, groupName: "B组" }
      ],
      patientsData: [
        {
          id: 0,
          name: "张三",
          avatar: "https://avatars.githubusercontent.com/u/10172199?s=96&v=4",
          gender: "female",
          remark: "这里是备注这里是备注",
          group: 0
        },
        {
          id: 1,
          name: "李四",
          avatar: "https://avatars.githubusercontent.com/u/615401?v=4",
          gender: "male",
          remark: "这里是备注这里是备注",
          group: 0
        },
        {
          id: 2,
          name: "王五",
          avatar: "https://avatars.githubusercontent.com/u/10216932?v=4",
          gender: "male",
          remark: "这里是备注这里是备注",
          group: 1
        },
        {
          id: 3,
          name: "周嘉善",
          avatar: "https://avatars.githubusercontent.com/u/16557978?v=4",
          gender: "male",
          remark: "这里是备注这里是备注",
          group: 1
        },
        {
          id: 4,
          name: "赵文静",
          avatar: "https://avatars.githubusercontent.com/u/90562015?s=64&v=4",
          gender: "male",
          remark: "这里是备注这里是备注",
          group: 1
        }
      ]
    };
  },
  methods: {
    collapseChange(expandIndexArr) {
      this.collapseExpandIndexArray = expandIndexArr;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_icons2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_collapse_item = () => "../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-fenxiang",
      size: "16",
      color: "#bbbbbb"
    }),
    b: $data.applicationData.length
  }, $data.applicationData.length ? {
    c: common_vendor.t($data.applicationData.length),
    d: common_vendor.f($data.applicationData.slice(0, 3), (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: "c31963d6-1-" + i0,
        d: index
      };
    }),
    e: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-cuowuguanbiquxiao",
      size: "12"
    })
  } : {}, {
    f: $data.groupListData.length
  }, $data.groupListData.length ? {
    g: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-fenzu",
      size: "14",
      color: "#bbbbbb"
    }),
    h: common_vendor.f($data.groupListData, (group, index, i0) => {
      return {
        a: "c31963d6-5-" + i0 + "," + ("c31963d6-4-" + i0),
        b: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: $data.collapseExpandIndexArray.find((item) => item === `${index}`) ? "icon-xiajiantou" : "icon-shangjiantou",
          size: "12",
          color: "#888ca5"
        }),
        c: common_vendor.t(group.groupName),
        d: common_vendor.t($data.patientsData.filter((item) => item.group === group.id).length),
        e: common_vendor.f($data.patientsData.filter((item) => item.group === group.id), (patient, k1, i1) => {
          return {
            a: patient.avatar,
            b: common_vendor.t(patient.name),
            c: "c31963d6-6-" + i0 + "-" + i1 + "," + ("c31963d6-4-" + i0),
            d: common_vendor.p({
              ["custom-prefix"]: "iconfont",
              type: patient.gender === "male" ? "icon-male" : "icon-female",
              size: "14",
              color: patient.gender === "male" ? "blue" : "pink"
            }),
            e: common_vendor.t(patient.remark),
            f: "c31963d6-7-" + i0 + "-" + i1 + "," + ("c31963d6-4-" + i0),
            g: patient.id
          };
        }),
        f: group.id,
        g: "c31963d6-4-" + i0 + ",c31963d6-3",
        h: common_vendor.p({
          open: Boolean($data.collapseExpandIndexArray.find((item) => item === `${index}`)),
          ["show-arrow"]: false,
          border: false,
          ["title-border"]: "none"
        })
      };
    }),
    i: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-shoucangxuanzhong",
      size: "20",
      color: "#ffbe43"
    }),
    j: common_vendor.o($options.collapseChange)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uniapp/party-together-uni-app/pages/fans.vue"]]);
wx.createPage(MiniProgramPage);
