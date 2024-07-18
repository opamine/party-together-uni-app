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
      <view
        v-for="item in BaseUserInfoFieldsList"
        :key="item.fieldKey"
        @click="editField(item)"
        class="base-info-item"
      >
        <view class="label">{{ item.fieldName }}</view>
        <view class="value">
          <view v-if="item.fieldKey === 'backgroundImage'" style="text-align: right">
            <u-upload
              ref="uUpload1"
              :header="{
                Authorization:
                  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjU2YjNhMzg1YjY1MjI3ZjBiYmFlODcwIiwiaWF0IjoxNzIxMTAyNTEyLCJleHAiOjE3MjEzNjE3MTJ9.dUTgVvQNDV_x55xg52i8sxVtJ1VRw_WVdgB0cyw83L8gevydNuVI7b9j0fWZBKhnon58oHk2GW-5vFvf0AWU6u7-2UcTpPy90t-kHeEkdjLqn3anEBFlX8PNd81D--CtNGWHrxrPpCENmbAm08QWFrGJ7gqMiCVI6ozl96OvAnSnnpFUddn5sy7U8UfxgVdEfFRD3S-yZrkTua9hgjD9l6gC82Rumrxf_wicNtVtURD8vytTBKogQnyR6UOOOBUa3sSdETWCjPicNf1DwQcuBem76p2fjl2kORkLFnikSs4HvPTX5LqwHaeq99HPVrGd6imHRD9MzCwihddV9zlgYQ',
              }"
              action="https://ramses.cn/api/upload/file"
              :auto-upload="true"
              :show-upload-list="false"
              :custom-btn="true"
              @on-success="backgroundImageUploadSuccess"
              @on-error="backgroundImageUploadError"
              style="display: inline-block"
            >
              <template v-slot:addBtn>
                <view style="text-align: right">
                  <image :src="userInfo.backgroundImage" mode="aspectFit"></image>
                </view>
              </template>
            </u-upload>
          </view>

          <text v-else-if="item.fieldKey === 'gender'">{{
            userInfo[item.fieldKey] === 'male' ? '男' : '女'
          }}</text>
          <view v-else-if="item.fieldKey === 'birthday'">
            <uni-dateformat :date="userInfo[item.fieldKey]" format="yyyy-MM-dd"></uni-dateformat>
          </view>
          <text v-else-if="item.fieldKey === 'region'">{{
            userInfo[item.fieldKey].join(' ')
          }}</text>
          <text v-else-if="item.fieldKey === 'career'">{{
            (userInfo[item.fieldKey] &&
              userInfo[item.fieldKey].length &&
              userInfo[item.fieldKey].map((item) => item.split('-')[1]).join(' ')) ||
            '选择职业'
          }}</text>
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
  export default {
    data() {
      return {
        userInfo: {},
        BaseUserInfoFieldsList: [],
      };
    },
    onLoad() {
      const app = getApp();
      this.BaseUserInfoFieldsList = app.globalData.BaseUserInfoFieldsList;
    },
    onShow() {
      const app = getApp();
      this.userInfo = {...app.globalData.userInfo};
    },
    methods: {
      editField(item) {
        if (item.fieldKey === 'backgroundImage') {
        } else {
          uni.navigateTo({
            url: `/pages/personal/editField?fieldKey=${item.fieldKey}`,
          });
        }
      },
      backgroundImageUploadSuccess(res) {
        // 因为 userInfo 为对象类型，这里修改了 userInfo 的 backgroundImage 字段，全局也会被修改
        this.$set(this.userInfo, 'backgroundImage', res.data);
        const app = getApp();
        app.globalData.userInfo.backgroundImage = res.data;
      },
      backgroundImageUploadError(err) {
        console.log(err);
      },
    },
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
          width: 44rpx;
          height: 44rpx;
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
