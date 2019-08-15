<template>
  <Card class="tej-account-card">
    <p slot="title">账户操作权限管理</p>
    <div class="head" v-if="!isDetail">
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
      <p><Icon type="ios-information-circle-outline" size="22" style="margin-right: 8px"/>修改操作权限后，请重新登录系统</p>
      <div v-if="menuItems.length == 0">
        菜单信息 — 暂无数据
      </div>
      <div v-for="(item, index) in list"
           :key="index"
           class="item"
           v-else
      >
        <span class="txt">{{item.text}}</span>
        <div v-if="item.status == auth" class="auth-btn">
          <span class="auth-txt">已授权</span>
          <span class="cancel-txt" @click="changeAuth(item)" v-if="!isCenter">取消授权</span>
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
  import { postEditPermissions, postAddRole } from '@/api/api'
  export default {
    name: 'AccountSetting',
    props: {
      roleId: {
        type: Number,
        required: false
      },
      roleList: Array,
      menuItems: Array, //全部的菜单
      isDetail: {    //是否是详情页
        type: Boolean,
        required: false
      },
      isCenter: {  //是否是个人中心
        type: Boolean,
        required: false
      }
    },
    data() {
      return {
        roleGroup: 1,
        newRoleValue:'',
        auth: authType.auth,
        role: 1
      }
    },
    computed:{
      list(){
        return this.isCenter ? this.showMenuList(this.menuItems): this.menuItems
      }
    },
    methods: {
      showMenuList(list){
       return list.filter( (i,v)=> i.status === authType.auth)
      },
      changeAuth(item){
        let roleId = localStorage.getItem('roleId')
        if(roleId != 1){
          this.$Message.error('请联系管理员修改权限！')
          return
        }else {
          item.status = item.status == 0 ? 1 : 0
          this.editPermissions(this.roleId,item.menuId,item.status)
        }

      },
      roleChange(e){
        this.role = e
        this.$emit('role-change',e)
      },
      addRole(){
        if (this.newRoleValue === '') {
          this.$Message.error('新增角色名不能为空')
          return
        }
        let checked = this.roleList.some((i,v) => i.name == this.newRoleValue )
        if(checked){
          this.$Message.error('与已有角色名重复')
          return
        }
        this.roleList.push({name: this.newRoleValue})
        this.addRoleAjax(this.newRoleValue)
        this.newRoleValue = ''
      },
      addRoleAjax(value){
        postAddRole({
          roleName: value
        }).then(res=> {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
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
        postEditPermissions(params).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('修改成功')
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
