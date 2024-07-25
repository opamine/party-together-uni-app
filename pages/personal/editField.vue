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
            @change="bindBirthdayDateChange"
          >
            <view style="padding: 8rpx 0">{{ value }}</view>
          </picker>
        </view>
      </view>
      <view v-if="editFieldKey === 'region'">
        <view @click="regionSelectorShow = true" style="padding: 8rpx 0">
          {{ value.join(' ') }}
        </view>
        <u-picker
          v-model="regionSelectorShow"
          mode="region"
          :default-region="value"
          confirm-color="#272a30"
          @confirm="regionSelectConfirm"
        ></u-picker>
      </view>
      <view v-if="editFieldKey === 'career'">
        <view class="career-edit-content">
          <view v-for="(item, index) in value" :key="item" class="career-tag">
            <text>{{ item.split('-')[1] }}</text>
            <uni-icons
              type="closeempty"
              size="28rpx"
              style="margin-left: 8rpx"
              @click="removeCareer(index)"
            ></uni-icons>
          </view>
          <view
            v-if="value.length < 2"
            class="career-tag"
            style="color: #515151"
            @click="careerSelectStart"
          >
            <text>添加职业</text>
            <uni-icons type="plusempty" size="28rpx" color="#515151"></uni-icons>
          </view>
        </view>
        <view style="text-align: right; color: #ccc"> {{ (value && value.length) || 0 }}/2 </view>
        <u-picker
          v-model="careerSelectorShow"
          mode="multiSelector"
          :range="careerData"
          :default-selector="careerSelectorDefaultSelect"
          confirm-color="#272a30"
          @columnchange="careerColumnChange"
          @confirm="careerSelectConfirm"
        ></u-picker>
      </view>
      <view v-if="editFieldKey === 'mbti'">
        <view @click="mbtiSelectStart" style="padding: 8rpx 0">
          {{ value }}
        </view>
        <u-picker
          v-model="mbtiSelectorShow"
          mode="selector"
          :range="MbtiData"
          :default-selector="mbtiSelectorDefaultSelect"
          confirm-color="#272a30"
          @confirm="mbtiSelectConfirm"
        ></u-picker>
      </view>
    </view>
    <view v-if="rule[editFieldKey]" class="rule">{{ rule[editFieldKey].message }}</view>
    <view class="privacy-container"></view>
    <view class="btn-container"
      ><u-button
        :custom-style="{
          backgroundColor: modifiable ? '#272a30' : '#eee',
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
  const MbtiData = [
    'INTJ',
    'INTP',
    'ENTJ',
    'ENTP',
    'INFJ',
    'INFP',
    'ENFJ',
    'ENFP',
    'ISTJ',
    'ISFJ',
    'ESTJ',
    'ESFJ',
    'ISTP',
    'ISFP',
    'ESTP',
    'ESFP',
  ];
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
            message: '6-15 个字符，仅可使用英文（必须）、数字、下划线',
          },
          nickName: {
            message: '请设置 2-24 个字符，不包括 @<>/ 等无效字符哦',
          },
        }, // 规则回显
        regionSelectorShow: false,
        careerSelectorShow: false,
        careerOriginData: [
          {
            id: 0,
            name: '互联网',
            children: [
              { id: 0, name: '互联网从业者' },
              { id: 1, name: '前端开发工程师' },
              { id: 2, name: '后端开发工程师' },
            ],
          },
          {
            id: 1,
            name: '科技数码',
            children: [
              { id: 0, name: '数码博主' },
              { id: 1, name: '摄影博主' },
            ],
          },
        ],
        careerData: [
          ['互联网', '科技数码'],
          ['互联网从业者', '前端开发工程师', '后端开发工程师'],
        ],
        careerSelectorDefaultSelect: [0, 0],
        MbtiData,
        mbtiSelectorShow: false,
        mbtiSelectorDefaultSelect: [0],
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
      // 职业是个数组类型，为了避免修改全局数据，这里做个浅拷贝
      this.value = fieldKey === 'career' ? [...userInfo[fieldKey]] : userInfo[fieldKey];

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
        case 'career':
          this.modifiable = true;
          break;
        case 'mbti':
          this.modifiable = true;
          break;
        default:
          this.modifiable = true;
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
      bindBirthdayDateChange(e) {
        this.value = e.detail.value;
      },
      regionSelectConfirm(val) {
        const newVal = [val.province.name, val.city.name, val.area.name];
        this.value = newVal;
      },
      removeCareer(index) {
        this.value.splice(index, 1);
      },
      careerSelectStart() {
        if (this.value && this.value.length) {
          const lastCareerArr = this.value[this.value.length - 1].split('-');
          const columnIndex0 = this.careerOriginData.findIndex(
            (item) => item.name === lastCareerArr[0]
          );
          const columnIndex1 = this.careerOriginData[columnIndex0].children.findIndex(
            (item) => item.name === lastCareerArr[1]
          );
          this.careerSelectorDefaultSelect = [columnIndex0, columnIndex1];
          this.careerData[1] = this.careerOriginData[columnIndex0].children.map(
            (item) => item.name
          );
        } else {
          this.careerSelectorDefaultSelect = [0, 0];
          this.careerData[1] = this.careerOriginData[0].children.map((item) => item.name);
        }
        this.careerSelectorShow = true;
      },
      careerColumnChange({ column, index }) {
        if (column === 0) {
          this.careerData[1] = this.careerOriginData[index].children.map((item) => item.name);
        }
      },
      careerSelectConfirm(val) {
        const newCareer = this.careerData[0][val[0]] + '-' + this.careerData[1][val[1]];
        this.value.push(newCareer);
      },
      mbtiSelectStart() {
        if (this.value) {
          const targetIndex = this.MbtiData.findIndex((item) => item === this.value);
          this.mbtiSelectorDefaultSelect = targetIndex > -1 ? [targetIndex] : [0];
        } else {
          this.mbtiSelectorDefaultSelect = [0];
        }
        this.mbtiSelectorShow = true;
      },
      mbtiSelectConfirm(e) {
        this.value = this.MbtiData[e[0]];
      },
      handleSave() {
        // 用户名 和 昵称修改需要走正则校验
        if (['account', 'nickName'].includes(this.editFieldKey)) {
          if (this.editFieldKey === 'account') {
            const valid =
              this.value && /^\w{6,15}$/.test(this.value) && /[a-zA-Z]/.exec(this.value);
            if (!valid) {
              return uni.showToast({
                icon: 'none',
                title: `账号格式不符`,
                duration: 2000,
              });
            }
          }
          if (this.editFieldKey === 'nickName') {
            const valid = this.value && /^[^@<>/]{2,24}$/.test(this.value);
            console.log(valid);
            if (!valid) {
              return uni.showToast({
                icon: 'none',
                title: `昵称格式不符`,
                duration: 2000,
              });
            }
          }
        }
        // 下面走请求操作，现在默认请求成功
        console.log(this.editFieldName);
        console.log(this.editFieldKey);
        console.log(this.value);
        // 成功以后直接修改本地的用户信息数据
        const app = getApp();
        const { userInfo } = app.globalData;
        userInfo[this.editFieldKey] = this.value;
        uni.navigateBack();
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
      .career-edit-content {
        display: flex;
        padding-top: 24rpx;
        .career-tag {
          padding: 4rpx 16rpx;
          margin-right: 12rpx;
          border-radius: 4px;
          background-color: #eeeeee;
        }
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
