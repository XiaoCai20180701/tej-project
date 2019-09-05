<template>
  <Row :gutter="18" v-if="show">
    <i-col :xs="24" :sm="24" :md="5" :lg="5">
      <BaseInfo :info="baseInfo"></BaseInfo>
    </i-col>
    <i-col :xs="24" :sm="24" :md="19" :lg="19">
      <AccountSetting :role-list="roleList"
                      :menu-items="menuItems"
                      :role-id="baseInfo.roleId"
                      :is-detail="isDetail"
                      :is-center="isCenter"
      ></AccountSetting>
    </i-col>
  </Row>
  <Row class="tej-center-page" v-else>
    <i-col span="8" offset="7">
      <ForgetPassword @forgot-password-callback="forgotPasswordCallback"></ForgetPassword>
      <div class="btn">
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </i-col>
  </Row>
</template>

<script>
  import BaseInfo from './components/BaseInfo'
  import AccountSetting from './components/AccountSetting'
  import {postUserDetail, postRolePermissions, putModifyPassword} from '@/api/api'
  import { userType } from '@/api/tableData'
  import ForgetPassword from '@/components/ForgetPassword'

  export default {
    name: 'AccountCenterPage',
    components: {
      BaseInfo,
      AccountSetting,
      ForgetPassword
    },
    data() {
      return {
        baseInfo: {},
        roleList: [],
        menuItems: [],
        isDetail: true,
        isCenter: false,
        forgotPasswordInfo: {}
      }
    },
    computed:{
      show(){
        return localStorage.getItem('userType') == userType.platform ? true : false
      }
    },
    mounted() {
      console.log('route!!!', this.$route.name)
      this.isCenterPage()
      this.getDetail()
    },
    methods: {
      forgotPasswordCallback(data){
        this.forgotPasswordInfo = data
      },
      ok(){
        this.editPassword()
      },
      editPassword(){
        let params = {
          userId: localStorage.getItem('userId'),
          userType: localStorage.getItem('userType'),
          ...this.forgotPasswordInfo
        }
        putModifyPassword(params).then(()=> {
          this.$Message.success('修改密码成功')
        }).catch(err => {
          this.$Message.error('修改密码失败' + err)
        })
      },
      isCenterPage() {
        if (this.$route.name == 'AccountCenterPage') {
          this.isCenter = true
        }
      },
      getDetail() {
        postUserDetail({
          userId: this.$route.params.userId
        }).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.baseInfo = data.userInfo
          this.roleList = data.roleList
          this.menuItems = data.menuItems
        }).catch(err => {
          this.$Message.error({
            content: '获取账户详情失败' + err
          })
        })
      }
    }
  }
</script>

<style scoped>
.tej-center-page {
  padding: 20px;
  background: #fff;
}

.tej-center-page .btn {
  text-align: center;
}
</style>
