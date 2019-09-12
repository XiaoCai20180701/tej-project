<template>
  <div class="tej-main">
    <TejTable
      :show-loading="showLoading"
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      @page-change-callback="pageChange"
      @pageSize-change-callback="pageSizeChange"
      @area-change-callback="areaChange"
      @keywords-change-callback="keywordsChange"
    >
      <template slot-scope="{ row, index }" slot="action-btn">
        <a style="margin-right: 5px" @click="showDetail(row)" v-if="row.show == enable">查看详情</a>
        <a @click="showDetail(row)" v-else>编辑详情</a>
        <a style="margin-right: 5px" @click="setProductShow(row)">
          {{row.show == enable ? '已启用' : '未启用'}}
        </a>
      </template>

      <div slot="btn">
        <Button type="primary" @click="gotoAddClassification">新增商品分类</Button>
        <Button type="primary" @click="gotoAddProduct">新增商品</Button>
      </div>
    </TejTable>
  </div>
</template>

<script>
  import {getProductList, putProductDetail} from '@/api/api'
  import {productManagementTable} from '@/api/tableData'
  import TejTable from '@/components/TejTable'

  export default {
    name: 'ProductManagementPage',
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
        regionGroupID: 1,
        keywords: '',
        enable: 1, //商品启用
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
      showDetail(row,isEdit) {
        this.$router.push({
          name: 'EditProductPage',
          params: {productId: row.id, isEdit: true}
        })
      },
      setProductShow(row) {
        row.show = !row.show
        this.modifyProduct(row.id, row.show)
      },
      modifyProduct(id, show) {
        let params = {
          productId: id,
          productShow: show == true ? 1 : 0
        }
        putProductDetail(params).then(res => {
          if(res.code != 200){
            this.$Message.error(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('修改成功')
        }).catch(err => {
          this.$Message.error('修改商品状态失败! ' + err)
        })
      },
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
        this.showLoading = true
        getProductList({
          page: this.page.index,
          pageSize: this.page.size,
          blockId: this.regionGroupID,
          keywords: this.keywords
        }).then(res => {
          this.showLoading = false
          if (res.code != 200) {
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
