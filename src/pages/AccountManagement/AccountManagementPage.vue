<template>
  <div>
    <TejTable
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
        <Button type="primary" class="tej-addrole-btn">添加账户</Button>
      </div>
      <a slot="action-btn"
         slot-scope="props"
         @click="disableUser(props.row)"
      >{{props.row.isUsed == userStatus ? '已启用' : '未启用'}}</a>
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
        columnsData: [],
        tableData: [],
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        roleId: roleType.admin,
        checkedRole: 0,
        roleList: [],
        userStatus: userStatusType.enable
      }
    },
    mounted() {
      this.columnsData = accountTable
      this.getRolelistFun()
      this.getList()
    },
    methods: {
      disableUser(row) {
        console.log('props.row.userId', row.userId)
        row.isUsed = !row.isUsed
        this.editUserStatus(row.userId)
      },
      roleChange(e) {
        console.log('角色change', e)
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
        postUserList(params).then(res => {
          console.log('账户列表', res)
          let data = res.data
          this.tableData = data.list
          data.list.map((item) => {
//            console.log('key Object---------',Object.keys(item))
            this.columnsData.map((col, c) => {
              col['key'] = Object.keys(item)[c]
            })
          })
        }).catch(err => {
          this.$Message.error({
            content: '获取账户列表失败'
          })
        })
      },
      getRolelistFun() {
        getRolelist().then(res => {
          console.log('角色列表', res.data)
          this.roleList = res.data.list
        }).catch(err => {
          this.$Message.error({
            content: '获取角色列表失败'
          })
        })
      },
      editUserStatus(userId) {
        let params = {
          userId: userId,
          isUsed: this.userStatus
        }
        putEditUserStatus(params).then(res => {
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

</style>
