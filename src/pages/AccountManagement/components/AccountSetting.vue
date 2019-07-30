<template>
  <Card class="tej-account-card">
    <p slot="title">账户操作权限管理</p>
    <div class="head" v-if="roleId == 1">
      <div class="label">快速配置权限：</div>
      <div class="checked-group">
        <RadioGroup v-model="roleGroup" @on-change="roleChange">
          <Radio v-for="(item, index) in roleList"
                 :key="item.id"
                 :label="item.id"
                 class="tej-radio"
          >{{item.name}}
          </Radio>
        </RadioGroup>
        <div>
          <Input v-model="newRoleValue" placeholder="请输入角色名" style="width: 150px;margin: 10px 15px 10px 0px;" size="small"></Input>
          <span class="add-btn" @click="addRole">新 增</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div v-for="(item, index) in menuItems" :key="index" class="item">
        <span class="txt">{{item.text}}</span>
        <div v-if="item.status == auth" class="auth-btn">
          <span class="auth-txt">已授权</span> <span class="cancel-txt" @click="changeAuth(item)">取消授权</span>
        </div>
        <div class="auth-btn" v-else>
          <span class="noauth-txt" @click="changeAuth(item)">未授权</span>
        </div>
      </div>
    </div>
    <slot name="add-role"></slot>
  </Card>
</template>

<script>
  import { authType } from '@/api/tableData'
  import { putEditPermissions, postAddRole } from '@/api/api'
  export default {
    name: 'AccountSetting',
    props: {
      roleId: {
        type: Number,
        required: false
      },
      roleList: Array,
      menuItems: Array
    },
    data() {
      return {
        roleGroup: 1,
        newRoleValue:'',
        auth: authType.auth,
      }
    },
    methods: {
      changeAuth(item){
        item.status = !item.status
        this.editPermissions(this.roleGroup,item.id,item.status)
      },
      roleChange(e){
        this.$emit('role-change',e)
      },
      addRole(){
        if (this.newRoleValue === '') {
          this.$Message.error('新增角色名不能为空')
          return;
        } else {
          this.roleList.push({name: this.newRoleValue})
          this.addRoleAjax(this.newRoleValue)
          this.newRoleValue = ''
        }
      },
      addRoleAjax(value){
        postAddRole({
          roleName: value
        }).then(res=> {
          this.$Message.success({
            content: '新增成功'
          })
        }).catch(err=> {
          this.$Message.error({
            content: '新增角色失败' + err
          })
        })
      },
      editPermissions(roleId,menuId,status){
        let params = {
          roleId: roleId,
          menuId: menuId,
          status: status
        }
        putEditPermissions(params).then(res => {

        }).catch(err=> {
          this.$Message.error({
            content: '修改角色权限失败' + err
          })
        })
      }
    }
  }
</script>

<style>
  .tej-account-card {
    min-height: 85vh;
  }
  .tej-account-card .ivu-card-head {
    background: #f3f7f9;
  }
  .tej-account-card .ivu-card-body {
    padding-left: 0;
    padding-right: 0;
  }
  .tej-account-card .head {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
  }
.tej-account-card .label {
  float: left;
  width: 130px;
  text-align: right;
}
  .tej-account-card .checked-group {
    margin-left: 140px;
  }
  .tej-account-card  .add-btn {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    color: #2e9dfc;
    font-size: 13px;
    cursor: pointer;
  }
  .tej-account-card .content {
    width: 80%;
    margin: 0 auto;
    padding: 20px 35px;
  }
  .tej-account-card .item {
    display: flex;
    margin: 20px 0;
  }
  .tej-account-card .auth-btn {
    width: 20%;
    flex: 1;
  }
  .tej-account-card .txt {
    position: relative;
    flex: 3;
  }
  .tej-account-card .txt:after {
    position: absolute;
    left: 80px;
    top: 50%;
    display: block;
    content: '';
    height: 1px;
    width: 85%;
    border: 1px dashed #ccc;
  }
  .tej-account-card .auth-txt {
    color: #00a73c;
    cursor: default;
   }
  .tej-account-card .cancel-txt {
    margin-left: 10px;
    color: #f37e00;
    cursor: pointer;
  }
  .tej-account-card .noauth-txt {
    color: #1890ff;
    cursor: pointer;
  }
</style>
