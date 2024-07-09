<template>
  <view class="activities-list">
    <view v-for="item in data" :key="item.id" class="activity-item" @click="clickItem">
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
                ><uni-dateformat :date="item.startTime" format="yyyy.MM.dd hh:mm"></uni-dateformat
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
    <u-loadmore
      :status="loading ? 'loading' : data.length >= total ? 'nomore' : 'loadmore'"
      :load-text="{ loadmore: '上拉加载', loading: '', nomore: '没有更多了' }"
      font-size="24"
    />
  </view>
</template>
<script>
  export default {
    props: {
      mode: {
        type: String,
        validator: (value) => ['participate', 'publish'].includes(value),
      },
    },
    data() {
      return {
        data: [],
        loading: false,
        current: 1,
        size: 10,
        total: 0,
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        if (this.current > 1 && this.data.length >= this.total) return;
        this.loading = true;
        setTimeout(() => {
          this.current++;
          const resultData = [];
          for (let i = 0; i < 10; i++) {
            resultData.push({
              id: i + (this.current - 1) * this.size,
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
            });
          }
          this.data = this.data.concat(resultData);
          this.current++;
          this.total = 20;
          this.$nextTick(() => {
            this.loading = false;
          });
        }, 1000);
      },
      clickItem(item) {
        console.log(item);
      },
    },
  };
</script>
<style lang="less" scoped>
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
            height: 220rpx;
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
</style>
