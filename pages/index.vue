<template>
  <view class="index-container">
    <view class="banner-container">
      <image src="../static/images/home/banner.svg" alt="banner" />
    </view>
    <view class="menu-container">
      <view class="main-actions">
        <view class="action-item">
          <view class="icon-container">
            <uni-icons custom-prefix="iconfont" type="icon-mendian" size="40" />
          </view>
          <view class="action-title">门店自取</view>
          <view class="action-describle">预约下单 到店自取</view>
        </view>
        <view class="action-item">
          <view class="icon-container">
            <uni-icons custom-prefix="iconfont" type="icon-waimaixinxi" size="40" />
          </view>
          <view class="action-title">外送 / 快递</view>
          <view class="action-describle">外卖下单 快速送达</view>
        </view>
      </view>
      <view class="sub-actions">
        <view class="action-item">
          <view class="icon-container">
            <uni-icons custom-prefix="iconfont" type="icon-jifen-L" size="40" />
          </view>
          <view class="action-title">积分商城</view>
          <view class="action-describle">攒积分兑好礼</view>
        </view>
        <view class="action-item">
          <view class="icon-container">
            <uni-icons custom-prefix="iconfont" type="icon-huiyuanqia" size="40" />
          </view>
          <view class="action-title">会员储值</view>
          <view class="action-describle">储值送豪礼</view>
        </view>
        <view class="action-item">
          <view class="icon-container">
            <uni-icons custom-prefix="iconfont" type="icon-youhuiquan" size="40" />
          </view>
          <view class="action-title">优惠中心</view>
          <view class="action-describle">领券下单更优惠</view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss">
  .index-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    overflow: auto;
    .banner-container {
      text-align: center;
      image {
        width: 70%;
      }
    }
    .menu-container {
      text-align: center;
      .main-actions {
        display: flex;
        .action-item {
          flex: 1;
          padding-top: 20px;
          padding-bottom: 20px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3);
          .action-title {
            margin-top: 4px;
            font-weight: 600;
            font-size: 18px;
          }
          .action-describle {
            margin-top: 6px;
            color: #7c7c7c;
            font-size: 12px;
          }
          &:first-of-type {
            margin-right: 16px;
          }
        }
      }
      .sub-actions {
        display: flex;
        margin-top: 16px;
        .action-item {
          flex: 1;
          padding-top: 20px;
          padding-bottom: 20px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3);
          .action-title {
            margin-top: 4px;
            font-weight: 600;
            font-size: 16px;
          }
          .action-describle {
            margin-top: 6px;
            color: #7c7c7c;
            font-size: 10px;
          }
          &:nth-of-type(1),
          &:nth-of-type(2) {
            margin-right: 16px;
          }
        }
      }
    }
  }
</style>
