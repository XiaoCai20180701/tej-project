<template>
  <div class="tej-main">
    <TejTable
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      input-text="请输入商家编号/名称/联系人"
      @page-change-callback="pageChange"
      @pageSize-change-callback="pageSizeChange"
      @area-change-callback="areaChange"
      @keywords-change-callback="keywordsChange"
    >
      <div slot="age"></div>
    </TejTable>
  </div>
</template>

<script>
  import  TejTable  from '@/components/TejTable'
  import { postRetaillist} from '@/api/api'
  import { checkedRetailTable, auditType } from '@/api/tableData'
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
        },
        keywords: '',
        blockId: null
      }
    },
    mounted(){
      this.columnsData = checkedRetailTable
      this.getList()
    },
    methods: {
      keywordsChange(keywords) {
        console.log('keywords 回调', keywords)
        this.keywords = keywords
        this.getList()
      },
      areaChange(area){
        console.log('area 回调',area)
        this.blockId = area
        this.getList()
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
        postRetaillist({
          page: this.page.index,
          pageSize: this.page.size,
          keywords: this.keywords,
          blockId: this.blockId,
          status: auditType.checked
        }).then(res => {
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
        })
          .catch(err => {
            this.$Message.error('获取商家已审核列表失败',err)
          })
      },
    }
  }
</script>

<style scoped>

</style>



