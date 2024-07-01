<script>
  import vconsole from 'vconsole';

  export default {
    onLaunch: function (e) {
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
  page {
    height: 100%;
    background-color: #f8f8f8;
  }
</style>
