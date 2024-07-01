<template>
  <view class="login-page" style="padding-top: 44rpx">
    <view class="title">请输入验证码</view>
    <view class="describle">
      <view class="phone"
        >已发送至 <text>+86 {{ '190****2620' }}</text></view
      >
      <view
        class="code-btn"
        :class="{
          available: codeBtnAvailable,
          'count-down': countDownTimer,
        }"
        @click="onCodeBtnClick"
      >
        <text v-if="countDownTimer" style="margin-right: 8rpx; color: #2c8df4"
          >{{ countDown }}s</text
        >
        <text :style="{ color: countDownTimer ? '#959ba3' : '#2c8df4' }">{{
          countDownTimer ? '重新获取' : '获取验证码'
        }}</text>
      </view>
    </view>
    <view class="verify-code-container"
      ><VerifyCode
        type="bottom"
        :autoFocus="verifyCodeInputFocus"
        v-model:value="verifyCode"
        @finish="onVercodeInpuFinish"
    /></view>
    <view class="img-verify-container"></view>
    <view class="submit-btn-container" @click="onSunmitBtnClick">
      <button type="primary" class="submit-btn" :style="submitBtnStyle">提交</button>
    </view>
  </view>
</template>
<script>
  import VerifyCode from './components/VerifyCode.vue';
  export default {
    components: {
      VerifyCode,
    },
    data() {
      return {
        mobileClientVersion: '', // 这个参数从登录页取
        maskedPhone: '', // 脱敏的手机号，这个参数从登录页取
        stepOneToken: '', // 第一步登录成功获取的 token，这个参数从登录页取
        verifyCode: '', // 手机验证码
        verifyCodeSending: false, // 手机验证码发送中
        verifyCodeInputFocus: true, // 手机验证码输入栏是否聚焦
        countDown: 0, // 读秒
        countDownTimer: undefined, // 读秒定时器
      };
    },
    computed: {
      // 获取验证码按钮可用
      codeBtnAvailable() {
        return !this.countDownTimer;
      },
      // 出现图形验证码时，提交按钮样式
      submitBtnStyle() {
        const style = {};
        if (this.verifyCode.length === 6) {
          style.background = 'linear-gradient(91deg, #1082FF 0%, #48CCFF 94%)';
        } else {
          style.background = '#BFDCFB';
        }
        return style;
      },
    },
    methods: {
      // 设置 60s 倒计时
      setCountDown() {
        this.countDown = 60;
        this.countDownTimer = setInterval(() => {
          if (this.countDown === 1) {
            clearInterval(this.countDownTimer);
            this.countDownTimer = undefined;
          }
          this.countDown--;
        }, 1000);
      },
      // 获取(手机)验证码按钮点击
      onCodeBtnClick() {
        if (this.verifyCodeSending) return;
        if (this.countDownTimer) return;
        if (this.disabled)
          return uni.showToast({
            title: '请输入图形验证码',
            icon: 'none',
          });
        this.verifyCode = '';
        this.verifyCodeSending = true;
        // 🚩 这里调用发送验证码接口
        setTimeout(() => {
          // 成功回调
          uni.showToast({
            title: '验证码已发送，请注意查收',
            icon: 'none',
          });
          this.verifyCodeSending = false;
          this.setCountDown();
        }, 3000);
        // 🚩 这里调用发送验证码接口
      },
      // 手机验证码输入完成
      onVercodeInpuFinish() {
        if (!this.imgCodeBase64) {
          this.verifyCodeInputFocus = false;
          // 如果不需要图形验证码，这里输入完手机验证码直接走登录
          this.submit();
        }
      },
      // 提交按钮点击
      onSunmitBtnClick() {
        if (this.verifyCode.length < 6)
          return uni.showToast({
            title: '请输入完整手机验证码',
            icon: 'none',
          });
        this.submit();
      },
      // 登录
      submit() {
        // 参数处理
        const data = {
          mobileClientVersion: this.mobileClientVersion,
          grant_type: 'global_two_factor_step_two',
          stepOneToken: this.stepOneToken,
          verifyCode: this.verifyCode,
        };
        console.log(data);
        uni.showLoading();
        // 下面走接口
        setTimeout(() => {
          uni.hideLoading();
        }, 3000);
      },
    },
    onLoad(options) {
      const { mobileClientVersion, maskedPhone, stepOneToken } = options;
      this.mobileClientVersion = mobileClientVersion;
      this.maskedPhone = maskedPhone;
      this.stepOneToken = stepOneToken;
      // 上一步登录成功后，会自动向用户手机发送一个验证码，所以这里直接开启倒计时
      this.setCountDown();
    },
  };
</script>
<style lang="less" scoped>
  .login-page {
    height: 100%;
    padding: 44rpx 40rpx;
    background-color: #fff;
    box-sizing: border-box;
    .title {
      font-size: 52rpx;
      font-weight: 600;
      line-height: 74rpx;
      color: #262a30;
    }
    .describle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8rpx;
      .phone {
        font-size: 26rpx;
        line-height: 42rpx;
        color: #959ba3;
        text {
          color: #262a30;
        }
      }
      .code-btn {
        height: 56rpx;
        padding: 0 24rpx;
        border-radius: 28rpx;
        font-size: 28rpx;
        box-sizing: border-box;
        &.available {
          border: 2rpx solid #2c8df4;
          line-height: 52rpx;
          color: #2c8df4;
        }
        &.disabled {
          border: 2rpx solid #cbcfd6;
          line-height: 52rpx;
          color: #cbcfd6;
        }
        &.count-down {
          background: #f7f8f9;
          line-height: 56rpx;
        }
      }
    }
    .verify-code-container {
      margin-top: 80rpx;
    }
    .submit-btn-container {
      margin-top: 60rpx;
      .submit-btn {
        &::after {
          border: none;
          font-size: 32rpx;
        }
      }
    }
  }
</style>
