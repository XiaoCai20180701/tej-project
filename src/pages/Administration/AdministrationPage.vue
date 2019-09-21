<template>
  <div class="tej-main">
    <TejTable
      :show-loading="showLoading"
      :columns-data="columnsData"
      :table-data="tableData"
      :page="page"
      @page-change-callback="pageChange"
      @pageSize-change-callback="pageSizeChange"
      @keywords-change-callback="keywordsChange"
    >
      <div slot="filter"></div>
      <!--<template slot-scope="{ row, index }" slot="action-btn">-->
        <!--<a style="margin-right: 5px" @click="showDetail(row)" v-if="row.show == enable">查看详情</a>-->
        <!--<a @click="showDetail(row)" v-else>编辑详情</a>-->
        <!--<a style="margin-right: 5px" @click="setProductShow(row)">-->
          <!--{{row.show == enable ? '已启用' : '未启用'}}-->
        <!--</a>-->
      <!--</template>-->

      <!--<div slot="btn">-->
        <!--<Button type="primary" @click="gotoAddClassification">新增商品分类</Button>-->
        <!--<Button type="primary" @click="gotoAddProduct">新增商品</Button>-->
      <!--</div>-->
    </TejTable>
  </div>
</template>

<script>
  import TejTable from '@/components/TejTable'
  import { administrationTable } from '@/api/tableData'
  import { postAdministrativeList } from '@/api/api'
  export default {
    name: 'AdministrationPage',
    components: { TejTable  },
    props: {

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
        keywords: ''
      }
    },
    mounted(){
      this.columnsData = administrationTable
      this.getList()
    },
    methods: {
      keywordsChange(data){
        this.keywords = data
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
      getList(){
        console.log('list')
        let params = {
          keywords: this.keywords
        }
        postAdministrativeList(params).then(res => {
          if(res.code != 200){
            this.$Message.error(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.tableData = res.data.list
        }).catch(err => {
          this.$Message.error('请求列表失败')
        })
      }
    }
  }
</script>

<style scoped>

</style>
