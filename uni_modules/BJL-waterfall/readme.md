# BJL-waterfall 使用文档

## 组件介绍

轻量级简单易用的**瀑布流组件**，支持上拉加载，在移动端中自适应显示**两列**，在平板、iPad中自带显示三列；

使用插槽自定义自己的item子元素样式和显示的数据

## 属性说明

| 属性名         | 类型     | 默认值 | 说明             |
| -------------- | -------- | ------ | ---------------- |
| data           | Array    |        | 数据             |
| styleData      | Object   |        | 自定义父元素样式 |
| scrollHeight   | String   | 100vh  | 控制整体高度     |
| @clickItem     | function |        | 子元素的点击事件 |
| @scrolltolower | function |        | 上拉加载事件     |



## 插槽

| 属性名  | 属性值   | 用法                                             | 说明                 |
| ------- | -------- | ------------------------------------------------ | -------------------- |
| v-slot  | 数据插槽 | <template v-slot:default="slotProps"></template> | 自定义item样式与内容 |
| #bottom | 具名插槽 | <template  #bottom > </template>                 | 自定义底部样式与内容 |



## 示例

![498a50ab3e36bd5957b37d818d13ab8](C:\Users\NINGMEI\Documents\WeChat Files\wxid_7yeu4x9drn5322\FileStorage\Temp\498a50ab3e36bd5957b37d818d13ab8.png)

![4bc79fbb8526938c78f4355c22d18ef](C:\Users\NINGMEI\Documents\WeChat Files\wxid_7yeu4x9drn5322\FileStorage\Temp\4bc79fbb8526938c78f4355c22d18ef.png)

```html
<template>
	<view>
		<BJL-waterfall :data="dataArr" @clickItem='clickItem' @scrolltolower='scrolltolower' :styleData="styleData">
			<template v-slot:default="slotProps">
				<view class="card">
					<view class="cover-cl-box">
						<image class="cover-cl" :src="slotProps.item.cover" mode="widthFix"></image>
					</view>
					<view class="txt-box">
						<view class="txt-h">{{slotProps.item.title}}</view>
						<view class="txt-name">
							<view class="name">
								<image class="avatar" :src="slotProps.item.avatar" mode="scaleToFill"></image>
								<view class="name-n">{{slotProps.item.name}}</view>
							</view>
							<view class="dz">{{slotProps.index}}w+</view>
						</view>
					</view>
				</view>
			</template>
			<template #bottom>
				<view class="food-cl">加载更多...</view>
			</template>
		</BJL-waterfall>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataArr: [ {
					"title": "深夜激情下单xm5 ",
					"name": "悲惨修狗",
					"cover": "https://sns-webpic-                   qc.xhscdn.com/202405280915/b2fa5a20be7a7c8ec7517b98432f61bd/1040g2sg3132ouvoego6g5ol1q858cucp5ju9df0!nc_n_webp_mw_1",
					"avatar": "https://sns-avatar-qc.xhscdn.com/avatar/62e8b6f7a31e6e6f8f2ded0e.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip"
				}, {
					"title": "坚持喝醪糟后的身体变化……",
					"name": "柠檬味的YOU",
					"cover": "https://sns-webpic-qc.xhscdn.com/202405280915/bd41e31299b56c9893d3556064e0270a/1040g2sg312jopj0egmc05no2ij308fd366j3nqo!nc_n_webp_mw_1",
					"avatar": "https://sns-avatar-qc.xhscdn.com/avatar/5f0294c60000000001003da3.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip"
				}, {
					"title": "家人们，有四川南充的老乡吗？",
					"name": "雾漫漫",
					"cover": "https://sns-webpic-qc.xhscdn.com/202405280915/782d697b273039be9da3f04b5638c546/1040g00831289jbr454005nv22fag8gdt9rmvkk0!nc_n_webp_mw_1",
					"avatar": "https://sns-avatar-qc.xhscdn.com/avatar/6615c426bc78deddd5c7bfde.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip"
				}, {
					"title": "大自然馈赠的520礼物",
					"name": "如花",
					"cover": "https://sns-webpic-qc.xhscdn.com/202405280915/d97c9397d9de51d41363d23a66ecee67/1040g2sg3130lkvdi70705o4t2v5gbq1cau6s5o0!nc_n_webp_mw_1",
					"avatar": "https://sns-avatar-qc.xhscdn.com/avatar/60e45e2ae1756da8b89d9d2e.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip"
				}, {
					"title": "成都外国语学院 ",
					"name": "小红薯6553CAD0",
					"cover": "https://sns-webpic-qc.xhscdn.com/202405280915/a65511448a80026f81f3ab799ea13136/1040g008312fvqoknhm005paj3moi06verbaubko!nc_n_webp_mw_1",
					"avatar": "https://sns-avatar-qc.xhscdn.com/avatar/645b7f8f2a34639eb26eb1cd.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip"
				}, {
					"title": "A&F成都IFS店即将闭店，新店搬去太古里。",
					"name": "成都城CDC",
					"cover": "https://sns-webpic-qc.xhscdn.com/202405280915/be69bae689a65afddb03941844487ea1/1040g2sg312p03mdh1m705ob1814gkndtfucl67g!nc_n_webp_mw_1",
					"avatar": "https://sns-avatar-qc.xhscdn.com/avatar/6191ac1f398ce2a38624d5db.jpg?imageView2/2/w/60/format/webp|imageMogr2/strip"
				}],
				styleData: {
					backgroundColor: '#e7e7e7'
				}
			};
		},
		methods: {
			clickItem(item) {
				console.log('子元素点击事件', item);
			},
			scrolltolower() {
				console.log('模拟接口分页拉取数据-----到底了！');
				const result = [];
				const numToPick = 4;
				while(result.length < numToPick){
				    const randomIndex = Math.floor(Math.random() * this.dataArr.length);
				    const randomObject = this.dataArr[randomIndex];
				    
				    if(!result.includes(randomObject)){
				        result.push(randomObject);
				    }
				}
				setTimeout(()=>{
					this.dataArr.push(...result)
					result.length=0
				},1500)
				
			}
		}
	}
</script>

<style lang="scss">
	.card {
		background-color: white;
		margin-bottom: 20rpx;
		overflow: hidden;
		border-radius: 20rpx;
	}

	.cover-cl-box {
		width: 100%;
		max-height: 500rpx;
		overflow: hidden;
		border-radius: 20rpx;
	}

	.cover-cl {
		width: 100%;
		border-radius: 20rpx;
		display: block;
	}

	.txt-box {
		width: 100%;
		padding: 10%;
		padding-bottom: 5%;
		color: #333;
		box-sizing: border-box;

		.txt-h {
			font-size: smaller;
			line-height: 150%;
			margin-bottom: 16rpx;
		}

		.txt-name {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.name {
				display: flex;
				align-items: center;
				flex-shrink: 0;
				flex-grow: 0;

				.avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					margin-right: 8%;
					flex-shrink: 0;
				}

				.name-n {
					// width: 150rpx;
					font-size: smaller;
					color: #333333CC;
					overflow: hidden; //超出隐藏
					text-overflow: ellipsis; //文本超出时显示省略号
					white-space: nowrap; //设置文本不换行
				}
			}

			.dz {
				width: 20%;
				color: #333333cc;
				font-size: smaller;
				flex-shrink: 0;
				flex-grow: 0;
			}
		}
	}

	.food-cl {
		width: 100%;
		text-align: center;
		color: #dbdbdb;
		padding: 15rpx 0 30rpx 0;
	}
</style>
```

