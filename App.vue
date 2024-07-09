<script>
  import vconsole from 'vconsole';

  export default {
    globalData: {
      statusBarHeight: 0, // 手机状态栏高度
      navigationBarHeight: 0, // 微信小程序导航栏高度，如果没有导航栏，高度为 0
      navHeight: 0, // 状态栏 + 导航栏 高度
      rightSafeArea: 0, // 右侧安全区（微信小程序胶囊和右边距）
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
    },
    onLaunch: function (e) {
      const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
      const windowWidth = uni.getSystemInfoSync().windowWidth;
      // 获取手机状态栏高度
      this.globalData.statusBarHeight = statusBarHeight;

      // #ifdef MP-WEIXIN
      // 微信小程序导航栏高度
      const custom = wx.getMenuButtonBoundingClientRect();
      this.globalData.navigationBarHeight = custom.height + (custom.top - statusBarHeight) * 2;
      this.globalData.rightSafeArea = windowWidth - custom.left;
      // #endif

      // 状态栏 + 导航栏 高度
      this.globalData.navHeight =
        this.globalData.statusBarHeight + this.globalData.navigationBarHeight;

      // #ifdef H5
      if (e.query.debug) {
        if (e.query.debug == 1 && !this.$vconsole) {
          this.$vconsole = new vconsole();
        }
      }
      // #endif
      console.log('App Launch');
    },
    onShow: function () {
      console.log('App Show');
    },
    onHide: function () {
      console.log('App Hide');
    },
  };
</script>

<style lang="scss">
  /* 引入 iconfont 字体 */
  @import './static/iconfont/iconfont.css';
  /* 每个页面公共 css  */
  @import './style/index.scss';
  /* 修改覆盖 uni-componnets 样式 */
  @import './style/uni-components.scss';
  /* uview UI */
  @import './uni_modules/vk-uview-ui/index.scss';
  page {
    background-color: #f8f8f8;
  }
</style>
