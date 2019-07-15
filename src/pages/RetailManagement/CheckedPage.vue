<template>
  <div class="tej-main">
    <TejTable
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      @page-change-callback="pageChange"
      @pageSize-change-callback="pageSizeChange"
      @area-change-callback="areaChange"
    >
      <div slot="age"></div>
    </TejTable>
  </div>
</template>

<script>
  import  TejTable  from '@/components/TejTable'
  import { getAuditedlist} from '@/api/api'
  import { checkedRetailTable } from '@/api/tableData'
  export default {
    name: 'CheckedPage',
    components: {
      'TejTable': TejTable
    },
    data(){
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
      this.columnsData = checkedRetailTable
      this.getList()
    },
    methods: {
      areaChange(area){
        console.log('area 回调',area)
      },
      pageChange(page){
        this.page = page
        this.getList()
      },
      pageSizeChange(page){
        this.page = page
        this.getList()
      },
      getList(){
        getAuditedlist({page:1,pageSize: 10}).then(res => {
          let data = res.data
          this.tableData = data.list
          this.page = {
            index: data.page,
            size: data.pageSize,
            total: data.total
          }
          data.list.map((item) => {
//            console.log('key Object---------',Object.keys(item))
            this.columnsData.map((col,c) => {
              col['key'] = Object.keys(item)[c]
            })
          })
        })
          .catch(err => {
            this.$Message.error('获取零售商已审核列表失败',err)
          })
      },
    }
  }
</script>

<style scoped>

</style>



