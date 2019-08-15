<template>
  <Row :gutter="18">
    <Col :xs="24" :sm="24" :md="5" :lg="5">
    <BaseInfo :info="baseInfo"></BaseInfo>
    </Col>
    <Col :xs="24" :sm="24" :md="19" :lg="19">
    <AccountSetting :role-list="roleList"
                    :menu-items="menuItems"
                    :role-id="baseInfo.roleId"
                    :is-detail = "isDetail"
                    :is-center = "isCenter"
    ></AccountSetting>
    </Col>
  </Row>
</template>

<script>
  import BaseInfo from './components/BaseInfo'
  import AccountSetting from './components/AccountSetting'
  import { postUserDetail, postRolePermissions } from '@/api/api'

  export default {
    name: 'AccountDetailPage',
    components: {
      BaseInfo,
      AccountSetting
    },
    data() {
      return {
        baseInfo: {},
        roleList: [],
        menuItems: [],
        isDetail: true,
        isCenter: false
      }
    },
    mounted(){
      console.log('route!!!',this.$route.name)
      this.isCenterPage()
      this.getDetail()
    },
    methods: {
      isCenterPage(){
        if(this.$route.name == 'AccountCenterPage'){
          this.isCenter = true
        }
      },
      getDetail(){
        postUserDetail({
          userId: this.$route.params.userId
        }).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
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

</style>
