<template>
  <div class="tej-main">
    <TejTable
      :show-loading="showLoading"
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      input-text="请输入商家名称/联系人/联系号码"
      @page-change-callback="pageChange"
      @pageSize-change-callback="pageSizeChange"
      @area-change-callback="areaChange"
      @keywords-change-callback="keywordsChange"
    >
      <template slot-scope="{ row, index }" slot="action-btn">
        <a style="margin-right: 5px" @click="showDetail(row.id)">查看详情</a>
      </template>
      <div slot="age"></div>
    </TejTable>
  </div>
</template>

<script>
  import { postRetaillist } from '@/api/api'
  import { unCheckedRetailTable, auditType } from '@/api/tableData'
  import  TejTable  from '@/components/TejTable'
  export default {
    name: 'UnCheckedPage',
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
        keywords: '',
        blockId: null,
      }
    },
    mounted(){
      this.columnsData = unCheckedRetailTable
      this.getList()
    },
    methods: {
      showDetail(id){
        this.$router.push({
          name: 'AuditStatusPage',
          params: { id: id,isVendor: false, isAudit: 0 }
        })
      },
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
        this.showLoading = true
        postRetaillist({
          page: this.page.index,
          pageSize: this.page.size,
          keywords: this.keywords,
          blockId: this.blockId,
          status: auditType.unChecked
        }).then(res => {
          this.showLoading = false
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
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
            this.showLoading = false
            this.$Message.error('获取商家待审核列表失败',err)
          })
      },
    }
  }
</script>

<style scoped>

</style>

