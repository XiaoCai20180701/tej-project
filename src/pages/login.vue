<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem prop="user">
      <i-input type="text" v-model="formInline.user" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input type="password" v-model="formInline.password" placeholder="密码">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </i-input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
    </FormItem>
  </Form>
</template>

<script>
  import { getLogin } from '@/api/api.js'
  import { mapState,mapMutations } from 'vuex'
  export default {
    name: 'login',
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码.', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码不能超过6位数', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapState(['menuList'])
    },
    methods: {
      ...mapMutations(['getMenuListData']),
      handleSubmit (name) {
        let _this = this
        this.$refs[name].validate((valid) => {
          if (valid) {
            //登录验证成功，跳转页面
            this.$store.dispatch('getMenuListData',{username:this.formInline.user,password:this.formInline.password})
              .then(() => {
                _this.$router.push('/hello')
              })
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .txt {
    margin-top: 50px;
    font-size: 46px;
  }
</style>
