<template>
  <view class="fans-container">
    <view class="input-container">
      <view class="icon-container">
        <uni-icons
          custom-prefix="iconfont"
          type="icon-fenxiang"
          size="16"
          color="#bbbbbb"
        ></uni-icons>
      </view>
      <input
        type="text"
        confirm-type="search"
        class="uni-input"
        placeholder="搜索好友(姓名)"
        placeholder-class="uni-input-placeholder"
      />
    </view>
    <view v-if="applicationData.length" class="patient-application">
      <view class="title">
        <view class="title-icon"></view>
        <view class="title-text">好友申请</view>
        <view class="title-tip">{{ applicationData.length }}个陌生人发来申请</view>
      </view>
      <view class="application-list-container">
        <view class="application-list">
          <view
            v-for="(item, index) in applicationData.slice(0, 3)"
            :key="index"
            class="application-list-item"
          >
            <view class="avatar-name">
              <view>
                <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
              </view>
              <view class="name">
                {{ item.name }}
              </view>
            </view>
            <view class="actions">
              <view class="add">添加</view>
              <view class="cancel"
                ><uni-icons custom-prefix="iconfont" type="icon-cuowuguanbiquxiao" size="12"
              /></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="groupListData.length" class="patient-group">
      <view class="title">
        <view class="title-icon"></view>
        <view class="title-text">好友分组</view>
        <view class="title-tip">
          <uni-icons
            custom-prefix="iconfont"
            type="icon-fenzu"
            size="14"
            color="#bbbbbb"
          ></uni-icons>
          <text style="margin-left: 6px">分组管理</text>
        </view>
      </view>
      <view class="group-list-container">
        <view class="group-list">
          <view class="group-list-item">
            <uni-collapse @change="collapseChange">
              <uni-collapse-item
                v-for="(group, index) in groupListData"
                :key="group.id"
                :open="Boolean(collapseExpandIndexArray.find((item) => item === `${index}`))"
                :show-arrow="false"
                :border="false"
                title-border="none"
              >
                <template #title>
                  <view class="collapse-item-title">
                    <view class="icon-container">
                      <uni-icons
                        custom-prefix="iconfont"
                        :type="
                          collapseExpandIndexArray.find((item) => item === `${index}`)
                            ? 'icon-xiajiantou'
                            : 'icon-shangjiantou'
                        "
                        size="12"
                        color="#888ca5"
                      />
                    </view>
                    <view class="group-name">{{ group.groupName }}</view>
                    <view class="group-patients-count"
                      >({{ patientsData.filter((item) => item.group === group.id).length }})</view
                    >
                  </view>
                </template>
                <view class="collapse-item-content">
                  <view class="patient-list">
                    <view
                      v-for="patient in patientsData.filter((item) => item.group === group.id)"
                      :key="patient.id"
                      class="patient-list-item"
                    >
                      <view class="patient-info">
                        <view class="avatar-container">
                          <image class="avatar" :src="patient.avatar" mode="aspectFill"></image>
                        </view>
                        <view class="name-remark">
                          <view class="name"
                            >{{ patient.name }}
                            <uni-icons
                              custom-prefix="iconfont"
                              :type="patient.gender === 'male' ? 'icon-male' : 'icon-female'"
                              size="14"
                              :color="patient.gender === 'male' ? 'blue' : 'pink'"
                          /></view>
                          <view class="remark">{{ patient.remark }}</view>
                        </view>
                      </view>
                      <view class="action">
                        <uni-icons
                          custom-prefix="iconfont"
                          type="icon-shoucangxuanzhong"
                          size="20"
                          color="#ffbe43"
                        />
                      </view>
                    </view>
                  </view>
                </view>
              </uni-collapse-item>
            </uni-collapse>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        applicationData: [
          {
            id: 0,
            avatar: 'https://avatars.githubusercontent.com/u/39261479?s=64&v=4',
            name: '李思思',
          },
          {
            id: 1,
            avatar: 'https://avatars.githubusercontent.com/u/11247099?s=64&v=4',
            name: '肖恩',
          },
          {
            id: 2,
            avatar: 'https://avatars.githubusercontent.com/u/10172199?s=96&v=4',
            name: 'Devikl',
          },
          {
            id: 3,
            avatar: 'https://avatars.githubusercontent.com/u/10172199?s=96&v=4',
            name: 'Devikl',
          },
        ],
        collapseExpandIndexArray: ['0', '1'],
        groupListData: [
          { id: 0, groupName: 'A组' },
          { id: 1, groupName: 'B组' },
        ],
        patientsData: [
          {
            id: 0,
            name: '张三',
            avatar: 'https://avatars.githubusercontent.com/u/10172199?s=96&v=4',
            gender: 'female',
            remark: '这里是备注这里是备注',
            group: 0,
          },
          {
            id: 1,
            name: '李四',
            avatar: 'https://avatars.githubusercontent.com/u/615401?v=4',
            gender: 'male',
            remark: '这里是备注这里是备注',
            group: 0,
          },
          {
            id: 2,
            name: '王五',
            avatar: 'https://avatars.githubusercontent.com/u/10216932?v=4',
            gender: 'male',
            remark: '这里是备注这里是备注',
            group: 1,
          },
          {
            id: 3,
            name: '周嘉善',
            avatar: 'https://avatars.githubusercontent.com/u/16557978?v=4',
            gender: 'male',
            remark: '这里是备注这里是备注',
            group: 1,
          },
          {
            id: 4,
            name: '赵文静',
            avatar: 'https://avatars.githubusercontent.com/u/90562015?s=64&v=4',
            gender: 'male',
            remark: '这里是备注这里是备注',
            group: 1,
          },
        ],
      };
    },
    methods: {
      collapseChange(expandIndexArr) {
        this.collapseExpandIndexArray = expandIndexArr;
      },
    },
  };
</script>
<style lang="scss">
  .fans-container {
    height: 100%;
    padding: 20px 16px;
    background: linear-gradient(#000000, #f8f8f8 50%);
    box-sizing: border-box;
    overflow: auto;
    .input-container {
      display: flex;
      padding: 6px;
      background-color: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 6px;
      .icon-container {
        margin-right: 4px;
      }
      .uni-input {
        flex: 1;
        font-size: 14px;
        .uni-input-placeholder {
          color: #bbbbbb;
        }
      }
    }
    .patient-application,
    .patient-group {
      margin-top: 16px;
      padding: 16px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3);
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding-left: 12px;
        .title-icon {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          display: block;
          width: 4px;
          height: 16px;
          background-color: #000000;
          border-radius: 4px;
        }
        .title-text {
          font-size: 16px;
          font-weight: 600;
          color: #000000E0;
        }
        .title-tip {
          font-size: 13px;
          color: #000000A6;
        }
      }
      .application-list-container {
        .application-list {
          .application-list-item {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;
            .avatar-name {
              display: flex;
              align-items: center;
              .avatar {
                height: 50px;
                width: 50px;
                margin-right: 12px;
                border-radius: 50%;
              }
              .name {
                color: #000000E0;
                font-size: 14px;
              }
            }
            .actions {
              display: flex;
              align-items: center;
              .add {
                height: 26px;
                padding: 0 20px;
                margin-right: 12px;
                border-radius: 26px;
                background-color: #000000;
                line-height: 26px;
                color: #fff;
                font-size: 14px;
              }
              .cancel {
                line-height: 26px;
              }
            }
          }
        }
      }
      .group-list-container {
        .group-list {
          .group-list-item {
            margin-top: 12px;
            .collapse-item-title {
              position: relative;
              display: flex;
              align-items: center;
              height: 30px;
              line-height: 30px;
              .group-name {
                margin-left: 10px;
                font-size: 15px;
              }
              .group-patients-count {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                color: #bbbbbb;
                font-size: 14px;
              }
            }
            .collapse-item-content {
              padding-left: 20px;
              .patient-list {
                .patient-list-item {
                  display: flex;
                  justify-content: space-between;
                  padding: 6px 0;
                  .patient-info {
                    display: flex;
                    align-items: center;
                    .avatar {
                      height: 50px;
                      width: 50px;
                      margin-right: 12px;
                      border-radius: 50%;
                    }
                    .name-remark {
                      .name {
                        font-size: 14px;
                      }
                      .remark {
                        margin-top: 4px;
                        color: #5e5e5e;
                        font-size: 12px;
                      }
                    }
                  }
                  .action {
                    display: flex;
                    align-items: center;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
