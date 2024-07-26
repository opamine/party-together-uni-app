### iconfont 图标引入注意事项

1. iconfont 文件存放目录为 /static/iconfont，从 iconfont 下载的文件其中 *.css 和 *.ttf 拷贝移动到此目录。

iconfont.css 的首行代码需要修改这样：

@font-face {
  font-family: "iconfont"; /* Project id 4226906 */
  src: url('iconfont.ttf?t=1715435228064') format('truetype');
}

2. 在 App.vue 文件中引入 iconfont.css，引入方式为：@import './static/iconfont/iconfont.css';

3. iconfont 使用方式为：`<uni-icons custom-prefix="iconfont" type="icon-yuyuejilu" size="20" color="#ffffff" />`

### 调用腾讯地图逆地址解析 API 和 搜索地点 注意事项

H5 中使用 https://apis.map.qq.com/ws/geocoder/v1 接口进行逆地址解析

微信小程序中使用 qqmap-wx-jssdk 中的 reverseGeocoder 进行逆地址解析，注意：需要再腾讯地图后台授权小程序 APP ID，需要在微信公众平台配置 request 白名单 https://apis.map.qq.com

具体文档请见 https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview