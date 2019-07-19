<template>
  <div class="tej-main">
    <TejTable
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      input-text="请输入零售商编号/名称/联系人"
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
  import { postApplylist } from '@/api/api'
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
        },
        keywords: '',
        blockId: null,
        status: 2   //待审核
      }
    },
    mounted(){
      this.columnsData = unCheckedRetailTable
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
        postApplylist({
          page: this.page.index,
          pageSize: this.page.size,
          keywords: this.keywords,
          blockId: this.blockId,
          status: this.status
        }).then(res => {
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

