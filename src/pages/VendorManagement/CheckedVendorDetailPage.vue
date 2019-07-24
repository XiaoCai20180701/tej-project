<template>
  <div class="tej-main">
    <Row :gutter="18">
      <Col span="5">
        <BaseInfo :detail-data="vendorDetail.vendorInfo"></BaseInfo>
      </Col>
      <Col span="19">
        <div class="tej-vendor-detailinfo">
          <Row :gutter="20">
            <Col span="10">
                <DataInfo :data="vendorDetail.trafficAndSales"></DataInfo>
            </Col>
            <Col span="10">
              <EnvironmentImg></EnvironmentImg>
            </Col>
          </Row>
          <div class="tej-vendor-table">
            <VendorTable :columns-data="columnsData"
                      :table-data="tableData"
                      :page="page"
                      @page-change-callback="pageChange"
                      @pageSize-change-callback="pageSizeChange"
            >
            </VendorTable>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {postVendorDetail} from '@/api/api'
  import VendorTable from './components/VendorTable'
  import BaseInfo from '@/components/vendorRetail/BaseInfo'
  import DataInfo from '@/components/vendorRetail/DataInfo'
  import EnvironmentImg from '@/components/vendorRetail/EnvironmentImg'

  export default {
    name: 'CheckedVendorDetailPage',
    components: {
      'VendorTable': VendorTable,
      'BaseInfo': BaseInfo,
      'DataInfo': DataInfo,
      'EnvironmentImg': EnvironmentImg
    },
    data() {
      return {
        productShow: 0,  //未启用
        environmentImgIndex: 0,
        columnsData: [
          {
            'title': '编号',
            'key': 'id'
          },
          {
            'title': '商品类别',
            'key': 'typeName'
          },
          {
            'title': '商品名称',
            'key': 'name'
          },
          {
            'title': '零售价',
            'key': 'priceSale'
          },
          {
            'title': '库存',
            'key': 'inventory'
          },
          {
            'title': '访问量',
            'key': 'access'
          },
          {
            'title': '销量',
            'key': 'numberSale'
          },
          {
            title: '操作',
            slot: 'action',
          }
        ],
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
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      pageChange(page) {
        this.page = page
        this.getList()
      },
      pageSizeChange(page) {
        this.page = page
        this.getList()
      },
      getList() {
        postVendorDetail({
          vendorId: this.$route.query.vendorId,
          page: 1,
          pageSize: 10
        }).then(res => {
          let data = res.data
          this.vendorDetail = data
          console.log('data',data)
          this.tableData = data.productInfo.productList
          this.page = {
            index: data.productInfo.page,
            size: data.productInfo.pageSize,
            total: data.productInfo.total
          }
        }).catch(err => {
          this.$Message.error('获取厂商详情失败', err)
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
</style>





