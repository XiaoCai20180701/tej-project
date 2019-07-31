<template>
  <div class="tej-main">
    <Row :gutter="18">
      <Col span="5">
      <BaseInfo :detail-data="retailDetail.retailInfo"></BaseInfo>
      </Col>
      <Col span="19">
      <div>
        <Row :gutter="20">
          <Col span="12">
          <DataInfo :data="retailDetail.orderData" :is-vendor="isVendor"></DataInfo>
          </Col>
          <Col span="12">
          <EnvironmentImg :img-list="retailDetail.environmentList"></EnvironmentImg>
          </Col>
        </Row>
        <div class="tej-vendor-table">
          <RetailTable :columns-data="retailColumns"
                       :table-data="retailData"
                       :page="page"
                       @page-change-callback="pageChange"
                       @pageSize-change-callback="pageSizeChange"
          >
          </RetailTable>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {postRetailDetail} from '@/api/api'
  import RetailTable from './components/RetailTable'
  import BaseInfo from '@/components/vendorRetail/BaseInfo'
  import DataInfo from '@/components/vendorRetail/DataInfo'
  import EnvironmentImg from '@/components/vendorRetail/EnvironmentImg'
  import expandRow from '@/pages/OrderManagement/components/OrderItemExpand'

  export default {
    name: 'CheckedDetailPage',
    components: {
      'RetailTable': RetailTable,
      'BaseInfo': BaseInfo,
      'DataInfo': DataInfo,
      'EnvironmentImg': EnvironmentImg
    },
    data() {
      return {
        productShow: 0,  //未启用
        environmentImgIndex: 0,
        retailColumns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '订单编号',
            key: 'orderId'
          },
          {
            title: '状态',
            key: 'orderStatus'
          },
          {
            title: '发货时间',
            key: 'orderTime'
          },
          {
            title: '发货于',
            key: 'vendorName'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        retailData: [],
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        retailDetail: {
          retailInfo: {},
          orderData: {}
        },
        isVendor: false
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
        postRetailDetail({
          retailId: this.$route.query.retailId,
          page: 1,
          pageSize: 10
        }).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            return
          }
          let data = res.data
          this.retailDetail = data
          console.log('data',data)
          this.retailData = data.orderList.list
          this.page = {
            index: data.orderList.page,
            size: data.orderList.pageSize,
            total: data.orderList.total
          }
        }).catch(err => {
          this.$Message.error('获取零售商详情失败', err)
        })
      }
    }
  }
</script>

<style scoped>
  .tej-vendor-table {
    margin-top: 15px;
    background: #fff;
  }
</style>






