<template>
  <view class="page-container">
    <view class="form-container">
      <u-form :model="form" ref="form" :errorType="['toast']" :label-width="180">
        <view class="base-form-container card">
          <u-form-item label="" prop="title">
            <u-input v-model="form.title" placeholder="活动标题" maxlength="20" />
            <template v-slot:right>{{ (form.title && form.title.length) || 0 }}/20</template>
          </u-form-item>
          <u-form-item label="" prop="content">
            <u-input
              v-model="form.content"
              type="textarea"
              placeholder="描述一下活动内容吧"
              height="250"
              maxlength="8000"
            />
            <view style="color: #ccc; text-align: right"
              >{{ (form.content && form.content.length) || 0 }}/{{ 8000 }}</view
            >
          </u-form-item>
          <u-form-item label="" :border-bottom="false">
            <u-upload
              ref="uploader"
              action="https://ramses.cn/api/upload/file"
              :header="{
                Authorization:
                  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjYzY2U3ZWEyNmRmYWNjZmYxM2UxOTYyIiwiaWF0IjoxNzI0MjI2MDk0LCJleHAiOjE3MjQ0ODUyOTR9.CTSg-3zAtJBAkfnUqd2TAjSBBX8iRFPQn2RJhuP4b3eUidaEKL87vTc5Wq1hsrp-GzH-D1AJVw8qVd6aeYaENslS5VZNrMOkykDHUWMxo-YN-_UCYQzuvCoFcsKo8qMnV06xETrV6wku7KEvOCsAhUpQMDj4oJEfYYDmntskemwFIm_dh4ZAA1iqLAdc0uDQ88MdF_6yaLpBJqr7XrSjdaNXIcCQyGND8xPYumZm_rPmuDXJEy7adb6PAKOWU4B3EOSgTaNZYuf5YZ-3FjXBdZRQLyAQXX3yNqpWHCsLgdDoHOU00a9nlA9QvfrnGSjiv3ZOM86p2kl6zzS2tw4rzQ',
              }"
              :max-size="30 * 1024 * 1024"
              :max-count="9"
            ></u-upload>
          </u-form-item>
        </view>
        <view class="config-form-container card">
          <u-form-item label="活动开始时间" prop="startTime">
            <u-input
              v-model="form.startTime"
              input-align="right"
              :disabled="true"
              placeholder="请选择"
              @click="selectTime('startTime')"
            />
            <template v-slot:right
              ><uni-icons type="forward" size="30rpx" color="#c6c6c6"></uni-icons
            ></template>
          </u-form-item>
          <u-form-item label="活动结束时间" prop="endTime">
            <u-input
              v-model="form.endTime"
              input-align="right"
              :disabled="true"
              placeholder="请选择"
              @click="selectTime('endTime')"
            />
            <template v-slot:right
              ><uni-icons type="forward" size="30rpx" color="#c6c6c6"></uni-icons
            ></template>
          </u-form-item>
          <u-form-item label="活动地点" prop="address">
            <u-input
              v-model="form.address"
              input-align="right"
              :disabled="true"
              placeholder="请选择"
              @click="selectAddress"
            />
            <template v-slot:right
              ><uni-icons type="location" size="36rpx" color="#c6c6c6"></uni-icons
            ></template>
          </u-form-item>
          <u-form-item label="报名截止时间" prop="signUpDeadline">
            <u-input
              v-model="form.signUpDeadline"
              input-align="right"
              :disabled="true"
              placeholder="请选择"
              @click="selectTime('signUpDeadline')"
            />
            <template v-slot:right
              ><uni-icons type="forward" size="30rpx" color="#c6c6c6"></uni-icons
            ></template>
          </u-form-item>
          <u-form-item label="退出截止时间" prop="exitDeadline" :border-bottom="false">
            <u-input
              v-model="form.exitDeadline"
              input-align="right"
              :disabled="true"
              placeholder="请选择"
              @click="selectTime('exitDeadline')"
            />
            <template v-slot:right
              ><uni-icons type="forward" size="30rpx" color="#c6c6c6"></uni-icons
            ></template>
          </u-form-item>
          <view style="padding-bottom: 20rpx; font-size: 24rpx; color: #646464"
            >截止时间后，用户无法退款和退出活动</view
          >
        </view>
        <view class="section-title">活动报名设置</view>
        <view class="sign-up-config-form-container">
          <view
            v-for="(item, index) in signUpConfigList"
            :key="item.id"
            class="sign-up-config-form card"
          >
            <view v-if="signUpConfigList.length > 1" class="action-area">
              <view class="group-name">第{{ index + 1 }}组</view>
              <view class="icon-container" @click="deleteSignUpGroup(index)">
                <uni-icons type="trash" size="36rpx" color="#fff"></uni-icons>
              </view>
            </view>
            <view style="padding: 16rpx">
              <u-form label-width="180">
                <u-form-item label="活动人数(人)">
                  <u-input
                    v-model="item.count"
                    input-align="right"
                    placeholder="请输入1-9999 的整数"
                  />
                </u-form-item>
                <u-form-item
                  label="价格(元)"
                  :border-bottom="index === signUpConfigList.length - 1"
                >
                  <u-input
                    v-model="item.price"
                    input-align="right"
                    placeholder="默认 0 即免费，可输入 0-9999"
                  />
                </u-form-item>
              </u-form>
            </view>
            <view
              v-if="index === signUpConfigList.length - 1"
              @click="addSignUpGroup"
              class="add-sign-up-group-btn"
            >
              <uni-icons type="plusempty" size="36rpx"></uni-icons>
              <text style="margin-left: 12rpx; line-height: 36rpx">增加分组</text>
            </view>
          </view>
        </view>

        <view class="section-title">活动负责人信息</view>
        <view class="contact-form-container card">
          <u-form-item label="联系电话" prop="phone">
            <u-input v-model="form.phone" input-align="right" placeholder="请输入电话号码" />
          </u-form-item>
          <u-form-item label="群聊二维码" prop="groupChatQrcode" :border-bottom="false">
            <!-- <u-input
              v-model="form.groupChatQrcode"
              input-align="right"
              :disabled="true"
              placeholder="请选择"
            /> -->
            <template v-slot:right
              ><u-upload
                ref="uploader2"
                :header="{
                  Authorization:
                    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjYzY2U3ZWEyNmRmYWNjZmYxM2UxOTYyIiwiaWF0IjoxNzI0MjI2MDk0LCJleHAiOjE3MjQ0ODUyOTR9.CTSg-3zAtJBAkfnUqd2TAjSBBX8iRFPQn2RJhuP4b3eUidaEKL87vTc5Wq1hsrp-GzH-D1AJVw8qVd6aeYaENslS5VZNrMOkykDHUWMxo-YN-_UCYQzuvCoFcsKo8qMnV06xETrV6wku7KEvOCsAhUpQMDj4oJEfYYDmntskemwFIm_dh4ZAA1iqLAdc0uDQ88MdF_6yaLpBJqr7XrSjdaNXIcCQyGND8xPYumZm_rPmuDXJEy7adb6PAKOWU4B3EOSgTaNZYuf5YZ-3FjXBdZRQLyAQXX3yNqpWHCsLgdDoHOU00a9nlA9QvfrnGSjiv3ZOM86p2kl6zzS2tw4rzQ',
                }"
                action="https://ramses.cn/api/upload/file"
                :max-size="30 * 1024 * 1024"
                :max-count="1"
            /></template>
          </u-form-item>
        </view>
      </u-form>
    </view>
    <view class="action-container">
      <view class="draft-button">存草稿</view>
      <view class="primary-button" @click="submit">发布</view>
    </view>
    <u-picker
      mode="time"
      v-model="timerPickerShow"
      :params="{
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: false,
      }"
      confirm-color="#272a30"
      @confirm="timePickerConfirm"
    ></u-picker>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '', // 活动标题
          content: '', // 活动内容
          pictures: [], // 活动图片
          startTime: undefined, // 活动开始时间
          endTime: undefined, // 活动结束时间
          address: undefined, // 活动地址
          longitude: undefined, // 活动地址经度
          latitude: undefined, // 活动地址纬度
          signUpDeadline: undefined, // 报名截止时间
          exitDeadline: undefined, // 退出截止时间
          phone: undefined, // 负责人联系电话
          groupChatQrcode: undefined, // 群聊二维码图片
        },
        // 活动报名设置
        signUpConfigList: [{ id: Date.now(), count: undefined, price: undefined }],
        rules: {
          title: [{ required: true, message: '请输入活动标题' }],
          content: [{ required: true, message: '请输入活动内容' }],
          startTime: [{ required: true, message: '请选择活动开始时间' }],
          endTime: [{ required: true, message: '请选择活动结束时间' }],
          address: [{ required: true, message: '请选择活动地点' }],
          signUpDeadline: [{ required: true, message: '请选择报名截止时间' }],
          exitDeadline: [{ required: true, message: '请选择退出截止时间' }],
          phone: [{ required: true, message: '请输入负责人联系电话' }],
        },
        tempTimeField: undefined, // 时间选择器要存取的字段
        timerPickerShow: false,
      };
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
    },
    methods: {
      changeCycle(val) {
        this.form.cycle = val;
      },
      addSignUpGroup() {
        this.signUpConfigList.push({
          id: Date.now(),
          count: undefined,
          price: undefined,
        });
      },
      deleteSignUpGroup(index) {
        this.signUpConfigList.splice(index, 1);
      },
      selectAddress() {
        uni.navigateTo({
          url: '/pages/common/location',
          events: {
            acceptDataFromLocationPage: (data) => {
              const { address, longitude, latitude } = data;
              this.form.address = address;
              this.form.longitude = longitude;
              this.form.latitude = latitude;
            },
          },
        });
      },
      selectTime(field) {
        this.tempTimeField = field;
        this.timerPickerShow = true;
      },
      timePickerConfirm(val) {
        this.form[
          this.tempTimeField
        ] = `${val.year}-${val.month}-${val.day} ${val.hour}:${val.minute}`;
      },
      saveDraft() {},
      submit() {
        const re = this.$refs.uploader.upload();
        this.$refs.form.validate((valid) => {
          console.log(valid);
          if (valid) {
            uni.showToast({
              icon: 'none',
              title: '表单验证通过',
            });

            // 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
            const files = this.$refs.uploader.lists.filter((val) => {
              return val.progress == 100;
            });
            // 如果您不需要进行太多的处理，直接如下即可
            // files = this.$refs.uploader.lists;
            console.log(files);
            if (files.length <= 0) {
              return uni.showToast({
                icon: 'none',
                title: '请至少上传一张活动图片',
              });
            }
            this.form.pictures = files.map((item) => item.url);

            const files2 = this.$refs.uploader2.lists.filter((val) => {
              return val.progress == 100;
            });
            console.log(files2);
            if (files2.length <= 0) {
              return uni.showToast({
                icon: 'none',
                title: '请上传微信群聊二维码',
              });
            }
            this.form.groupChatQrcode = files2[0].url;

            // 活动报名分组核验
            const signUpConfigListValid = this.signUpConfigList.every((item) => {
              if (
                item.count &&
                item.price &&
                /^[1-9][0-9]{0,3}$/.test(item.count) &&
                /^([0]|[1-9][0-9]{0,3})$/.test(item.price)
              ) {
                return true;
              }
              return false;
            });
            if (!signUpConfigListValid) {
              uni.showToast({
                icon: 'none',
                title: '报名设置有误',
              });
            }

            console.log(this.form);
          }
        });
      },
    },
  };
</script>
<style lang="less" scoped>
  .page-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .form-container {
      flex: 1;
      padding: 24rpx;
      overflow-y: auto;
      .section-title {
        font-size: 30rpx;
        color: #666;
        text-align: center;
      }
      .config-form-container {
        margin-top: 24rpx;
        margin-bottom: 24rpx;
      }
      .sign-up-config-form-container {
        margin-bottom: 24rpx;
        .sign-up-config-form {
          margin-top: 24rpx;
          padding: 0;
          .action-area {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            padding: 16rpx;
            background-color: #515151;
            color: #fff;
          }
          .add-sign-up-group-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12rpx 0 22rpx;
          }
        }
      }
      .contact-form-container {
        margin-top: 24rpx;
      }
    }
    .action-container {
      display: flex;
      justify-content: space-between;
      padding: 24rpx 32rpx 0;
      padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
      padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
      background-color: #fff;
      border-top: 1px solid #eee;
      .draft-button {
        flex: 1;
        height: 80rpx;
        margin-right: 32rpx;
        border-radius: 40rpx;
        background-color: #f2f3f7;
        line-height: 80rpx;
        text-align: center;
      }
      .primary-button {
        flex: 1;
        height: 80rpx;
        border-radius: 40rpx;
        background-color: #272a30;
        color: #fff;
        line-height: 80rpx;
        text-align: center;
      }
    }
  }
</style>
