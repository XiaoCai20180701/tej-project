<template>
  <div class="tej-main">
    <Row :gutter="18">
      <i-col span="5">
        <BaseInfo :detail-data="vendorDetail.vendorInfo"></BaseInfo>
      </i-col>
      <i-col span="19">
        <div class="tej-vendor-detailinfo">
          <Row :gutter="20">
            <i-col span="12">
              <DataInfo :data="vendorDetail.trafficAndSales" :is-vendor="isVendor"></DataInfo>
            </i-col>
            <i-col span="12">
              <EnvironmentImg :img-list="vendorDetail.environmentList"></EnvironmentImg>
            </i-col>
          </Row>
          <!-- 厂家版，显示搜索区域-->
          <Row v-if="!showSerach" class="search">
            <i-col span="8">
              <Input type="text"
                     v-model="keywords"
                     clearable
                     @on-change="keywordsChange"
                     placeholder="请输入商品货号或商品名称"
              />
            </i-col>
            <i-col span="2" offset="1">
              <Button type="primary" @click="searchClick">搜索</Button>
            </i-col>
          </Row>
          <div class="tej-vendor-table">
            <VendorTable :show-loading="showLoading"
                         :columns-data="columnsData"
                         :table-data="tableData"
                         :page="page"
                         @page-change-callback="pageChange"
                         @pageSize-change-callback="pageSizeChange"
            >
            </VendorTable>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import {postVendorDetail} from '@/api/api'
  import {userType, vendorTable, vendorPlatformTable} from '@/api/tableData'
  import VendorTable from './components/VendorTable'
  import BaseInfo from '@/components/vendorRetail/BaseInfo'
  import DataInfo from '@/components/vendorRetail/DataInfo'
  import EnvironmentImg from '@/components/vendorRetail/EnvironmentImg'
  import ICol from "../../../node_modules/iview/src/components/grid/col.vue";

  export default {
    name: 'CheckedVendorDetailPage',
    components: {
      ICol,
      'VendorTable': VendorTable,
      'BaseInfo': BaseInfo,
      'DataInfo': DataInfo,
      'EnvironmentImg': EnvironmentImg
    },
    data() {
      return {
        showLoading: false,
        productShow: 0,  //未启用
        environmentImgIndex: 0,
       // columnsData: [],
        tableData: [],
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        vendorDetail: {
          vendorInfo: {},
          trafficAndSales: {}
        },
        isVendor: true,
        keywords: ''
      }
    },
    computed: {
      showSerach() {
        let checked = sessionStorage.getItem('userType') == userType.platform
        return checked ? true : false
      },
      columnsData(){
        let checked = sessionStorage.getItem('userType') == userType.platform
        return checked ? vendorPlatformTable : vendorTable
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      keywordsChange(e) {
        this.keywords = e.target.value
      },
      searchClick() {
        //厂家版搜索
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
        postVendorDetail({
          vendorId: this.$route.params.vendorId,
          page: this.page.index,
          pageSize: this.page.size,
          keywords: this.keywords
        }).then(res => {
          this.showLoading = false
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.vendorDetail = data
          console.log('data', data)
          this.tableData = data.productInfo.productList
          this.page = {
            index: data.productInfo.page,
            size: data.productInfo.pageSize,
            total: data.productInfo.total
          }
        }).catch(err => {
          this.showLoading = false
          this.$Message.error('获取厂家详情失败', err)
        })
      }
    }
  }
</script>

<style scoped>
  .tej-vendor-detailinfo {
    /*padding: 12px;*/
  }

  .environment-imglist {
    background: #fff;
  }

  .tej-vendor-table {
    margin-top: 15px;
    background: #fff;
  }

  .tej-vendor-detailinfo .search {
    margin: 15px 0 5px 0;
    padding: 8px;
    background: #fff;
  }
</style>





