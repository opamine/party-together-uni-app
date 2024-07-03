<template>
  <!-- <uni-nav-bar :fixed="true" title="导航栏组件" height="100rpx" :border="false" :statusBar="true"></uni-nav-bar> -->
  <view
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
            <text>{{ userInfo[item] }}</text>
            <text v-if="item === 'age' && userInfo[item]">岁</text>
          </view>
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
          <view class="right-btn">编辑资料</view>
          <view class="right-btn"><uni-icons type="gear" size="28rpx" color="#fff" /></view>
        </view>
      </view>
    </view>
    <tui-sticky :scrollTop="scrollTop" :stickyTop="navHeight" stickyHeight="90rpx">
      <template v-slot:header>
        <view class="mine-social-activity-tabs">
          <tui-tabs
            :tabs="tabs"
            :currentTab="currentTab"
            @change="changeTab"
            sliderBgColor="#000000"
            selectedColor="#000"
            :height="90"
          ></tui-tabs>
        </view>
      </template>
    </tui-sticky>

    <view class="social-activity-container">
      <view class="social-activity-content">
        <view v-if="currentTab === 0">
          <!-- 动态组件 -->
          <water-fall
            :data="dynamicData"
            @clickItem="clickItem"
            @scrolltoupper="scrollToUpper"
            @scrolltolower="scrollToLower"
          >
            <template v-slot:default="slotProps">
              <view class="dynamic-item">
                <view class="dynamic-item-image">
                  <image :src="slotProps.item.images[0]" mode="widthFix"></image>
                </view>
                <view class="dynamic-item-title">{{ slotProps.item.title }}</view>
                <view class="dynamic-item-action">
                  <view class="publisher-info">
                    <view class="publisher-avatar">
                      <image :src="slotProps.item.publisherAvatar"></image>
                    </view>
                    <view class="publisher-nick-name">{{ slotProps.item.publisher }}</view>
                  </view>
                  <view class="like-info">
                    <uni-icons
                      :type="slotProps.item.like ? 'heart-filled' : 'heart'"
                      :color="slotProps.item.like ? '#e44747' : '#5f5f5f'"
                      size="36rpx"
                    ></uni-icons>
                    <view class="like-count">{{ slotProps.item.likeCount }}</view>
                  </view>
                </view>
              </view>
            </template>
          </water-fall>
        </view>
        <view v-if="currentTab === 1">
          <!-- 活动参与组件 -->
          <view class="activities-list">
            <view v-for="item in activityData" :key="item.id" class="activity-item">
              <view class="activity-info">
                <view class="activity-image">
                  <image :src="item.images[0]" mode="aspectFill"></image>
                </view>
                <view class="activity-desc">
                  <view class="activity-title">
                    {{ item.title }}
                  </view>
                  <view class="activity-desc-sub">
                    <view class="activity-time">
                      <view class="icon"><uni-icons type="calendar" size="32rpx"></uni-icons></view>
                      <view class="text"
                        ><uni-dateformat
                          :date="item.startTime"
                          format="yyyy.MM.dd hh:mm"
                        ></uni-dateformat
                      ></view>
                    </view>
                    <view class="activity-address">
                      <view class="icon"><uni-icons type="location" size="32rpx"></uni-icons></view>
                      <view class="text">{{ item.addressName }}</view>
                    </view>
                    <view class="activity-publisher">
                      <view class="icon"><uni-icons type="person" size="32rpx"></uni-icons></view>
                      <view class="text">{{ item.publisher }}</view>
                    </view>
                  </view>
                </view>
              </view>
              <view class="activity-actions">
                <view class="participator-container">
                  <participator-list></participator-list>
                </view>
                <view class="action-btn-container">
                  <view class="action-btn">活动回顾</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-if="currentTab === 2">
          <!-- 我的发布组件 -->
          <view class="activities-list">
            <view v-for="item in publishData" :key="item.id" class="activity-item">
              <view class="activity-info">
                <view class="activity-image">
                  <image :src="item.images[0]" mode="aspectFill"></image>
                </view>
                <view class="activity-desc">
                  <view class="activity-title">
                    {{ item.title }}
                  </view>
                  <view class="activity-desc-sub">
                    <view class="activity-time">
                      <view class="icon"><uni-icons type="calendar" size="16"></uni-icons></view>
                      <view class="text"
                        ><uni-dateformat
                          :date="item.startTime"
                          format="yyyy.MM.dd hh:mm"
                        ></uni-dateformat
                      ></view>
                    </view>
                    <view class="activity-address">
                      <view class="icon"><uni-icons type="location" size="16"></uni-icons></view>
                      <view class="text">{{ item.addressName }}</view>
                    </view>
                    <view class="activity-publisher">
                      <view class="icon"><uni-icons type="person" size="16"></uni-icons></view>
                      <view class="text">{{ item.publisher }}</view>
                    </view>
                  </view>
                </view>
              </view>
              <view class="activity-actions">
                <view class="participator-container">
                  <participator-list></participator-list>
                </view>
                <view class="action-btn-container">
                  <view class="action-btn">活动回顾</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import tuiTabs from '../components/thorui/tui-tabs/tui-tabs.vue';
  import tuiSticky from '../components/thorui/tui-sticky/tui-sticky.vue';
  import waterFall from '../components/water-fall/water-fall.vue';
  import participatorList from '../components/participator-list/participator-list.vue';

  const InfoTagsFields = ['age', 'region', 'career', 'mbti'];

  export default {
    components: {
      tuiTabs,
      tuiSticky,
      waterFall,
      participatorList,
    },
    data() {
      return {
        navHeight: 0,
        statusBarHeight: 0,
        navigationBarHeight: 0,
        mineHeaderOpacity: 0,
        scrollTop: 0,
        userInfo: {
          id: 1998,
          nickName: '周啊粥',
          account: 'zzhou998',
          avatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
          signature: '❤ 逆水行舟，不进则退',
          gender: 'male',
          age: 26,
          region: '浙江杭州',
          career: '互联网从业者',
          mbti: 'INTJ',
        },
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
        dynamicData: [
          {
            id: 0,
            title: '这是动态标题',
            content: '这是动态内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/01.jpg'],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            like: true,
            likeCount: 10,
          },
          {
            id: 1,
            title: '这是动态标题',
            content: '这是动态内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/02.JPG'],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            like: false,
            likeCount: 20,
          },
          {
            id: 2,
            title: '这是动态标题',
            content: '这是动态内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/03.JPG'],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            like: false,
            likeCount: 20,
          },
          {
            id: 3,
            title: '这是动态标题',
            content: '这是动态内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/04.JPG'],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            like: false,
            likeCount: 20,
          },
        ],
        activityData: [
          {
            id: 0,
            title:
              '这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题',
            content: '这是一个很长的活动内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/10.JPG'],
            publisher: '丸子',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            startTime: 1719900150185,
            addressName: '文宋阁·肆舍',
            location: '浙江省杭州市萧山区望京C1座35楼E-F室',
            lnglat: [120.254429, 30.237911],
          },
          {
            id: 1,
            title:
              '这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题',
            content: '这是一个很长的活动内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/10.JPG'],
            publisher: '丸子',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            startTime: 1719900150185,
            addressName: '文宋阁·肆舍',
            location: '浙江省杭州市萧山区望京C1座35楼E-F室',
            lnglat: [120.254429, 30.237911],
          },
          {
            id: 2,
            title:
              '这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题',
            content: '这是一个很长的活动内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/10.JPG'],
            publisher: '丸子',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            startTime: 1719900150185,
            addressName: '文宋阁·肆舍',
            location: '浙江省杭州市萧山区望京C1座35楼E-F室',
            lnglat: [120.254429, 30.237911],
          },
        ],
        publishData: [
          {
            title:
              '这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题这是一个很长的活动标题',
            content: '这是一个很长的活动内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/21.JPG'],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            startTime: 1821121211551,
            addressName: '西湖杨公堤',
            location: '浙江省杭州市萧山区望京C1座35楼E-F室',
            lnglat: [120.254429, 30.237911],
          },
        ],
      };
    },
    onLoad() {
      this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
      // #ifdef MP-WEIXIN
      const custom = wx.getMenuButtonBoundingClientRect();
      this.navigationBarHeight =
        custom.height + (custom.top - uni.getSystemInfoSync().statusBarHeight) * 2;
      // #endif
      this.navHeight = this.statusBarHeight + this.navigationBarHeight;
    },
    onPageScroll: function (e) {
      this.scrollTop = e.scrollTop;
      if (e.scrollTop <= uni.upx2px(150)) {
        this.mineHeaderOpacity = e.scrollTop / uni.upx2px(150);
      } else {
        this.mineHeaderOpacity = 1;
      }
    },
    methods: {
      changeTab(e) {
        this.currentTab = e.index;
      },
      clickItem(item) {
        console.log(item);
      },
      scrollToUpper() {
        console.log('滚到顶了');
      },
      scrollToLower() {
        console.log('滚到底了');
      },
    },
    onPullDownRefresh() {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 1000);
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
    height: 70px;
    background-color: #ffffff;
    z-index: 999;
  }
  .mine-container {
    .mine-content {
      padding: 32rpx;
      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url('https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/01.jpg');
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
    .social-activity-container {
      flex: 1;
      overflow: auto;
      .social-activity-content {
        height: 100%;
        .dynamic-item {
          flex: 1;
          background-color: #fff;
          border-radius: 4px;
          overflow: auto;
          .dynamic-item-image {
            width: 100%;
            image {
              width: 100%;
            }
          }
          .dynamic-item-title {
            padding: 16rpx;
            font-size: 26rpx;
            color: #333;
          }
          .dynamic-item-action {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16rpx 16rpx;
            .publisher-info {
              display: flex;
              align-items: center;
              .publisher-avatar {
                margin-right: 16rpx;
                image {
                  display: block;
                  width: 42rpx;
                  height: 42rpx;
                  border-radius: 50%;
                  border: 1px solid #00000010;
                  overflow: hidden;
                }
              }
              .publisher-nick-name {
                font-size: 24rpx;
                color: #515151;
              }
            }
            .like-info {
              display: flex;
              align-items: center;
              font-size: 24rpx;
              .like-count {
                margin-left: 8rpx;
              }
            }
          }
        }
        .activities-list {
          padding: 16rpx;
          .activity-item {
            padding: 16rpx;
            margin-bottom: 16rpx;
            background-color: #fff;
            border-radius: 4px;
            &:last-of-type {
              margin-bottom: 0;
            }
            .activity-info {
              display: flex;
              .activity-image {
                margin-right: 16rpx;
                image {
                  display: block;
                  width: 320rpx;
                  height: 200rpx;
                  border-radius: 4px;
                }
              }
              .activity-desc {
                flex: 1;
                .activity-title {
                  font-size: 28rpx;
                  font-weight: 600;
                  word-break: break-all;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
                  overflow: hidden;
                }
                .activity-desc-sub {
                  font-size: 24rpx;
                  color: #696969;
                  .activity-time,
                  .activity-address,
                  .activity-publisher {
                    display: flex;
                    align-items: center;
                    .icon {
                      margin-right: 8rpx;
                    }
                  }
                  .activity-time {
                    margin-top: 16rpx;
                  }
                  .activity-address {
                    margin-top: 4rpx;
                  }
                  .activity-publisher {
                    margin-top: 4rpx;
                  }
                }
              }
            }
            .activity-actions {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 24rpx;
              .action-btn {
                height: 60rpx;
                padding: 0 24rpx;
                background-color: #333;
                border-radius: 30rpx;
                line-height: 60rpx;
                color: #fff;
                font-size: 24rpx;
              }
            }
          }
        }
      }
    }
  }
</style>
