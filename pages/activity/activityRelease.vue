<template>
  <view class="activity-release-container">
    <view class="base-form-container">
      <u-form :model="form" ref="form1" :errorType="['toast']">
        <u-form-item label="" prop="title">
          <u-input v-model="form.title" placeholder="活动标题" maxlength="20" />
          <template v-slot:right>{{ (form.title && form.title.length) || 0 }}/20</template>
        </u-form-item>
        <u-form-item label="" prop="content">
          <u-input
            v-model="form.content"
            type="textarea"
            placeholder="描述一下活动内容吧"
            height="250"
            maxlength="8000"
          />
          <view style="color: #ccc; text-align: right"
            >{{ (form.content && form.content.length) || 0 }}/{{ 8000 }}</view
          >
        </u-form-item>
        <u-form-item label="">
          <u-upload
            ref="uUpload"
            action="https://ramses.cn/api/upload/file"
            :header="{
              Authorization:
                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjU2YjNhMzg1YjY1MjI3ZjBiYmFlODcwIiwiaWF0IjoxNzIxMzc0NjA1LCJleHAiOjE3MjE2MzM4MDV9.O6g4ZqUKVA_ig00lIXtXfeBHeXCqa66NT8XzKV3bRkypOPX9FGm-UqZPGtxUoWo9zVK64Z2dPrDyK-6DNkMrRt1JGOoY1b60jtrAvLt7c7eXSbC6TZbvVHZ36xSEm9o21l9DytSv4eKvGehmiGyM1JHyRiHj70Mqez9qZE2ksLP7b3SHqzbrFNI00yqY3QwwDeHz8D5rDPR5ko4NF1Inm5OE4Mq27gDeSmaKm5zVc0jCROvr-2BOY_8fRz3iolBiv1g6gXbn5newGWoPZufRx_QGwZlFUavt0gvqLmnJdATw8bOBR-9BmWBoB82BylUL5bGqzGbv89RvhWLOwwq83g',
            }"
            :auto-upload="false"
            :max-size="30 * 1024 * 1024"
            :max-count="3"
            @on-success="uploadSuccess"
            @on-error="uploadError"
            @on-uploaded="uploadAllSuccess"
          ></u-upload>
        </u-form-item>
      </u-form>
    </view>
    <view class="cycle-form-container"></view>
    <button @click="submit">提交</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          content: '',
        },
        rules: {
          title: [{ required: true, message: '请输入活动标题', trigger: ['change', 'blur'] }],
          content: [{ required: true, message: '请输入活动内容', trigger: ['change', 'blur'] }],
        },
      };
    },
    onReady() {
      this.$refs.form1.setRules(this.rules);
    },
    methods: {
      uploadSuccess(data) {
        console.log(data);
      },
      uploadError(res) {
        console.log(res);
      },
      uploadAllSuccess(lists) {
        console.log(lists);
      },
      submit() {
        const re = this.$refs.uUpload.upload();
        console.log(re);
        this.$refs.form1.validate((valid) => {
          console.log(valid);
          if (valid) {
            uni.showToast({
              icon: 'none',
              title: '表单验证通过',
            });
          }
        });
      },
    },
  };
</script>
<style lang="less" scoped>
  .activity-release-container {
    padding: 16rpx;
    .base-form-container {
      padding: 16rpx;
      background-color: #fff;
      border-radius: 4px;
    }
  }
</style>
