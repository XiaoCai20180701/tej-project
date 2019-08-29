<template>
  <Form ref="forgotPwdForm" :model="forgotPwdForm" :rules="forgotPwdFormRules" label-position="right"
        :label-width="75">

    <FormItem label="手机号码:" prop="phone">
      <Input v-model="forgotPwdForm.phone" placeholder="请输入手机号码"/>
    </FormItem>
    <FormItem label="验证码:" prop="phoneCode" inline>
      <Row>
        <i-col span="16">
          <Input v-model="forgotPwdForm.phoneCode" placeholder="请输入验证码"/>
        </i-col>
        <i-col span="3" offset="1">
          <Button type="primary" @click="handleCode">验证码</Button>
        </i-col>
      </Row>
    </FormItem>
    <FormItem label="新密码:" prop="passwd">
      <Input type="password" v-model="forgotPwdForm.passwd" placeholder="请输入新密码"/>
    </FormItem>
    <FormItem label="再输一次" prop="passwdCheck">
      <Input type="password" v-model="forgotPwdForm.passwdCheck" placeholder="请再输一次"/>
    </FormItem>
  </Form>
</template>

<script>
  import { postCode } from  '@/api/api'
  export default {
    name: 'ForgetPasswordModal',
    data() {
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (value !== '') {
            var reg = /^1[3456789]\d{9}$/;
            if (!reg.test(value)) {
              callback(new Error('请输入有效的手机号码'));
            }
          }
          callback();
        }
      };
      const validatePhoneCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (value.length !== 6) {
          callback(new Error('请输入正确验证码'));
        } else {
          callback();
        }
      };
      const validateForgotPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.forgotPwdForm.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.forgotPwdForm.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validateForgotPassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入你的密码'));
        } else if (value !== this.forgotPwdForm.passwd) {
          callback(new Error('两次密码输入不同!'));
        } else {
          callback();
        }
      };
      return {
        forgotPasswordModal: false,
        forgotPwdForm: {
          phone: '',
          phoneCode: '',
          passwd: '',
          passwdCheck: ''
        },
        forgotPwdFormRules: {
          phone: [{
            validator: validatePhone,
            trigger: 'blur'
          }],
          phoneCode: [{
            validator: validatePhoneCode,
            trigger: 'blur'
          }],
          passwd: [{
            validator: validateForgotPass,
            trigger: 'blur'
          }],
          passwdCheck: [{
            validator: validateForgotPassCheck,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      handleCode() {
        postCode({
          mobile: this.forgotPwdForm.phone
        }).then(res => {
          console.log('验证码',res)
        }).catch(err => {
          this.$Message.error('获取验证码失败'+ err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
