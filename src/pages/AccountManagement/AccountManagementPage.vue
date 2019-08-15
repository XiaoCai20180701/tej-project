<template>
  <div>
    <TejTable
      :show-loading="showLoading"
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      @page-change-callback="pageChange"
      @pageSize-change-callback="pageSizeChange"
    >
      <div slot="area"></div>
      <div slot="extra">
        <RadioGroup v-model="checkedRole" @on-change="roleChange">
          <Radio v-for="(item, index) in roleList"
                 :key="index"
                 :label="item.id"
                 class="tej-radio"
          >{{item.name}}
          </Radio>
        </RadioGroup>
      </div>
      <div slot="search" class="notxt">1</div>
      <div slot="btn">
        <Button type="primary" class="tej-addrole-btn" @click="addUser">添加账户</Button>
      </div>

      <template slot-scope="{ row, index }" slot="action-btn">
        <a style="margin-right: 5px" @click="showDetail(row.userId)">查看详情</a>
        <a @click="disableUser(row)">
          <span v-if="row.isUsed == userStatus">已启用</span>
          <span class="tej-disable-txt" v-else >未启用</span>
        </a>
      </template>

    </TejTable>
  </div>
</template>

<script>
  import TejTable from '@/components/TejTable'
  import {accountTable, roleType, userStatusType} from '@/api/tableData'
  import {postUserList, getRolelist, putEditUserStatus} from '@/api/api'

  export default {
    name: 'AccountManagementPage',
    components: {
      'TejTable': TejTable
    },
    data() {
      return {
        showLoading: false,
        columnsData: [],
        tableData: [],
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        roleId: null,
        checkedRole: 0,
        roleList: [],
        userStatus: userStatusType.enable
      }
    },
    watch: {
      '$route': 'getList'
    },
    mounted() {
      this.columnsData = accountTable
      this.getRolelistFun()
      this.getList()
    },
    methods: {
      addUser(){
        this.$router.push({
          name: 'AccountAddPage'
        })
      },
      disableUser(row) {
        row.isUsed = row.isUsed == 0 ? 1 : 0
        this.editUserStatus(row.userId, row.isUsed)
      },
      showDetail(userId){
        this.$router.push({
          name: 'AccountDetailPage',
          params: {userId: userId, isDetail: true}
        })
      },
      roleChange(e) {
        console.log('角色change', e)
        this.roleId = e
        this.getList()
      },
      pageChange(page) {
        this.page = page
        this.getList()
      },
      pageSizeChange(page) {
        this.page = page
        this.getList()
      },
      getList() {
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          roleId: this.roleId
        }
        this.showLoading = true
        postUserList(params).then(res => {
          this.showLoading = false
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.tableData = data.list
          this.page = {
            index: data.page,
            size: data.pageSize,
            total: data.total
          }
        }).catch(err => {
          this.showLoading = false
          this.$Message.error({
            content: '获取账户列表失败'
          })
        })
      },
      getRolelistFun() {
        getRolelist().then(res => {
          console.log('角色列表', res.data)
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              this.$router.push({path: '/login'})
            }
            return
          }
          let roleList = res.data.list
          let firstRole = [{id: 0, name:'全部'}]
          this.roleList = [...firstRole, ...roleList]
          this.checkedRole = this.roleList[0].id
        }).catch(err => {
          this.$Message.error({
            content: '获取角色列表失败'
          })
        })
      },
      editUserStatus(userId, isUsed) {
        let params = {
          userId: userId,
          isUsed: isUsed
        }
        putEditUserStatus(params).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success({
            content: '成功修改状态'
          })
        }).catch(err => {
          this.$Message.error({
            content: '修改账户状态失败'
          })
        })
      }
    }
  }
</script>

<style scoped>
  .tej-addrole-btn {
    margin-bottom: 20px;
  }

  .notxt {
    color: transparent;
  }

  .tej-disable-txt {
    color: red;
  }

</style>
