<template>
  <view class="mine-container">
    <view class="mine-content">
      <view class="mine-info">
        <view class="avatar-container">
          <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
        </view>
        <view class="describle-container">
          <view class="nickName">
            <text style="margin-right: 8px">{{ userInfo.nickName }}</text>
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
              size="12"
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
          <view class="right-btn"><uni-icons type="gear" size="20" color="#fff" /></view>
        </view>
      </view>
    </view>
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
    <view class="social-activity-container">
      <view class="social-activity-content">
        <water-fall :data="dynamicData" @clickItem="clickItem" @scrolltoupper="scrollToUpper" @scrolltolower="scrollToLower">
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
                    size="18"
                  ></uni-icons>
                  <view class="like-count">{{ slotProps.item.likeCount }}</view>
                </view>
              </view>
            </view>
          </template>
        </water-fall>
      </view>
    </view>
  </view>
</template>
<script>
  import tuiTabs from '../components/thorui/tui-tabs/tui-tabs.vue';
  import waterFall from '../components/water-fall/water-fall.vue';
  const InfoTagsFields = ['age', 'region', 'career', 'mbti'];
  export default {
    components: {
      tuiTabs,
      waterFall,
    },
    data() {
      return {
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
            name: '活动',
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
            images: [
              'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240701193658.jpg',
            ],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            like: true,
            likeCount: 10,
          },
          {
            id: 1,
            title: '这是动态标题',
            content: '这是动态内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/IMG_E3164.JPG'],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            like: false,
            likeCount: 20,
          },
          {
            id: 2,
            title: '这是动态标题',
            content: '这是动态内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/IMG_E3164.JPG'],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            like: false,
            likeCount: 20,
          },
          {
            id: 3,
            title: '这是动态标题',
            content: '这是动态内容',
            images: ['https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/IMG_E3164.JPG'],
            publisher: '周啊粥',
            publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
            like: false,
            likeCount: 20,
          },
        ],
        activityData: [],
        publishData: [],
      };
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
  .mine-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    .mine-content {
      padding: 16px;
      padding-top: 100px;
      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url('https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240701193658.jpg');
      background-size: 100%;
      .mine-info {
        display: flex;
        .avatar-container {
          .avatar {
            display: block;
            height: 80px;
            width: 80px;
            border-radius: 50%;
          }
        }
        .describle-container {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 12px;
          padding-top: 6px;
          padding-bottom: 6px;
          .nickName {
            font-size: 19px;
            font-weight: 600;
            color: #fff;
          }
          .account {
            color: #8d8a8e;
            font-size: 13px;
          }
        }
      }
      .mine-signature {
        margin-top: 16px;
        font-size: 13px;
        color: #fff;
      }
      .mine-info-tags {
        margin-top: 16px;
        .info-tags-container {
          display: flex;
          .info-tag {
            margin-right: 4px;
            padding: 0 8px;
            height: 22px;
            line-height: 22px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 11px;
            font-size: 10px;
            color: #fff;
          }
        }
      }
      .mine-socializing {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        .left {
          display: flex;
          .left-item {
            margin-right: 16px;
            text-align: center;
            .count {
              font-size: 14px;
              font-weight: 600;
              color: #fff;
            }
            .cate {
              font-size: 11px;
              color: #d0cfcf;
            }
          }
        }
        .right {
          display: flex;
          font-size: 13px;
          .right-btn {
            height: 24px;
            padding: 0 12px;
            margin-left: 16px;
            line-height: 24px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            border: 1px solid #fff;
            font-size: 14px;
            color: #fff;
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
            padding: 8px;
            font-size: 14px;
            color: #333;
          }
          .dynamic-item-action {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 8px 12px;
            .publisher-info {
              display: flex;
              align-items: center;
              .publisher-avatar {
                margin-right: 8px;
                image {
                  display: block;
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  border: 1px solid #00000010;
                  overflow: hidden;
                }
              }
              .publisher-nick-name {
                font-size: 12px;
                color: #515151;
              }
            }
            .like-info {
              display: flex;
              align-items: center;
              font-size: 12px;
              .like-count {
                margin-left: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
