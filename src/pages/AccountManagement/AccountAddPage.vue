<template>
  <Row :gutter="18">
    <Col :xs="24" :sm="24" :md="5" :lg="5">
    <!--<BaseInfo :info="baseInfo"></BaseInfo>-->
    <AccountAdd @add-callback="addCallback"></AccountAdd>
    </Col>
    <Col :xs="24" :sm="24" :md="19" :lg="19">
    <AccountSetting :role-list="roleList"
                    :menu-items="menuItems"
                    @role-change="roleChange"
                    @setting-callback="accountSettingCallback"
                    :role-id="this.$store.state.role"
    >
      <div slot="add-role" class="tej-addrole-btngroup">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="saveAccountSetting">确定</Button>
      </div>
    </AccountSetting>
    </Col>
  </Row>
</template>

<script>
  import AccountAdd from './components/AccountAdd'
  import AccountSetting from './components/AccountSetting'
  import { postUserDetail, postRolePermissions, postAddUser } from '@/api/api'

  export default {
    name: 'AccountAddPage',
    components: {
      AccountAdd,
      AccountSetting
    },
    data() {
      return {
        roleId: 1,
        baseInfo: {},
        roleList: [],
        menuItems: [],
        addParams: {},
      }
    },
    mounted(){
      this.getDetail()
    },
    methods: {
      addCallback(data){
        console.log('基本信息填写 回调',data)
        this.addParams = data
      },
      saveAccountSetting(){
        console.log('基本信息 params',this.addParams)
        let params = {
          ...this.addParams,
          roleId: this.$store.state.roleId
        }
        postAddUser(params).then(res => {
          this.$Message.success('新增用户成功')
          this.$router.push({
            name: 'AccountManagementPage'
          })
        }).catch(err => {
          this.$Message.error({
            content: `新增用户失败<br/>` + err
          })
        })
      },
      cancel(){
        this.$router.push({
          name: 'AccountManagementPage'
        })
      },
      roleChange(data){
        console.log('role 回调',data)
        this.getRolePermissions(data)
      },
      getRolePermissions(roleId){
        postRolePermissions({
          roleId: roleId
        }).then(res => {
          let data = res.data
          this.menuItems = data.menuItems
        }).catch(err => {
          this.$Message.error({
            content: '获取角色权限失败' + err
          })
        })
      },
      getDetail(){
        postUserDetail({
          userId: this.$route.query.userId
        }).then(res => {
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
.tej-addrole-btngroup {
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -58px;
}
</style>

