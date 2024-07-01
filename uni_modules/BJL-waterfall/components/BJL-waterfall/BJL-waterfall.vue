<template>
	<scroll-view :scroll-y="true" @scrolltolower="scrolltolower" :style="{height: scrollHeight?scrollHeight:'100vh'}">
		<view class="scroll-view_H" style="display: flex;justify-content: space-between" :style="styleData">
			<view class="column" :style="{width:columnWidth}" v-for="(arr,index) in dataArr" :key="index">
				<view class="scroll-item-box">
					<view class="scroll-item" v-for="(item,index) in arr" :key="index" @click="clickItem(item)">
						<slot :item="item,index"></slot>
					</view>
				</view>
			</view>
		</view>
		<slot name="bottom"></slot>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				dataArr: [],
				equipment: 2,
				columnWidth: null
			};
		},
		props: ['data', 'styleData', 'scrollHeight'],
		created() {
			let _this = this
			// 获取设备像素
			_this.dataArr = []
			uni.getSystemInfo({
				success: function(res) {
					if (res.windowWidth >= 768) {
						_this.equipment = 3
						_this.columnWidth = (100 / 3 - 1) + '%'
					} else {
						_this.columnWidth = (100 / 2 - 1) + '%'
					}
				}
			})

		},
		mounted() {
			// 处理数据
			this.handleData()
		},
		watch: {
			data: {
				handler(val, oldVal) {
					this.handleData()
				},
				deep: true
			}
		},
		methods: {
			handleData() {
				this.dataArr.length=0
				this.data.forEach((item, index) => {
					const newIndex = index % this.equipment;
					if (!this.dataArr[newIndex]) {
						this.dataArr[newIndex] = [];
					}
					this.dataArr[newIndex].push(item)
				})
			},
			// 子元素点击事件
			clickItem(item) {
				this.$emit('clickItem', item)
			},
			// 滚动到底部触发
			scrolltolower() {
				this.$emit('scrolltolower', '')
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef H5 || MP-WEIXIN */
	// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
	scroll-view ::v-deep ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	/* #endif */
	.scroll-view_H {
		width: 100vw;
		background-color: transparent;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.column {
		flex-shrink: 0;

		.scroll-item-box {
			width: 100%;
			height: auto;
			overflow: hidden;
		}
	}

	.scroll-item {
		width: 100%;
		height: auto;
	}
</style>