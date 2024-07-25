"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_qqmapWxJssdk_min = require("../../utils/qqmap-wx-jssdk.min.js");
const common_assets = require("../../common/assets.js");
function setMorKm(m) {
  var n = "";
  if (m) {
    if (m >= 1e3) {
      n = (m / 1e3).toFixed(2) + "km";
    } else {
      n = m + "m";
    }
  } else {
    n = "0m";
  }
  return n;
}
const _sfc_main = {
  data() {
    return {
      address: "杭州国际会议中心",
      longitude: 120.213752,
      latitude: 30.242448,
      current_longitude: 120.213752,
      current_latitude: 30.242448,
      key: "W4WBZ-TUD65-IDAIR-QPM36-HMFQ5-CGBZP",
      mapCtx: null,
      qqmapsdk: null,
      keyword: "",
      nearbyAddressList: [],
      // 附近地点集合
      selectedNearbyAddressId: void 0,
      setMorKm
    };
  },
  onLoad() {
    setTimeout(() => {
      this.qqmapsdk = new utils_qqmapWxJssdk_min.QQMapWX({
        key: this.key
      });
      this.currentLocation();
    }, 100);
  },
  onReady() {
  },
  methods: {
    regionchange(e) {
      let isEnd = e.type == "end";
      isEnd = e.type == "end" && (e.causedBy == "scale" || e.causedBy == "drag");
      if (isEnd) {
        this.address = "正在获取地址...";
        this.keyword = "";
        if (!this.mapCtx) {
          this.mapCtx = common_vendor.index.createMapContext("maps");
        }
        this.mapCtx.getCenterLocation({
          type: "gcj02",
          success: (res) => {
            this.latitude = res.latitude;
            this.longitude = res.longitude;
            this.getAddress(res.longitude, res.latitude);
          }
        });
      }
    },
    getAddress(lng, lat) {
      this.qqmapsdk.reverseGeocoder({
        location: {
          latitude: lat,
          longitude: lng
        },
        success: (res) => {
          this.address = res.result.formatted_addresses.recommend;
          this.getNearbyAddressList();
        },
        fail: (res) => {
          this.address = "逆地址解析失败";
        }
      });
    },
    innerJsonp(url, callback, callbackname) {
    },
    //根据经纬度对象获取位置详细信息
    getAddressH5(lng, lat) {
      let url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat + "," + lng}&key=${this.key}&get_poi=0&callbackName=QQmap&output=jsonp&coord_type=5`;
      this.innerJsonp(
        url,
        (res) => {
          if (res.status === 0) {
            this.address = res.result.formatted_addresses.recommend;
          } else {
            this.address = "逆地址解析失败";
            this.getNearbyAddressList();
          }
        },
        "QQmap"
      );
    },
    getNearbyAddressList(callback) {
      common_vendor.index.request({
        url: "https://apis.map.qq.com/ws/place/v1/search",
        //仅为示例，并非真实接口地址。
        data: {
          keyword: this.keyword || this.address,
          key: this.key,
          boundary: "nearby(" + this.current_latitude + "," + this.current_longitude + ",1000)"
        },
        header: {},
        success: (res) => {
          var _a;
          this.nearbyAddressList = ((_a = res.data) == null ? void 0 : _a.data) ?? [];
          if (callback)
            callback();
        }
      });
    },
    handleSearchNearbyAddress() {
      this.selectedNearbyAddressId = void 0;
      if (this.keyword) {
        const callback = () => {
          const firstMatchAddress = this.nearbyAddressList[0];
          if (firstMatchAddress) {
            const {
              title,
              location: { lat: latitude, lng: longitude }
            } = firstMatchAddress;
            this.address = title;
            this.longitude = longitude;
            this.latitude = latitude;
          }
        };
        this.getNearbyAddressList(callback);
      } else {
        this.currentLocation();
      }
    },
    handleSelectNearbyAddress(item) {
      this.selectedNearbyAddressId = item.id;
      const {
        title,
        location: { lat: latitude, lng: longitude }
      } = item;
      this.address = title;
      this.longitude = longitude;
      this.latitude = latitude;
    },
    currentLocation() {
      common_vendor.index.getLocation({
        type: "gcj02",
        success: (res) => {
          this.latitude = res.latitude;
          this.longitude = res.longitude;
          this.current_latitude = res.latitude;
          this.current_longitude = res.longitude;
          this.getAddress(res.longitude, res.latitude);
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "获取当前位置信息失败",
            icon: "none"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  _easycom_u_input2();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
if (!Math) {
  _easycom_u_input();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1,
    c: common_vendor.o((...args) => $options.currentLocation && $options.currentLocation(...args)),
    d: $data.longitude,
    e: $data.latitude,
    f: common_vendor.o((...args) => $options.regionchange && $options.regionchange(...args)),
    g: common_vendor.o(($event) => $data.keyword = $event),
    h: common_vendor.p({
      border: true,
      clearable: true,
      trim: true,
      placeholder: "搜索地点",
      modelValue: $data.keyword
    }),
    i: common_vendor.t($data.keyword ? "搜索" : "定位"),
    j: common_vendor.o((...args) => $options.handleSearchNearbyAddress && $options.handleSearchNearbyAddress(...args)),
    k: common_vendor.f($data.nearbyAddressList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t($data.setMorKm(item._distance)),
        c: common_vendor.t(item.address),
        d: item.id,
        e: common_vendor.n(item.id === $data.selectedNearbyAddressId ? "active" : ""),
        f: common_vendor.o(($event) => $options.handleSelectNearbyAddress(item), item.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-77260e9c"]]);
wx.createPage(MiniProgramPage);
