<template>
  <view class="code-box">
    <view class="flex-box">
      <input
        type="number"
        class="hide-input"
        :value="inputValue"
        :focus="autoFocus"
        :maxlength="maxlength"
        @input="onInput"
      />
      <block v-for="(item, index) in ranges" :key="index">
        <view
          :class="[
            'item',
            {
              active: codeIndex === item,
              compelete: codeArr.length >= item,
              middle: type === 'middle',
              bottom: type === 'bottom',
              box: type === 'box',
            },
          ]"
        >
          <!-- 聚焦条 -->
          <view v-if="type !== 'middle'" class="focus-line"></view>
          <view v-if="type === 'middle' && codeIndex <= item" class="middle-of-line"></view>
          <block v-if="codeIndex > item"> {{ codeArr[index] ? codeArr[index] : '' }}</block>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'VerifyCode',
    props: {
      value: {
        type: String,
        default: '',
      },
      maxlength: {
        type: Number,
        default: 6,
      },
      autoFocus: {
        type: Boolean,
        default: false,
      },
      // middle / bottom / box
      type: {
        type: String,
        default: 'bottom',
      },
    },
    data() {
      return {
        inputValue: '',
        codeIndex: 1,
        codeArr: [],
        ranges: [],
      };
    },
    watch: {
      maxlength: {
        handler(newValue) {
          this.ranges = [];
          for (let i = 0; i < newValue; i++) {
            this.ranges.push(i + 1);
          }
        },
        immediate: true,
      },
      value: {
        handler(newValue) {
          if (newValue !== this.inputValue) {
            this.inputValue = newValue;
            this.toMakeAndCheck(newValue);
          }
        },
        immediate: true,
      },
    },
    methods: {
      onInput(e) {
        const val = e.detail.value;
        this.inputValue = val;
        this.$emit('update:value', val);
        this.toMakeAndCheck(val);
      },
      toMakeAndCheck(val) {
        const arr = val.split('');
        this.codeIndex = arr.length + 1;
        this.codeArr = arr;
        if (this.codeIndex > Number(this.maxlength)) {
          this.$emit('finish', this.codeArr.join(''));
        }
      },
      setValue(val) {
        this.inputValue = val;
        this.toMakeAndCheck(val);
      },
      clear() {
        this.inputValue = '';
        this.codeArr = [];
        this.codeIndex = 1;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @keyframes twinkling {
    0% {
      opacity: 0.2;
    }

    50% {
      opacity: 0.8;
    }

    100% {
      opacity: 0.2;
    }
  }

  .code-box {
    .flex-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      position: relative;
      .hide-input {
        position: absolute;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        text-align: left;
        z-index: 9;
        opacity: 1;
      }
      .item {
        position: relative;
        width: 84rpx;
        height: 100rpx;
        font-size: 52rpx;
        color: #333333;
        line-height: 100rpx;
        text-align: center;
        box-sizing: border-box;
        &:last-child {
          margin-right: 0;
        }
        &.middle {
          border: none;
          .middle-of-line {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80%;
            height: 6rpx;
            background: #000000;
            transform: translate(-50%, -50%);
          }
        }
        &.box {
          border: 2rpx solid #cccccc;
          &.active {
            border-color: #2c8df4;
          }
        }
        &.bottom {
          border-bottom: 4rpx solid #efefef;
          &.compelete {
            border-color: #838485;
          }
          &.active {
            border-color: #2c8df4;
          }
        }
        .focus-line {
          display: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 2rpx;
          height: 40rpx;
          background: #2c8df4;
          animation: twinkling 1s infinite ease;
        }
        &.active .focus-line {
          display: block;
        }
      }
    }
  }
</style>
