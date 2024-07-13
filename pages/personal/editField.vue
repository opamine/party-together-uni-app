<template>
  <view class="edit-field-container">
    <view v-if="tip" class="tip">
      <text>{{ tip }}</text>
    </view>
    <view class="form-container">
      <view v-if="editFieldKey === 'account' || editFieldKey === 'nickName'">
        <u-field
          v-model="value"
          type="text"
          :disabled="!modifiable"
          :style="{ padding: '0 !important' }"
          :label-width="0"
          :border-bottom="false"
          :clearable="false"
          :maxlength="editFieldKey === 'account' ? 15 : 24"
        >
          <template v-slot:right>
            <view style="color: #ccc"
              >{{ value.length }}/{{ editFieldKey === 'account' ? 15 : 24 }}</view
            >
          </template>
        </u-field>
      </view>
      <view v-if="editFieldKey === 'signature'">
        <u-field
          v-model="value"
          type="textarea"
          :style="{ padding: '0 !important' }"
          :label-width="0"
          :border-bottom="false"
          :clearable="false"
          :maxlength="100"
        >
        </u-field>
        <view style="color: #ccc; text-align: right">{{ value.length }}/{{ 100 }}</view>
      </view>
      <view v-if="editFieldKey === 'gender'">
        <view class="gender-item" @click="modifyGender('male')">
          <view>男</view>
          <view v-show="value === 'male'"
            ><uni-icons type="checkmarkempty" size="28rpx"></uni-icons
          ></view>
        </view>
        <view class="gender-item" @click="modifyGender('female')">
          <view>女</view>
          <view v-show="value === 'female'"
            ><uni-icons type="checkmarkempty" size="28rpx"></uni-icons
          ></view>
        </view>
      </view>
      <view v-if="editFieldKey === 'birthday'">
        <view>
          <picker
            mode="date"
            :value="value"
            :start="startDate"
            :end="endDate"
            @change="bindDateChange"
          >
            <view style="padding: 8rpx 0">{{ value }}</view>
          </picker>
        </view>
      </view>
      <view v-if="editFieldKey === 'region'">
        <view @click="regionSelectorShow = true" style="padding: 8rpx 0;">
          {{ value.join(' ') }}
        </view>
        <u-picker
          v-model="regionSelectorShow"
          mode="region"
          :default-region="value"
          confirm-color="#333"
          @confirm="regionSelectConfirm"
        ></u-picker>
      </view>
    </view>
    <view v-if="rule[editFieldKey]" class="rule">{{ rule[editFieldKey].message }}</view>
    <view class="privacy-container"></view>
    <view class="btn-container"
      ><u-button
        :custom-style="{
          backgroundColor: modifiable ? '#333' : '#eee',
          color: modifiable ? '#fff' : '#999',
          border: 'none',
        }"
        hover-class="none"
        :hair-line="false"
        :disabled="!modifiable"
        @click="handleSave"
        >保存</u-button
      ></view
    >
  </view>
</template>
<script>
  export default {
    data() {
      return {
        tip: '',
        modifiable: false, // 是否可修改
        editFieldName: '', // 编辑的字段名称
        editFieldKey: '', // 编辑的字段
        value: undefined, // 当前值
        rule: {
          account: {
            pattern: '',
            message: '6-15 个字符，仅可使用英文（必须）、数字、下划线',
          },
          nickName: {
            pattern: '',
            message: '请设置 2-24 个字符，不包括 @<>/ 等无效字符哦',
          },
        }, // 规则回显
        regionSelectorShow: false,
      };
    },
    computed: {
      startDate() {
        return this.getDate('start');
      },
      endDate() {
        return this.getDate('end');
      },
    },
    onLoad(options) {
      const { fieldKey } = options;

      const app = getApp();
      const { userInfo, BaseUserInfoFieldsList } = app.globalData;

      // 根据传递过来的 fieldKey 匹配字段名称
      const targetEditFieldName = BaseUserInfoFieldsList.find(
        (item) => item.fieldKey === fieldKey
      )?.fieldName;

      // 设置页面标题
      uni.setNavigationBarTitle({
        title: `编辑${targetEditFieldName}`,
      });

      // 字段名称及字段赋值
      this.editFieldName = targetEditFieldName;
      this.editFieldKey = fieldKey;
      this.value = userInfo[fieldKey];

      // 是否可编辑，可编辑和不可编辑提示
      switch (fieldKey) {
        case 'account':
          this.tip = !userInfo.accountModified ? '账号只可修改一次' : '修改次数已达上限';
          this.modifiable = !userInfo.accountModified;
          break;
        case 'nickName':
          const nickNameModifiedRangeDays =
            (Date.now() - userInfo.nickNameLastModified) / (1 * 24 * 60 * 60 * 1000);
          this.tip =
            nickNameModifiedRangeDays >= 7 ? '七天内可修改一次' : '抱歉，七天内只能修改一次';
          this.modifiable = nickNameModifiedRangeDays >= 7;
          break;
        case 'signature':
          const signatureModifiedRangeDays =
            (Date.now() - userInfo.nickNameLastModified) / (1 * 24 * 60 * 60 * 1000);
          this.tip =
            signatureModifiedRangeDays >= 3 ? '三天内可修改一次' : '抱歉，三天内只能修改一次';
          this.modifiable = signatureModifiedRangeDays >= 3;
          break;
        case 'gender':
          this.modifiable = true;
          break;
        case 'birthday':
          this.modifiable = true;
          break;
        case 'region':
          this.modifiable = true;
          break;
        default:
          break;
      }
    },
    methods: {
      getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (type === 'start') {
          year = year - 60;
        } else if (type === 'end') {
          year = year + 2;
        }
        month = month > 9 ? month : '0' + month;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      },
      modifyGender(value) {
        this.value = value;
      },
      bindDateChange(e) {
        this.value = e.detail.value;
      },
      regionSelectConfirm(val) {
        const newVal = [val.province.name, val.city.name, val.area.name];
        this.value = newVal;
      },
      handleSave() {
        console.log(this.editFieldKey);
        console.log(this.value);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .edit-field-container {
    padding: 30rpx 16rpx;
    .tip {
      padding: 0 24rpx;
      margin-bottom: 24rpx;
      font-size: 24rpx;
    }
    .form-container {
      padding: 12rpx 24rpx;
      background-color: #fff;
      border-radius: 5px;
      ::v-deep .u-field {
        padding: 8rpx 0;
      }
      .gender-item {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 0;
      }
    }
    .rule {
      padding: 24rpx;
      font-size: 24rpx;
      color: #999;
    }
    .btn-container {
      margin-top: 24rpx;
    }
  }
</style>
