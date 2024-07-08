<template>
  <view class="dynamics-list">
    <water-fall :data="data" @clickItem="clickItem">
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
      <template v-slot:bottom>
        <u-loadmore
          :status="loading ? 'loading' : data.length >= total ? 'nomore' : 'loadmore'"
          :load-text="{ loadmore: '上拉加载', loading: '', nomore: '没有更多了' }"
          font-size="24"
        />
      </template>
    </water-fall>
  </view>
</template>
<script>
  import waterFall from '../../components/water-fall/water-fall.vue';
  import { getRandomIntInclusive } from '../../utils/index.js';

  export default {
    components: {
      waterFall,
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
              title: '这是动态标题',
              content: '这是动态内容',
              images: [
                `https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/temp/0${getRandomIntInclusive(
                  1,
                  5
                )}.JPG`,
              ],
              publisher: '周啊粥',
              publisherAvatar: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/ramses/avatar.png',
              like: true,
              likeCount: 10,
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
<style lang="scss" scoped>
  .dynamics-list {
    padding: 16rpx;
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
  }
</style>
