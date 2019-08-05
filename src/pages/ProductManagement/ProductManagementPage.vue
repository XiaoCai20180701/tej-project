<template>
  <div class="tej-main">
    <TejTable
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      @page-change-callback="pageChange"
      @pageSize-change-callback="pageSizeChange"
      @area-change-callback="areaChange"
      @keywords-change-callback="keywordsChange"
    >
      <div slot="btn">
        <Button type="primary" @click="gotoAddClassification">新增商品分类</Button>
        <Button type="primary" @click="gotoAddProduct">新增商品</Button>
      </div>
    </TejTable>
  </div>
</template>

<script>
  import {getProductList} from '@/api/api'
  import {productManagementTable} from '@/api/tableData'
  import TejTable from '@/components/TejTable'

  export default {
    name: 'ProductManagementPage',
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
        regionGroupID: 1,
        keywords: ''
      }
    },
    watch: {
      '$route': 'getList'
    },
    mounted() {
      this.columnsData = productManagementTable
      this.getList()
    },
    methods: {
      keywordsChange(keywords) {
        console.log('keywords 回调', keywords)
        this.keywords = keywords
        this.getList()
      },
      areaChange(blockId) {
        console.log('area 回调', blockId)
        this.regionGroupID = blockId
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
        getProductList({
          page: this.page.index,
          pageSize: this.page.size,
          blockId: this.regionGroupID,
          keywords: this.keywords
        }).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
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
            console.log('err', err)
            this.$Message.info({
              content: err
            })
          })
      },
      gotoAddClassification() {
        this.$router.push({name: 'AddClassificationPage'})
      },
      gotoAddProduct() {
        this.$router.push({name: 'AddProductPage'})
      }
    }
  }
</script>

<style scoped>

</style>
