<template>
  <div class="tej-main">
    <TejTable
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      @page-change-callback="pageChange"
      @pageSize-change-callback="pageSizeChange"
    >
      <div slot="age"></div>
    </TejTable>
  </div>
</template>

<script>
  import { getApplylist } from '@/api/api'
  import { unCheckedRetailTable } from '@/api/tableData'
  import  TejTable  from '@/components/TejTable'
  export default {
    name: 'UnCheckedPage',
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
        }
      }
    },
    mounted(){
      this.columnsData = unCheckedRetailTable
      this.getApplylistFun()
    },
    methods: {
      pageChange(page){
        this.page = page
        this.getApplylistFun()
      },
      pageSizeChange(page){
        this.page = page
        this.getApplylistFun()
      },
      getApplylistFun(){
        getApplylist({page:1,pageSize: 10}).then(res => {
          let data = res.data
          this.tableData = data.list
          this.page = {
            index: data.page,
            size: data.pageSize,
            total: data.total
          }
          data.list.map((item) => {
            this.columnsData.map((col,c) => {
              col['key'] = Object.keys(item)[c]
            })
          })
        })
          .catch(err => {
            this.$Message.error('获取零售商待审核列表失败',err)
          })
      },
    }
  }
</script>

<style scoped>

</style>

