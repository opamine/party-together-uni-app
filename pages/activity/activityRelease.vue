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
                  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjU2YjNhMzg1YjY1MjI3ZjBiYmFlODcwIiwiaWF0IjoxNzIxMzc0NjA1LCJleHAiOjE3MjE2MzM4MDV9.O6g4ZqUKVA_ig00lIXtXfeBHeXCqa66NT8XzKV3bRkypOPX9FGm-UqZPGtxUoWo9zVK64Z2dPrDyK-6DNkMrRt1JGOoY1b60jtrAvLt7c7eXSbC6TZbvVHZ36xSEm9o21l9DytSv4eKvGehmiGyM1JHyRiHj70Mqez9qZE2ksLP7b3SHqzbrFNI00yqY3QwwDeHz8D5rDPR5ko4NF1Inm5OE4Mq27gDeSmaKm5zVc0jCROvr-2BOY_8fRz3iolBiv1g6gXbn5newGWoPZufRx_QGwZlFUavt0gvqLmnJdATw8bOBR-9BmWBoB82BylUL5bGqzGbv89RvhWLOwwq83g',
              }"
              :auto-upload="false"
              :max-size="30 * 1024 * 1024"
              :max-count="9"
              @on-success="uploadSuccess"
              @on-error="uploadError"
              @on-uploaded="uploadAllSuccess"
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
                    placeholder="默认 0 即免费，可输入 0-20万"
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
            <u-input
              v-model="form.groupChatQrcode"
              input-align="right"
              :disabled="true"
              placeholder="请选择"
            />
            <template v-slot:right
              ><uni-icons type="forward" size="30rpx" color="#c6c6c6"></uni-icons
            ></template>
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
        },
        tempTimeField: undefined, // 时间选择器要存取的字段
        timerPickerShow: false,
      };
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
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
          }
        });
      },
    },
  };
</script>
<style lang="less" scoped>
  .page-container {
    height: 100vh;
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
