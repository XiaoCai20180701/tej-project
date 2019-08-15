<template>
  <div class="tej-main">
    <TejTable
      :show-loading="showLoading"
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      input-text="请输入厂商编号/名称/联系人"
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
  import  TejTable  from '@/components/TejTable'
  import { postVendorList} from '@/api/api'
  import { checkedVendorTable, auditType } from '@/api/tableData'
  export default {
    name: 'CheckedVendorPage',
    components: {
      'TejTable': TejTable
    },
    data(){
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
      this.columnsData = checkedVendorTable
      this.getList()
    },
    methods: {
      showDetail(id){
        this.$router.push({
          name: 'CheckedVendorDetailPage',
          params: {vendorId: id}
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
        postVendorList({
          page: this.page.index,
          pageSize: this.page.size,
          keywords: this.keywords,
          blockId: this.blockId,
          status: auditType.checked
        }).then(res => {
          this.showLoading = false
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.tableData = data.vendorList
          this.page = {
            index: data.page,
            size: data.pageSize,
            total: data.total
          }
        })
          .catch(err => {
            this.showLoading = false
            this.$Message.error('获取厂商已审核列表失败',err)
          })
      },
    }
  }
</script>

<style scoped>

</style>



