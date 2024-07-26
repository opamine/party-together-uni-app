<template>
  <view class="container">
    <map
      id="maps"
      class="custom-maps"
      :longitude="longitude"
      :latitude="latitude"
      :scale="16"
      show-location
      @regionchange="regionchange"
    >
      <cover-image class="cover-image" src="/static/images/maps/location.png"></cover-image>
      <cover-image
        src="/static/images/maps/current.png?v=1"
        class="tui-current__img"
        @tap="currentLocation"
      ></cover-image>
    </map>
    <view class="nearby-container">
      <view class="search-container">
        <view class="input-container">
          <u-input
            v-model="keyword"
            :border="true"
            :clearable="true"
            :trim="true"
            placeholder="搜索地点"
          />
        </view>
        <view class="search-btn" @click="handleSearchNearbyAddress">{{
          keyword ? '搜索' : '定位'
        }}</view>
      </view>
      <view class="address-list-container">
        <view class="address-list">
          <view
            v-for="item in nearbyAddressList"
            :key="item.id"
            :class="['address-item', item.id === selectedNearbyAddressId ? 'active' : '']"
            @click="handleSelectNearbyAddress(item)"
          >
            <view class="address-info">
              <view class="address-title ellipsis">{{ item.title }}</view>
              <view class="address-desc ellipsis">
                <text style="color: #409eff; margin-right: 8rpx">{{
                  setMorKm(item._distance)
                }}</text>
                <text>{{ item.address }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="btn-container">
        <view class="custom-btn">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
  import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js';

  function setMorKm(m) {
    var n = '';
    if (m) {
      if (m >= 1000) {
        n = (m / 1000).toFixed(2) + 'km';
      } else {
        n = m + 'm';
      }
    } else {
      n = '0m';
    }
    return n;
  }

  export default {
    data() {
      return {
        address: '杭州国际会议中心',
        longitude: 120.213752,
        latitude: 30.242448,
        current_longitude: 120.213752,
        current_latitude: 30.242448,
        key: 'W4WBZ-TUD65-IDAIR-QPM36-HMFQ5-CGBZP',
        mapCtx: null,
        qqmapsdk: null,
        keyword: '',
        nearbyAddressList: [], // 附近地点集合
        selectedNearbyAddressId: undefined,
        setMorKm,
      };
    },
    onLoad() {
      setTimeout(() => {
        this.qqmapsdk = new QQMapWX({
          key: this.key,
        });
        this.currentLocation();
      }, 100);
    },
    onReady() {
      // #ifdef APP-PLUS
      if (!this.mapCtx) {
        this.mapCtx = uni.createMapContext('maps');
      }
      let mapObj = this.mapCtx.$getAppMap();
      mapObj.onstatuschanged = (e) => {
        // 地图发生变化的时候，获取中间点，也就是cover-image指定的位置
        if (this.longitude != 114.010857) {
          this.address = '正在获取地址...';
          this.keyword = '';
          this.mapCtx.getCenterLocation({
            type: 'gcj02',
            success: (res) => {
              this.latitude = res.latitude;
              this.longitude = res.longitude;
              this.getAddress(res.longitude, res.latitude);
            },
            fail: (err) => {
              console.log(err);
            },
          });
        }
      };
      // #endif
    },
    methods: {
      regionchange(e) {
        // 地图发生变化的时候，获取中间点，也就是cover-image指定的位置
        let isEnd = e.type == 'end';
        // #ifdef APP-PLUS || MP-WEIXIN
        isEnd = e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag');
        // #endif
        if (isEnd) {
          this.address = '正在获取地址...';
          this.keyword = '';
          if (!this.mapCtx) {
            this.mapCtx = uni.createMapContext('maps');
          }
          this.mapCtx.getCenterLocation({
            type: 'gcj02',
            success: (res) => {
              this.latitude = res.latitude;
              this.longitude = res.longitude;
              // #ifdef H5
              this.getAddressH5(res.longitude, res.latitude);
              // #endif

              // #ifndef H5
              this.getAddress(res.longitude, res.latitude);
              // #endif
            },
          });
        }
      },
      getAddress(lng, lat) {
        //根据经纬度获取地址信息
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: lat,
            longitude: lng,
          },
          success: (res) => {
            this.address = res.result.formatted_addresses.recommend;
            this.getNearbyAddressList();
          },
          fail: () => {
            this.address = '逆地址解析失败';
            uni.showToast({
              title: '逆地址解析失败',
              icon: 'none',
            });
          },
        });
      },
      innerJsonp(url, callback, callbackname) {
        // #ifdef H5
        window[callbackname] = callback;
        let tuiScript = document.createElement('script');
        tuiScript.src = url;
        tuiScript.type = 'text/javascript';
        document.head.appendChild(tuiScript);
        document.head.removeChild(tuiScript);
        // #endif
      },
      //根据经纬度对象获取位置详细信息
      getAddressH5(lng, lat) {
        let url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat + ',' + lng}&key=${
          this.key
        }&get_poi=0&callbackName=QQmap&output=jsonp&coord_type=5`;
        this.innerJsonp(
          url,
          (res) => {
            if (res.status === 0) {
              this.address = res.result.formatted_addresses.recommend;
              this.getNearbyAddressList();
            } else {
              this.address = '逆地址解析失败';
              uni.showToast({
                title: '逆地址解析失败',
                icon: 'none',
              });
            }
          },
          'QQmap'
        );
      },
      getNearbyAddressList(callback) {
        uni.request({
          url: 'https://apis.map.qq.com/ws/place/v1/search',
          data: {
            keyword: this.keyword || this.address,
            key: this.key,
            boundary:
              'nearby(' + this.current_latitude + ',' + this.current_longitude + ',' + 1000 + ')',
          },
          header: {},
          success: (res) => {
            this.nearbyAddressList = res.data?.data ?? [];
            if (callback) callback();
          },
          fail: () => {
            uni.showToast({
              title: '地址搜索失败',
              icon: 'none',
            });
          },
        });
      },
      handleSearchNearbyAddress() {
        this.selectedNearbyAddressId = undefined;
        if (this.keyword) {
          const callback = () => {
            const firstMatchAddress = this.nearbyAddressList[0];
            if (firstMatchAddress) {
              const {
                title,
                location: { lat: latitude, lng: longitude },
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
          location: { lat: latitude, lng: longitude },
        } = item;
        this.address = title;
        this.longitude = longitude;
        this.latitude = latitude;
      },
      currentLocation() {
        //当前位置
        uni.getLocation({
          // #ifdef APP-PLUS || MP-WEIXIN
          type: 'gcj02',
          // #endif
          success: (res) => {
            this.latitude = res.latitude;
            this.longitude = res.longitude;
            this.current_latitude = res.latitude;
            this.current_longitude = res.longitude;

            // #ifdef H5
            this.getAddressH5(res.longitude, res.latitude);
            // #endif

            // #ifdef MP
            this.getAddress(res.longitude, res.latitude);
            // #endif
          },
          fail: (err) => {
            console.log(err);
            uni.showToast({
              title: '获取当前位置信息失败',
              icon: 'none',
            });
            // #ifdef H5
            this.getAddressH5(this.longitude, this.latitude);
            // #endif

            // #ifdef MP
            this.getAddress(this.longitude, this.latitude);
            // #endif
          },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  page {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .custom-maps {
      position: relative;
      /* #ifndef VUE3 */
      width: 100%;
      /* #endif */
      /* #ifdef VUE3 */
      width: 750rpx;
      /* #endif */
      height: 600rpx;
      .cover-image {
        height: 68rpx;
        width: 68rpx;
        position: absolute;
        /* #ifdef APP-PLUS */
        position: absolute;
        /* #endif */
        top: 50%;
        left: 50%;
        margin-top: -68rpx;
        margin-left: -34rpx;
      }

      .tui-current__img {
        position: absolute;
        /* #ifdef APP-PLUS */
        position: absolute;
        /* #endif */
        height: 80rpx;
        width: 80rpx;
        bottom: 60rpx;
        right: 60rpx;
        z-index: 9999;
      }
    }
    .nearby-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 600rpx);
      background-color: #fff;
      .search-container {
        display: flex;
        padding: 16rpx;
        .input-container {
          flex: 1;
          margin-right: 16rpx;
        }
        .search-btn {
          width: 120rpx;
          height: 70rpx;
          border: 1px solid #272a30;
          border-radius: 35px;
          background-color: #272a30;
          text-align: center;
          color: #fff;
          line-height: 70rpx;
          box-sizing: content-box;
        }
      }
      .address-list-container {
        flex: 1;
        overflow-y: auto;
        .address-list {
          padding: 0 16rpx 16rpx;
          .address-item {
            padding: 20rpx;
            transition: all 0.1s;
            &.active {
              background-color: #eee;
            }
            .address-info {
              color: #000;
              font-size: 28rpx;
            }
            .address-desc {
              margin-top: 8rpx;
              color: #646464;
              font-size: 24rpx;
            }
          }
        }
      }
      .btn-container {
        padding: 24rpx;
        padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
        padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
        border-top: 1px solid #eee;
        .custom-btn {
          height: 80rpx;
          border-radius: 40rpx;
          background-color: #272a30;
          line-height: 80rpx;
          text-align: center;
          color: #fff;
        }
      }
    }
  }

  .ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
