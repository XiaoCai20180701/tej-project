<template>
  <div id="tej-login">
    <div class="tej-login">
      <div class="tej-login-form">
        <img src="../assets/login-img.png"/>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
          <h3 class="tej-login-title">童 E 家</h3>
          <FormItem prop="user" label="账号">
            <Input type="text" v-model="formInline.user" placeholder="请输入手机号">
            </Input>
          </FormItem>
          <FormItem prop="password" label="密码">
            <Input type="password" v-model="formInline.password" placeholder="请输入不少于6位的密码">
            </Input>
          </FormItem>
          <FormItem class="tej-login-btn">
            <Button type="primary" @click="submit" :loading="loading">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from '@/api/api'

  export default {
    name: 'login',
    data() {
      return {
        loading: false,
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码.', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      submit() {
        this.loading = true
        let username = this.formInline.user
        let password = this.$md5(this.formInline.password)
        login({userName: username, passWord: password}).then(res => {
          this.loading = false
          let data = res.data
          // 登陆成功 设置用户信息
          localStorage.setItem('userImg', data.avatar)
          localStorage.setItem('userName', data.userName)
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.userId)
          this.$store.dispatch('getRole',data.roleId)
          this.$store.dispatch('getAnyscMenu',this.$store.state.role)
          this.$router.push({path: this.redirect || '/ProductManagementPage'})
          this.$Message.success("登录成功")
        }).catch(err => {
          this.loading = false
          this.$Message.info("登录失败", err)
        })
      }
    }
  }
</script>

<style>
  #tej-login{
    position: relative;
    height: 100vh;
    width: 80%;
    margin: 0 auto;
  }
  .tej-login {
    height: 100vh;
  }

  .tej-login:before {
    position: absolute;
    left: 248px;
    bottom: 170px;
    display: block;
    content: '';
    width: 360px;
    height: 360px;
    background: linear-gradient(45deg, #ffb108 70%, #ff7903);
    border-radius: 50%;
  }

  .tej-login:after {
    z-index: -1;
    position: absolute;
    top: 116px;
    right: 200px;
    display: block;
    content: '';
    width: 290px;
    height: 290px;
    background: linear-gradient(120deg, #05dbfc 35%, #02b5f7);
    border-radius: 10px;
    transform: rotate(45deg);
  }

  .tej-login .tej-login-form {
    display: flex;
    position: relative;
    top: 20%;
    left: 50%;
    width: 632px;
    height: 415px;
    margin-left: -316px;
    filter: drop-shadow(0px 25.6px 10px rgba(0, 0, 0, 0.24));
  }

  .tej-login .tej-login-form img {
    max-width: 256px;
  }

  .tej-login .tej-login-form form {
    flex-grow: 1;
    background: #fff;
    padding: 100px 50px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .tej-login-title {
    margin-bottom: 30px;
    text-align: center;
    color: #de6e7c;
    font-weight: normal;
    font-size: 24px;
  }

  .tej-login-btn {
    text-align: center;
  }

  .tej-login-btn .ivu-form-item-content {
    margin-left: 0 !important;
  }
</style>


