<template>
  <view class="page-container">
    <view class="tabs-container">
      <u-tabs
        :list="tabs"
        :is-scroll="false"
        v-model="currentTab"
        @change="changeTab"
        active-color="#272a30"
        inactive-color="#989898"
        :bold="false"
        :height="90"
      ></u-tabs>
    </view>
    <view class="data-list-container">
      <scroll-view scroll-y style="height: 100%" @scrolltolower="onreachBottom">
        <view class="data-list">
          <view class="data-list-item" v-for="(item, index) in data" :key="index">
            <view class="item-content">
              <view class="content-top" style="height: 40px; width: 100%">
                <view class="contentTopID" style="height: 40px; float: left; line-height: 40px">
                  {{ item.id }}
                </view>
                <view
                  class="contentTopButton"
                  :class="{
                    'tobeConfirmed-button': item.reportStatus === '未确认',
                    'finish-button': item.reportStatus === '已确认',
                  }"
                  style="
                    height: 40px;
                    border-top-right-radius: 20px;
                    float: right;
                    background-color: blue;
                  "
                >
                  {{
                    item.reportStatus === '0'
                      ? '待确认'
                      : item.reportStatus === '已确认'
                      ? '已确认'
                      : ''
                  }}
                </view>
              </view>
              <view class="content-body" style="height: 40px; width: 100%; margin-left: 7rpx">
                <view class="" style="margin-top: 7rpx; font-size: 10px">
                  工单编码：<span>{{ item.workOrderCode }}</span>
                </view>
                <view class="" style="margin-top: 7rpx; font-size: 10px">
                  工序名称：<span>{{ item.procedureName }}</span>
                </view>
                <view class="" style="margin-top: 7rpx; font-size: 10px">
                  物料名称：<span>{{ item.materialName }}</span>
                </view>
                <view class="" style="margin-top: 7rpx; font-size: 10px">
                  报工数量：<span>{{ item.reportQuantity }}</span>
                </view>
                <view class="" style="margin-top: 7rpx; font-size: 10px">
                  创建人：<span>{{ item.creator }}</span>
                </view>
              </view>
            </view>
          </view>
        </view>
        <u-loadmore
          :status="loading ? 'loading' : data.length >= total ? 'nomore' : 'loadmore'"
          :load-text="{ loadmore: '上拉加载', loading: '', nomore: '没有更多了' }"
          font-size="24"
        />
      </scroll-view>
    </view>
    <view class="action-container">
      <view class="draft-button">选择工单</view>
      <view class="primary-button">扫码工单</view>
    </view>
  </view>
</template>

<script>
  import { get } from '@/utils/request.js';
  export default {
    data() {
      return {
        loading: false,
        data: [],
        page: 1,
        size: 10,
        currentTab: 0,
        tabs: [
          {
            name: '全部',
            reportStatus: '',
          },
          {
            name: '待确认',
            reportStatus: '0',
          },
          {
            name: '已确认',
            reportStatus: '1',
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
    onPullDownRefresh() {
      this.page = 1;
      this.data = [];
      this.getData();
    },
    methods: {
      changeTab(tabIndex) {
        console.log(tabIndex);
        this.page = 1;
        this.data = [];
        this.$nextTick(() => {
          this.getData();

        })
      },
      getData() {
        if (this.current > 1 && this.data.length >= this.total) return;
        this.loading = true;
        const data = {
          page: this.page,
          size: this.size,
          workRecordCode: '',
          workOrderCode: '', //工单编码
          procedureCode: '',
          reportStatus: this.tabs[this.currentTab].reportStatus,
        };
        get('/production/product/report/list', data)
          .then((res) => {
            if (res.code === 'RC00000') {
              this.data = this.data.concat(res.data.list);
              this.total = res.data.total;
              this.page++;
            } else if (res.code === 'SE10005') {
              // 按原来逻辑是登陆失效
            } else {
              uni.showToast({
                title: res.message,
                icon: 'none',
                duration: 1000,
              });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      },
      onreachBottom() {
        this.getData();
      },
      goto() {
        uni.navigateTo({
          url: '/pages/Homepage/Homepage',
        });
      },
      AddNewItem() {
        uni.navigateTo({
          url: '/pages/productionReportPage/productionReportPage',
        });
      },
      ChoseItem() {
        uni.navigateTo({
          url: '/pages/choseItemList/choseItemList?pageID=productionReportPage',
        });
      },
    },

    onShow() {
      // 页面显示时调用，包括从后台返回到前台
      this.getData();
    },
  };
</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .data-list-container {
      flex: 1;
      overflow: auto;
      .data-list {
        margin-bottom: 20rpx;
        .data-list-item {
          margin-top: 20rpx;
          .item-content {
            width: 90%;
            height: 360rpx;
            margin-left: 40rpx;
            padding-left: 10px;
            background-color: rgba(255, 255, 255, 0.3);
            box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
            //padding: 0 60rpx 10rpx 60rpx;
            box-sizing: border-box;
            border-radius: 0px 20px 20px 20px;
            color: #505050;
            font-size: 16px;
            background-color: #fff;
          }
        }
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
        background-color: #0ab732;
        color: #fff;
        line-height: 80rpx;
        text-align: center;
      }
      .primary-button {
        flex: 1;
        height: 80rpx;
        border-radius: 40rpx;
        background-color: #1890ff;
        color: #fff;
        line-height: 80rpx;
        text-align: center;
      }
    }
  }
</style>
