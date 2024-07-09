<template>
  <view class="edit-container">
    <view class="avatar-container">
      <view class="avatar-content">
        <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
        <view class="camera-icon">
          <uni-icons type="camera" size="30rpx" color="#fff"></uni-icons>
        </view>
      </view>
    </view>
    <view class="base-info-container">
      <view v-for="item in BaseInfoFieldsList" :key="item.fieldKey" class="base-info-item">
        <view class="label">{{ item.fieldName }}</view>
        <view class="value">
          <image
            v-if="item.fieldKey === 'backgroundImage'"
            :src="userInfo.backgroundImage"
            mode="aspectFit"
          ></image>
          <text v-else-if="item.fieldKey === 'gender'">{{
            userInfo[item.fieldKey] === 'male' ? '男' : '女'
          }}</text>
          <view v-else-if="item.fieldKey === 'birthday'">
            <uni-dateformat :date="userInfo[item.fieldKey]" format="yyyy-MM-dd"></uni-dateformat>
          </view>
          <text v-else>{{ userInfo[item.fieldKey] }}</text>
        </view>
        <view class="right-icon-container">
          <uni-icons type="forward" size="30rpx" color="#c6c6c6"></uni-icons>
        </view>
      </view>
    </view>
    <view class="more-info-container"></view>
  </view>
</template>

<script>
  const BaseInfoFieldsList = [
    { fieldName: '账号', fieldKey: 'account' },
    { fieldName: '名字', fieldKey: 'nickName' },
    { fieldName: '个性签名', fieldKey: 'signature' },
    { fieldName: '性别', fieldKey: 'gender' },
    { fieldName: '生日', fieldKey: 'birthday' },
    { fieldName: '地区', fieldKey: 'region' },
    { fieldName: '职业', fieldKey: 'career' },
    { fieldName: '人格类型', fieldKey: 'mbti' },
    { fieldName: '背景图', fieldKey: 'backgroundImage' },
  ];
  export default {
    data() {
      return {
        userInfo: {},
        BaseInfoFieldsList,
      };
    },
    onLoad() {
      const app = getApp();
      this.userInfo = app.globalData.userInfo;
    },
    onReady() {},
    onShow() {},
  };
</script>
<style lang="less" scoped>
  .edit-container {
    background-color: #fff;
    padding: 40rpx 16rpx;
    .avatar-container {
      display: flex;
      justify-content: center;
      .avatar-content {
        position: relative;
        .avatar {
          display: block;
          height: 170rpx;
          width: 170rpx;
          border-radius: 50%;
          border: 1px solid #dddddd;
        }
        .camera-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 50rpx;
          height: 50rpx;
          right: 0;
          bottom: 0;
          background-color: #333;
          border-radius: 50%;
        }
      }
    }
    .base-info-container {
      margin-top: 40rpx;
      .base-info-item {
        display: flex;
        align-items: center;
        padding-top: 30rpx;
        padding-bottom: 30rpx;
        border-bottom: 1px solid #f1f1f1;
        &:last-of-type {
          padding-bottom: 0;
          border-bottom: none;
        }
        .label {
          width: 150rpx;
          font-size: 28rpx;
          color: #666;
        }
        .value {
          flex: 1;
          text-align: right;
          font-size: 28rpx;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          image {
            width: 200rpx;
            height: 160rpx;
          }
        }
        .right-icon-container {
          margin-left: 12rpx;
        }
      }
    }
  }
</style>
