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
                    :role-id="this.$store.state.role"
                    :is-detail = "false"
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
  import { getRolelist, postRolePermissions, postAddUser } from '@/api/api'

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
      this.getRoleListFun()
      this.getRolePermissions(this.$store.state.role)
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
          roleId: this.roleId
        }
        postAddUser(params).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              this.$router.push({path: '/login'})
            }
            return
          }
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
        this.roleId = data
        this.getRolePermissions(data)
      },
      getRolePermissions(roleId){
        console.log('roleId', roleId)
        postRolePermissions({
          roleId: roleId
        }).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.menuItems = data.menuItems
        }).catch(err => {
          this.$Message.error({
            content: '获取角色权限失败' + err
          })
        })
      },
      getRoleListFun(){
        getRolelist().then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              this.$router.push({path: '/login'})
            }
            return
          }
          let list = res.data.list.shift()
          this.roleList = res.data.list
          console.log('roleList',this.roleList)
        }).catch(err => {
          this.$Message.error({
            content: '获取角色列表失败' + err
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

