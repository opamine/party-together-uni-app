<template>
  <view
    v-if="navHeight"
    class="mine-header"
    :style="{
      height: navHeight + 'px',
      paddingTop: statusBarHeight + 'px',
      boxSizing: 'border-box',
      opacity: mineHeaderOpacity,
    }"
  >
    {{ userInfo.nickName }}
  </view>
  <view class="mine-container">
    <view class="mine-content" :style="{ paddingTop: navHeight + 'px' }">
      <view class="mine-info">
        <view class="avatar-container">
          <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
        </view>
        <view class="describle-container">
          <view class="nickName">
            <text>{{ userInfo.nickName }}</text>
          </view>
          <view class="account">派对账号：{{ userInfo.account }}</view>
        </view>
      </view>
      <view class="mine-signature">
        {{ userInfo.signature || '这个人还没有个性签名' }}
      </view>
      <view class="mine-info-tags">
        <view class="info-tags-container">
          <view v-for="item in InfoTagsFields" :key="item" class="info-tag">
            <uni-icons
              v-if="item === 'age'"
              custom-prefix="iconfont"
              type="icon-40nan-1"
              size="24rpx"
              color="#7fc1fe"
              style="margin-right: 4px"
            />
            <text v-if="item === 'region'">{{
              userInfo[item]?.[0] ?? '' + userInfo[item]?.[1] ?? ''
            }}</text>
            <text v-else>{{ userInfo[item] }}</text>
            <text v-if="item === 'age' && userInfo[item]">岁</text>
          </view>
          <template v-if="userInfo.career && userInfo.career.length">
            <view v-for="item in userInfo.career" :key="item" class="info-tag">
              <text>{{ item.split('-')[1] }}</text>
            </view>
          </template>
        </view>
      </view>
      <view class="mine-socializing">
        <view class="left">
          <view class="left-item">
            <view class="count">20</view>
            <view class="cate">关注</view>
          </view>
          <view class="left-item">
            <view class="count">30</view>
            <view class="cate">粉丝</view>
          </view>
          <view class="left-item">
            <view class="count">99</view>
            <view class="cate">活动次数</view>
          </view>
          <view class="left-item">
            <view class="count">99</view>
            <view class="cate">动态获赞</view>
          </view>
        </view>
        <view class="right">
          <view class="right-btn" @click="handleEditPersonal">编辑资料</view>
          <view class="right-btn"><uni-icons type="gear" size="30rpx" color="#fff" /></view>
        </view>
      </view>
    </view>
    <u-sticky :offset-top="navHeightOfRpx" :h5-nav-height="navHeight">
      <view class="mine-social-activity-tabs">
        <u-tabs
          :list="tabs"
          :is-scroll="false"
          v-model="currentTab"
          @change="changeTab"
          active-color="#000"
          inactive-color="#989898"
          :bold="false"
          :height="90"
        ></u-tabs>
      </view>
    </u-sticky>
    <view
      v-show="currentTab === 0"
      :style="{
        boxSizing: 'border-box',
        minHeight: screenHeight - navHeight - tabsHeight + 'px',
      }"
    >
      <!-- 动态组件 -->
      <dynamic-list ref="dynamicList"></dynamic-list>
    </view>
    <view
      v-show="currentTab === 1"
      :style="{
        boxSizing: 'border-box',
        minHeight: screenHeight - navHeight - tabsHeight + 'px',
      }"
    >
      <!-- 活动参与组件 -->
      <activity-list ref="activityList" mode="participate"></activity-list>
    </view>
    <view
      v-show="currentTab === 2"
      :style="{
        boxSizing: 'border-box',
        minHeight: screenHeight - navHeight - tabsHeight + 'px',
      }"
    >
      <!-- 我的发布组件 -->
      <activity-list ref="publishList" mode="publish"></activity-list>
    </view>
  </view>
</template>
<script>
  import waterFall from '../components/water-fall/water-fall.vue';
  import participatorList from '../components/participator-list/participator-list.vue';
  import dynamicList from './dynamic/dynamicList.vue';
  import activityList from './activity/activityList.vue';

  const InfoTagsFields = ['age', 'region', 'mbti'];

  export default {
    components: {
      waterFall,
      participatorList,
      dynamicList,
      activityList,
    },
    data() {
      return {
        screenHeight: 0, // px
        navHeight: 0, // px
        statusBarHeight: 0, // px
        navigationBarHeight: 0, // px
        mineHeaderOpacity: 0,
        mineContentHeight: 0,
        scrollTop: 0,
        userInfo: {},
        InfoTagsFields,
        currentTab: 0,
        tabs: [
          {
            name: '动态',
          },
          {
            name: '活动参与',
          },
          {
            name: '我的发布',
          },
        ],
        tabsHeight: uni.upx2px(90),
      };
    },
    computed: {
      // 导航栏高度 rpx 为单位，u-sticky 组件需要使用
      navHeightOfRpx() {
        return this.navHeight / (uni.upx2px(100) / 100);
      },
    },
    onLoad() {
      console.log('onLoad');
      const app = getApp();
      const { statusBarHeight, navigationBarHeight, navHeight } = app.globalData;
      // 去除底部导航栏，可视窗口的高度
      this.screenHeight = uni.getSystemInfoSync().windowHeight;
      // 手机状态栏高度
      this.statusBarHeight = statusBarHeight;
      // 默认导航栏高度（小程序拥有）
      this.navigationBarHeight = navigationBarHeight;
      // 状态栏+导航栏 高度
      this.navHeight = navHeight;
    },
    onShow() {
      const app = getApp();
      this.userInfo = app.globalData.userInfo;
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
      // 150 是用户头像的高度，如果滚动超过这个距离，需要在顶部展示用户的头像和昵称
      if (e.scrollTop <= uni.upx2px(150)) {
        this.mineHeaderOpacity = e.scrollTop / uni.upx2px(150);
      } else {
        this.mineHeaderOpacity = 1;
      }
    },
    onPullDownRefresh() {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 1000);
    },
    onReachBottom() {
      console.log('reachBottom');
      switch (this.currentTab) {
        case 0:
          this.$refs.dynamicList.getData();
          break;
        case 1:
          this.$refs.activityList.getData();
          break;
        case 2:
          this.$refs.publishList.getData();
          break;
        default:
          break;
      }
    },
    onReady() {
      uni
        .createSelectorQuery()
        .select('.mine-content')
        .boundingClientRect((data) => {
          this.mineContentHeight = data.height;
        })
        .exec();
    },
    methods: {
      changeTab() {
        if (this.scrollTop >= this.mineContentHeight - this.navHeight) {
          uni.pageScrollTo({
            scrollTop: this.mineContentHeight - this.navHeight,
            duration: 0,
          });
        }
      },
      handleEditPersonal() {
        uni.navigateTo({
          url: '/pages/personal/edit',
        });
      },
    },
  };
</script>
<style lang="scss">
  .mine-header {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #ffffff;
    font-weight: 600;
    z-index: 999;
  }
  .mine-container {
    .mine-content {
      padding: 32rpx;
      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url('https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/baground01.jpg');
      background-size: 100%;
      .mine-info {
        display: flex;
        .avatar-container {
          .avatar {
            display: block;
            height: 150rpx;
            width: 150rpx;
            border-radius: 50%;
          }
        }
        .describle-container {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 12px;
          padding-top: 12rpx;
          padding-bottom: 12rpx;
          .nickName {
            font-size: 38rpx;
            font-weight: 600;
            color: #fff;
          }
          .account {
            color: #8d8a8e;
            font-size: 22rpx;
          }
        }
      }
      .mine-signature {
        margin-top: 32rpx;
        font-size: 26rpx;
        color: #fff;
      }
      .mine-info-tags {
        margin-top: 32rpx;
        .info-tags-container {
          display: flex;
          .info-tag {
            margin-right: 8rpx;
            padding: 0 16rpx;
            height: 44rpx;
            line-height: 44rpx;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 22rpx;
            font-size: 20rpx;
            color: #fff;
          }
        }
      }
      .mine-socializing {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 32rpx;
        .left {
          display: flex;
          .left-item {
            margin-right: 16px;
            text-align: center;
            .count {
              font-size: 28rpx;
              font-weight: 600;
              color: #fff;
            }
            .cate {
              font-size: 22rpx;
              color: #d0cfcf;
            }
          }
        }
        .right {
          display: flex;
          font-size: 24rpx;
          .right-btn {
            height: 48rpx;
            padding: 0 28rpx;
            line-height: 48rpx;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 24rpx;
            border: 1px solid #fff;
            font-size: 26rpx;
            font-weight: 600;
            color: #fff;
            &:first-of-type {
              margin-right: 24rpx;
            }
          }
        }
      }
    }
  }
</style>
