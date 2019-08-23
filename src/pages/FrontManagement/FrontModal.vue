<template>
    <TejTable :show-loading="showLoading"
              :columns-data="columnsData"
              :table-data="tableData"
              :page="page"
              inputText="请输入商品编号或名称"
              @page-change-callback="pageChange"
              @pageSize-change-callback="pageSizeChange"
              @keywords-change-callback="keywordsChange"
    >
      <div slot="filter"></div>
      <template slot-scope="{ row, index }" slot="action-btn">
        <a v-if="row.addStatus === status.notAdded"@click="add(row.id)">点击添加</a>
        <span class="cancel-txt" v-else>点击取消</span>
      </template>
    </TejTable>
</template>

<script>
  import TejTable from '@/components/TejTable'
  import { addStatus } from '@/api/tableData'

  export default {
    name: 'FrontModal',
    components: { TejTable },
    props: {
      page: Object,
      tableData: Array,
      columnsData: Array,
      showLoading: Boolean
    },
    data() {
      return {
        status: addStatus
      }
    },
    mounted(){

    },
    methods: {
      add(productId){
        console.log('productId', productId)
        this.$emit('add-product-callback',productId)
      },
      pageChange(page){
        this.$emit('front-page-callback',page)
      },
      pageSizeChange(page){
        this.$emit('front-pageSize-callback',page)
      },
      keywordsChange(keywords){
        this.$emit('front-keywords-callback',keywords)
      }
    }
  }
</script>
<style scoped>
.cancel-txt {
  color: red
}
</style>



