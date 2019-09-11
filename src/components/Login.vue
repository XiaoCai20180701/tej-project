<template>
  <!--<div id="tej-login">-->
  <div class="tej-login">

    <Area />
    <div class="tej-login-bigbtngroup" v-if="!isLoginForm">
      <a class="btn" @click="vendorClick">厂家管理</a>
      <a class="btn" @click="platformClick">平台管理</a>
    </div>

    <div class="tej-login-form" v-if="isLoginForm">
      <img src="../assets/login-img.png"/>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
        <div class="return-icon" @click="returnClick"><Icon custom="iconfont icon-fanhui" size="24" /></div>
        <h3 class="tej-login-title">童 E 家 {{getTitle}}</h3>
        <FormItem prop="user" label="账号">
          <Input type="text" v-model="formInline.user" placeholder="请输入手机号"/>
        </FormItem>
        <FormItem prop="password" label="密码">
          <Input type="password" v-model="formInline.password" placeholder="请输入不少于6位的密码"/>
        </FormItem>
        <FormItem>
          <span @click="forgetModal = true">忘记密码?</span>
          <Modal v-model="forgetModal"
                 title="重置密码"
                 class="tej-modfiy-modal"
                 @on-ok="forgetOkFun"
          >
            <ForgetPassword></ForgetPassword>
          </Modal>
        </FormItem>
        <FormItem class="tej-login-btn">
          <Button type="primary" @click="submit" :loading="loading">登录</Button>
        </FormItem>
      </Form>
    </div>

  </div>
</template>

<script>
  import {login, vendorLogin} from '@/api/api'
  import {menusToRoutes} from '@/utils/index'
  import {userType} from '@/api/tableData'
  import ForgetPassword from './ForgetPassword'
  import Area from '@/components/area'

  export default {
    name: 'login',
    components: {
      ForgetPassword,
      Area
    },
    data() {
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (value !== '') {
            var reg = /^1[3456789]\d{9}$/;
            if (!reg.test(value)) {
              callback(new Error('请输入有效手机号码'));
            }
          }
          callback();
        }
      }
      return {
        type: userType.platform,
        isLoginForm: false,
        loading: false,
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, validator: validatePhone, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码.', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'change'}
          ]
        },
        forgetModal: false
      }
    },
    created() {
    },
    computed:{
      getTitle(){
        return this.type ==  userType.platform ? '':'厂 家 后 台'
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted() {
      console.log('mmmmmmmmmmmm')
    },
    methods: {
      forgetOkFun(){

      },
      returnClick(){
        this.isLoginForm = false
      },
      vendorClick() {
        this.isLoginForm = true
        this.type = userType.vendor
      },
      platformClick() {
        //TODO 可增加动画效果
        this.isLoginForm = true
        this.type = userType.platform
      },
      submit() {
        this.loading = true
        let username = this.formInline.user
        let password = this.$md5(this.formInline.password)
        this.type == userType.platform ? this.platformSubmit(username,password) : this.vendorSubmit(username,password)
      },
      platformSubmit(username,password){
        console.log('平台登录')
        login({
          userName: username,
          passWord: password,
          userType: this.type
        }).then(res => {
          this.loading = false
          let data = res.data
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            return
          }
          // 登陆成功 设置用户信息
          sessionStorage.setItem('userImg', this.$IMG_URL + data.avatar)
          sessionStorage.setItem('userName', data.userName)
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('userId', data.userId)
          sessionStorage.setItem('roleId', data.roleId)
          sessionStorage.setItem('userType', data.userType)
          this.$store.dispatch('getRole',data.roleId)
          //this.$store.dispatch('getUserType',data.getUserType)
          //获取菜单
          this.$store.dispatch('getAnyscMenu', this.$store.state.role)
          console.log('luyou', this.$route)
        //  this.addRouterFun()
          this.$router.push({path: '/ProductManagementPage'})
          this.$Message.success("登录成功")
        }).catch(err => {
          this.loading = false
          this.$Message.info("登录失败" + err)
        })
      },
      vendorSubmit(username,password) {
        console.log('厂家登录')
        vendorLogin({
          userName: username,
          passWord: password,
          userType: this.type
        }).then(res => {
          this.loading = false
          let data = res.data
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            return
          }
          // 登陆成功 设置用户信息
          sessionStorage.setItem('userName', data.userName)
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('vendorId', data.vendorId)
          sessionStorage.setItem('userType', data.userType)
         // this.$store.dispatch('getUserType',data.userType)
          //获取菜单
          this.$store.dispatch('getAnyscMenu', 0) //厂家登录，roleId传0
          this.$router.push({path: '/CheckedVendorDetailPage/'+ data.vendorId})
          //  this.addRouterFun()
          this.$Message.success("登录成功")
        }).catch(err => {
          this.loading = false
          this.$Message.info("登录失败" + err)
        })
      },
      addRouterFun() {
        const r = sessionStorage.getItem('menuItems')
        const routes = menusToRoutes(r)
        // 动态添加路由
        console.log('yu2')
        this.$router.addRoutes(routes)
      }
    }
  }
</script>

<style>
  /*#tej-login{*/
  /*position: relative;*/
  /*height: 100vh;*/
  /*width: 80%;*/
  /*margin: 0 auto;*/
  /*}*/
  .tej-login {
    width: 100%;
    height: 100vh;
    background: url('../assets/login-bg.png') no-repeat center center #F0F2F5;
    background-size: contain;
  }

  /*.tej-login:before {*/
  /*position: absolute;*/
  /*left: 248px;*/
  /*bottom: 170px;*/
  /*display: block;*/
  /*content: '';*/
  /*width: 360px;*/
  /*height: 360px;*/
  /*background: linear-gradient(45deg, #ffb108 70%, #ff7903);*/
  /*border-radius: 50%;*/
  /*}*/

  /*.tej-login:after {*/
  /*z-index: -1;*/
  /*position: absolute;*/
  /*top: 116px;*/
  /*right: 200px;*/
  /*display: block;*/
  /*content: '';*/
  /*width: 290px;*/
  /*height: 290px;*/
  /*background: linear-gradient(120deg, #05dbfc 35%, #02b5f7);*/
  /*border-radius: 10px;*/
  /*transform: rotate(45deg);*/
  /*}*/

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
    position: relative;
    flex-grow: 1;
    background: #fff;
    padding: 100px 50px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .return-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 24px;
    height: 24px;
    cursor: pointer;
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

  .tej-login-bigbtngroup {
    /*display: flex;*/
  }

  .tej-login-bigbtngroup .btn {
    position: absolute;
    width: 15.5rem;
    height: 64px;
    background: #fff;
    border-radius: 8px;
    -webkit-box-shadow: 0 32px 32px rgba(0, 0, 0, 0.3);
    box-shadow: 0 32px 32px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 1.5rem;
    line-height: 64px;
  }

  .tej-login-bigbtngroup .btn:first-child {
    top: 45%;
    left: 35%;
    color: #FCB637;
  }

  .tej-login-bigbtngroup .btn:last-child {
    top: 45%;
    right: 35%;
    color: #33CCF9;
  }
</style>


