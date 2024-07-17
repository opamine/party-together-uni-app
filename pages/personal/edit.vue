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
                  'eyJhbGciOiJSUzI1NIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjU2YjNhMzg1YjY1MjI3ZjBiYmFlODcwIiwiaWF0IjoxNzIxMjAzNzg4LCJleHAiOjE3MjE0NjI5ODh9.UcmK7_bBxiGrj_P7TvW1htND9HHaUWMZZ6-JfHaHJqGrw64A1tOj3ziC_Gg-UTcMkebUwQz03SWOASslJ35M0vX_wsrNi25ZinxRbPfHfY_Y_uP9hdjYa5yHRkxI7pVko8Q2uErpDdNs7_wN_UTJxnmaH5i4ZAfP88q3TLwDuj9uKbk_0EJjIEQYgsVoevzGuYBqZwWaHZfOYLYPPiNXWSW-zo0e9S-NwMNy6RGiAK8nfCjWyytu3t2C2MUgDpMdl_6J-dpZOi3HINAGsieDGf30tY2T06bh9Q-9Z1aDHNNBjz_yQcX10Na_ScR9gvpmBv02vYon2ZKmKo32ZLBwRQ',
              }"
              action="http://localhost:3000/api/upload/file"
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
    <!-- <u-modal
      v-model="editModalShow"
      :title="`编辑${editFieldName}`"
      :title-style="{ fontSize: '30rpx' }"
      show-cancel-button
      :cancel-style="{ fontSize: '30rpx' }"
      confirm-text="保存"
      :confirm-style="{ fontSize: '30rpx', fontWeight: 600, color: '#333' }"
      :negative-top="300"
    >
      <view class="slot-content">
        <view class="modal-content" style="padding: 16rpx; font-size: 28rpx">
          <u-input
            v-model="value"
            type="text"
            :custom-style="{ borderRadius: '12px' }"
            :border="true"
          />
        </view>
      </view>
    </u-modal> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: {},
        BaseUserInfoFieldsList: [],
        // editModalShow: false,
        // editFieldName: '',
        // editFieldKey: '',
        // value: '',
      };
    },
    onLoad() {
      const app = getApp();
      const { userInfo, BaseUserInfoFieldsList } = app.globalData;
      this.userInfo = userInfo;
      this.BaseUserInfoFieldsList = BaseUserInfoFieldsList;
    },
    onReady() {},
    onShow() {},
    methods: {
      editField(item) {
        // this.editFieldName = fieldName;
        // this.editFieldKey = fieldKey;
        // this.editModalShow = true;

        if (item.fieldKey === 'backgroundImage') {
        } else {
          uni.navigateTo({
            url: `/pages/personal/editField?fieldKey=${item.fieldKey}`,
          });
        }
      },
      backgroundImageUploadSuccess(res) {
        this.$set(this.userInfo, 'backgroundImage', res.data);
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
