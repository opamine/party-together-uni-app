### iconfont 图标引入注意事项

1. iconfont 文件存放目录为 /static/iconfont，从 iconfont 下载的文件其中 *.css 和 *.ttf 拷贝移动到此目录。

iconfont.css 的首行代码需要修改这样：

@font-face {
  font-family: "iconfont"; /* Project id 4226906 */
  src: url('iconfont.ttf?t=1715435228064') format('truetype');
}

2. 在 App.vue 文件中引入 iconfont.css，引入方式为：@import './static/iconfont/iconfont.css';

3. iconfont 使用方式为：<uni-icons custom-prefix="iconfont" type="icon-yuyuejilu" size="20" color="#ffffff" />

### 调用腾讯地图地址搜索注意事项

在文件 pages/common/location.vue 的第 202 行，在 h5 端存在跨域的情况，需要后端写一个地址搜索接口，来调用腾讯地图的 API.