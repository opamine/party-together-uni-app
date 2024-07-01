<template>
  <view class="order-container">
    <view class="store-info">
      <view class="store-location">
        <view class="store-name">
          <text style="margin-right: 6px">{{ storeInfo.name }}</text>
          <uni-icons type="right" size="14" />
        </view>
        <view class="store-distance"><uni-icons type="location" size="14" color="#666666" /> 距您{{ storeInfo.distance }}m</view>
      </view>
      <view class="pick-up-type" @click="handleChangePickUpType(pickUpType === 0 ? 1 : 0)">
        <view class="pick-up-type-item" :class="{ active: pickUpType === 0 }">自提</view>
        <view class="pick-up-type-item" :class="{ active: pickUpType === 1 }">外送</view>
      </view>
    </view>
    <view class="notice-container">
      <uni-notice-bar
        show-icon
        scrollable
        background-color="#f5f7fc"
        color="#2d40ed"
        text="拿铁咖啡限时优惠，快来和你的小伙伴一起体验 9.9 的夏日清爽吧～"
      />
    </view>
    <view class="menu-container">
      <view class="menu-left">
        <scroll-view
          scroll-y="true"
          :style="{ height: scrollViewHeight + 'px' }"
          :enhanced="true"
          :show-scrollbar="false"
          :scroll-with-animation="true"
          :scroll-into-view="'menu-left-' + currentCategoryId"
        >
          <view class="category-list">
            <view
              v-for="(item, index) in categoryList"
              :key="item.id"
              :id="'menu-left-' + item.id"
              class="category-item"
              :class="{ active: item.id === currentCategoryId }"
              @click="handleClickCategory(item, index)"
            >
              <view class="category-item-name">{{ item.name }}</view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="menu-right">
        <scroll-view
          scroll-y="true"
          :style="{ height: scrollViewHeight + 'px' }"
          :enhanced="true"
          :show-scrollbar="false"
          :scroll-with-animation="true"
          :scroll-top="menuRightScrollTop"
          @scroll="handleMenuRightScroll"
        >
          <view class="categroy-goods-list">
            <view v-for="category in categoryList" :key="category.id" class="categroy-goods card">
              <view class="category-info">
                <view class="category-name">{{ category.name }}</view>
                <view class="category-desc">{{ category.desc }}</view>
              </view>
              <view class="goods-list">
                <view v-for="product in category.goods" :key="product.id" class="product">
                  <view class="product-picture">
                    <image :src="product.img" alt="product-img" />
                  </view>
                  <view class="product-info-price">
                    <view class="product-info">
                      <view class="product-name">{{ product.name }}</view>
                      <view class="product-desc">{{ product.desc }}</view>
                    </view>
                    <view class="product-price-buy">
                      <view class="product-price">
                        <view class="discount-price">
                          <text class="unit">¥</text>
                          <text class="num">{{ product.preferentialPrice }}</text>
                        </view>
                        <view class="origin-price">
                          <text class="unit">¥</text>
                          <text class="num">{{ product.price }}</text>
                        </view>
                      </view>
                      <view class="add-btn">
                        <uni-icons type="plus-filled" size="30" />
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="no-more">我是有底线的～</view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        storeInfo: {
          name: '浙江杭州文新地铁站店',
          distance: '200',
        },
        pickUpType: 0, // 0: 自提 1: 外送
        // 分类及商品列表
        categoryList: [
          {
            id: 0,
            name: '人气Top',
            desc: '必喝爆款，无限回购',
            goods: [
              {
                id: 0,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁生椰拿铁生椰拿铁生椰拿铁生椰拿铁生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！3年突破7亿杯，原创YYDS！3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
              {
                id: 1,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
              {
                id: 2,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
              {
                id: 3,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
              {
                id: 4,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
              {
                id: 5,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
              {
                id: 6,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
            ],
          },
          { id: 1, name: '爆款套餐', desc: '必喝爆款，无限回购' },
          { id: 2, name: '520限定', desc: '必喝爆款，无限回购' },
          { id: 3, name: '健康冰咖季', desc: '必喝爆款，无限回购' },
          { id: 4, name: '生椰家族', desc: '必喝爆款，无限回购' },
          { id: 5, name: '美式家族', desc: '必喝爆款，无限回购' },
          { id: 6, name: '酱香拿铁', desc: '必喝爆款，无限回购' },
          { id: 7, name: '中国茶咖', desc: '必喝爆款，无限回购' },
          { id: 8, name: '大师咖啡', desc: '必喝爆款，无限回购' },
          { id: 9, name: '瑞纳冰', desc: '必喝爆款，无限回购' },
          {
            id: 10,
            name: 'SOE小黑杯',
            desc: '必喝爆款，无限回购',
            goods: [
              {
                id: 0,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
              {
                id: 1,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
              {
                id: 2,
                categoryId: 0,
                img: 'https://zzh-assets.oss-cn-hangzhou.aliyuncs.com/uni-demo-app/coffee-01.jpg',
                name: '生椰拿铁',
                desc: '3年突破7亿杯，原创YYDS！',
                price: '11.02',
                preferentialPrice: '9.9',
              },
            ],
          },
        ],
        scrollViewHeight: 0, // 计算得来的菜单滚动区域高度，需要赋值给 scroll-view
        currentCategoryId: 0, // 当前选中的菜单分类 id
        menuRightScrollTop: 0,
        oldMenuRightScrollTop: 0,
        timer: null,
      };
    },
    computed: {
      // 分类商品卡片高度
      categoryGoodsCardScrollTopMap() {
        const categoryListGoodsCardHeightMap = this.categoryList.map((item) => {
          // 卡片上下内边距 + 分类标题和描述 + 单品内容高度 96*n + 下外边距
          return 30 + 40 + ((item.goods && item.goods.length) || 0) * 96 + 12;
        });
        // 映射距离 scroll-view top 的距离
        return categoryListGoodsCardHeightMap.map((_item, index) => {
          return categoryListGoodsCardHeightMap.slice(0, index + 1).reduce((sum, c) => sum + c, 0);
        });
      },
    },
    methods: {
      // 自提 or 外送 切换
      handleChangePickUpType(type) {
        this.pickUpType = type;
      },
      // 选中菜单分类目录
      handleClickCategory(category, index) {
        if (category.id === this.currentCategoryId) return;
        this.currentCategoryId = category.id;
        // 下方这行代码，修改 menuRightScrollTop 的值，也会触发 @scroll 事件，执行 handleMenuRightScroll 函数
        // 所以上面一行代码可以去掉，为了使用户点击响应选中更快，所以留着
        this.menuRightScrollTop = this.oldMenuRightScrollTop;
        this.$nextTick(() => {
          this.menuRightScrollTop = index === 0 ? 0 : this.categoryGoodsCardScrollTopMap[index - 1];
        });
      },
      // 菜单右侧滚动监听
      handleMenuRightScroll(e) {
        for (let i = 0; i < this.categoryGoodsCardScrollTopMap.length; i++) {
          if (e.detail.scrollTop < this.categoryGoodsCardScrollTopMap[i]) {
            this.currentCategoryId = this.categoryList[i].id;
            this.oldMenuRightScrollTop = e.detail.scrollTop;
            break;
          }
        }
      },
    },
    onReady() {
      uni.getSystemInfo({
        success: (res) => {
          const viewHeight = res.windowHeight;
          const scrollViewContainer = uni.createSelectorQuery().select('.menu-container');
          scrollViewContainer.boundingClientRect().exec((data) => {
            this.scrollViewHeight = viewHeight - data[0].top;
          });
        },
      });
    },
  };
</script>
<style lang="scss" scoped>
  .order-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .store-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: #fff;
      .store-location {
        .store-name {
          font-size: 16px;
          font-weight: 600;
        }
        .store-distance {
          margin-top: 6px;
          font-size: 13px;
          color: #666666;
        }
      }
      .pick-up-type {
        display: flex;
        padding: 4px;
        background-color: #f6f6f6;
        border-radius: 17.5px;
        font-size: 14px;
        .pick-up-type-item {
          padding: 4px 8px;
          border-radius: 13.5px;
          &:first-of-type {
            margin-right: 8px;
          }
          &.active {
            background-color: #000;
            color: #fff;
          }
        }
      }
    }
    .menu-container {
      flex: 1;
      display: flex;
      .menu-left {
        width: 90px;
        margin-right: 8px;
        .category-list {
          .category-item {
            padding: 6px 0;
            .category-item-name {
              height: 38px;
              padding-left: 16px;
              border-top-right-radius: 19px;
              border-bottom-right-radius: 19px;
              line-height: 38px;
              font-size: 14px;
              color: #666;
            }
            &.active {
              .category-item-name {
                background-color: #e5e5e5;
                color: #333;
                font-weight: 600;
              }
            }
          }
        }
      }
      .menu-right {
        flex: 1;
        .categroy-goods-list {
          .categroy-goods {
            margin-bottom: 12px;
            .category-info {
              height: 40px;
              .category-name {
                font-size: 15px;
                font-weight: 600;
              }
              .category-desc {
                font-size: 12px;
                color: #999999;
              }
            }
            .goods-list {
              .product {
                display: flex;
                margin-top: 16px;
                .product-picture {
                  margin-right: 8px;
                  image {
                    display: block;
                    width: 80px;
                    height: 80px;
                  }
                }
                .product-info-price {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  .product-info {
                    .product-name {
                      display: -webkit-box;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      word-wrap: break-word;
                      white-space: normal !important;
                      -webkit-line-clamp: 1;
                      -webkit-box-orient: vertical;
                      font-size: 15px;
                      color: #333;
                    }
                    .product-desc {
                      display: -webkit-box;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      word-wrap: break-word;
                      white-space: normal !important;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                      font-size: 12px;
                      color: #999;
                    }
                  }
                  .product-price-buy {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .product-price {
                      display: flex;
                      .discount-price {
                        margin-right: 6px;
                        color: #f65a2a;
                        .unit {
                          margin-right: 2px;
                          font-size: 12px;
                        }
                        .num {
                          font-size: 14px;
                          font-weight: 600;
                        }
                      }
                      .origin-price {
                        color: #777;
                        text-decoration: line-through;
                        .unit {
                          margin-right: 2px;
                          font-size: 12px;
                        }
                        .num {
                          font-size: 12px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .no-more {
            height: 40px;
            line-height: 25px;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
        }
      }
    }
  }
</style>
1
