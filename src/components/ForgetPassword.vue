<template>
  <Form ref="forgotPwdForm" :model="forgotPwdForm" :rules="forgotPwdFormRules" label-position="right"
        :label-width="75">

    <FormItem label="手机号码:" prop="phone">
      <Input v-model="forgotPwdForm.phone" placeholder="请输入手机号码" @on-change="phoneChange"/>
    </FormItem>
    <FormItem label="验证码:" prop="code" inline>
      <Row>
        <i-col span="16">
          <Input v-model="forgotPwdForm.code" placeholder="请输入验证码" @on-change="codeChange"/>
        </i-col>
        <i-col span="3" offset="1">
          <Button type="primary" @click="handleCode">验证码</Button>
        </i-col>
      </Row>
    </FormItem>
    <FormItem label="新密码:" prop="passWord">
      <Input type="password" v-model="forgotPwdForm.passWord" placeholder="请输入新密码" @on-change="passWordChange"/>
    </FormItem>
    <FormItem label="再输一次" prop="passwdCheck">
      <Input type="password" v-model="forgotPwdForm.passwdCheck" placeholder="请再输一次"/>
    </FormItem>
  </Form>
</template>

<script>
  import { postCode } from  '@/api/api'
  export default {
    name: 'ForgetPassword',
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
      const validatecode = (rule, value, callback) => {
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
          code: '',
          passWord: '',
          passwdCheck: ''
        },
        forgotPwdFormRules: {
          phone: [{
            validator: validatePhone,
            trigger: 'blur'
          }],
          code: [{
            validator: validatecode,
            trigger: 'blur'
          }],
          passWord: [{
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
      callback(){
        this.$emit('forgot-password-callback',{
          phone: this.forgotPwdForm.phone,
          code: this.forgotPwdForm.code,
          passWord: this.forgotPwdForm.passWord
        })
      },
      passWordChange(e){
        this.forgotPwdForm. passWord = e.target.value
        this.callback()
      },
      codeChange(e){
        this.forgotPwdForm.code = e.target.value
        this.callback()
      },
      phoneChange(e){
        this.forgotPwdForm.phone = e.target.value
        this.callback()
      },
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
