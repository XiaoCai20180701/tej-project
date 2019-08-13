<template>
  <div class="tej-account-baseinfo">
    <div class="avatar"
         style="background-image: url('http://b-ssl.duitang.com/uploads/item/201801/04/20180104151926_TH2xE.jpeg')"></div>
    <h2 class="title">{{info.userName}}</h2>
    <div class="content">
      <p class="item">
        <span class="label">账户编号：</span>
        <span>{{info.userId}}</span>
      </p>
      <p class="item"><span class="label">姓名：</span><span>{{info.userName}}</span></p>
      <p class="item"><span class="label">角色：</span><span>{{info.roleName}}</span></p>
      <p class="item"><span class="label">联系号码：</span><span>{{info.mobile}}</span></p>
      <p class="item"><span class="label">备注：</span><span>{{info.message}}</span></p>
    </div>
    <div class="btn" v-if="isShow">
      <Button type="primary" @click="changePasswordModal = true">密码修改</Button>
      <Modal v-model="changePasswordModal" :closable="false" class="tej-modfiy-modal"
             @on-ok="handleSubmit('changePwdForm')"
             @on-cancel="handleReset('changePwdForm')"
              :loading="loading"
      >
        <Form ref="changePwdForm"
              :model="changePwdForm"
              :rules="changePwdFormRules"
              label-position="right"
              :label-width="75"
              class="tej-change-password-form"
        >
          <FormItem label="账户编号:">
            <span>{{info.userId}}</span>
          </FormItem>
          <FormItem label="手机号码:">
            <span>{{info.mobile}}</span>
          </FormItem>

          <FormItem label="原密码:" prop="originalPasswd">
            <Input v-model="changePwdForm.originalPasswd" placeholder="请输入原密码"></Input>
          </FormItem>
          <FormItem label="新密码:" prop="passwd">
            <Input type="password" v-model="changePwdForm.passwd" placeholder="请输入新密码"></Input>
          </FormItem>
          <FormItem label="再输一次" prop="passwdCheck">
            <Input type="password" v-model="changePwdForm.passwdCheck" placeholder="请再输一次"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import { putModifyPassword } from '@/api/api'
  export default {
    name: 'AccountBaseInfo',
    props: {
      info: {
        type: Object
      }
    },
    data() {
      const validateOriginalPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'))
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value == this.changePwdForm.originalPasswd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          if (this.changePwdForm.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.changePwdForm.validateField('passwdCheck')
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入你的密码'))
        } else if (value !== this.changePwdForm.passwd) {
          callback(new Error('两次密码输入不同!'))
        } else {
          callback()
        }
      }
      return {
        isShow: false,
        loading: true,
        userNum: null,
        changePasswordModal: false,
        changePwdForm: {
          originalPasswd: '',
          passwd: '',
          passwdCheck: ''
        },
        changePwdFormRules: {
          originalPasswd: [{
            validator: validateOriginalPass,
            trigger: 'blur'
          }],
          passwd: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          passwdCheck: [{
            validator: validatePassCheck,
            trigger: 'blur'
          }]
        }
      }
    },
    watch: {
      info:{
        handler: function (newval, oldVal) {
          console.log(newval)
          this.userNum = newval.userId
          this.isShow = newval.userId === localStorage.getItem('userId') ? true : false
        },
        deep: true
      }
    },
    methods: {
      asyncOK () {
        this.changePwdForm = {
          originalPasswd: '',
          passwd: '',
          passwdCheck: ''
        }
        setTimeout(() => {
          this.loading = false
          this.changePasswordModal = false
        }, 2000)
      },
      handleSubmit(name) {
        console.log('55555522255')
        this.modifyPassword()
//        this.asyncOK()
//        this.$refs[name].validate((valid) => {
//          if (valid) {
//            this.modifyPassword()
//           // this.asyncOK()
//          } else {
//            this.loading = false
//            this.changePasswordModal = true
//          }
//        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      modifyPassword(){
        console.log('55555555555')
        let params = {
          userId: this.userNum,
          passWord: this.$md5(this.changePwdForm.passwd),
        }
        this.loading = true
        putModifyPassword(params).then(res => {
          this.loading = false
          this.$Message.success('修改成功!')
          this.changePasswordModal = false
        }).catch(err => {
          this.$Message.error({
            content: '密码修改失败' + err
          })
        })
      }
    }
  }
</script>

<style>
  .tej-account-baseinfo {
    padding: 12px 12px 60px;
    background: #fff;
  }

  .tej-account-baseinfo .avatar {
    width: 250px;
    height: 250px;
    margin: 12px auto;
    background-size: cover;
  }

  .tej-account-baseinfo .title {
    margin: 25px 0 29px;
    text-align: center;
  }

  .tej-account-baseinfo .content {
    width: 200px;
    margin: 0 auto;
  }

  .tej-account-baseinfo .item {
    margin: 10px 0;
    font-size: 14px;
  }

  .tej-account-baseinfo .item:last-child {
    padding: 20px 0;
    margin: 30px 0;
    border-top: 1px dashed #a9a9a9;
  }

  .tej-account-baseinfo .label {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
    text-align: right;
  }

  .tej-account-baseinfo .address {
    float: left;
    margin-left: 90px;
    margin-top: -21px;
  }

  .tej-account-baseinfo .btn {
    text-align: center;
  }

  .tej-modfiy-modal .ivu-modal-footer {
    text-align: center;
    border-top: none;
    padding: 0px 18px 24px 18px;
  }

  .tej-modfiy-modal .ivu-modal-footer .ivu-btn-text {
    border-color: #f0f0f0;
  }

  .tej-modfiy-modal .ivu-modal-footer .ivu-btn-large {
    padding: 6px 10px 6px 20px;
  }

  .tej-modfiy-modal .ivu-modal-footer button + button {
    margin-left: 40px;

  }

  .tej-modfiy-modal .ivu-modal-footer .ivu-btn > span {
    letter-spacing: 8px;
  }

  .tej-change-password-form {
    width: 70%;
    margin: 15px auto;
  }
  .tej-change-password-form .ivu-form-item:nth-child(1), .tej-change-password-form .ivu-form-item:nth-child(2) {
    margin-bottom: 12px;
  }
</style>

