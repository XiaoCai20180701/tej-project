<template>
  <div>
    <OrderSearchForm @vendor-callback="vendorCallback"
                     @retail-callback="retailCallback"
                     @ok-callback="searchCallback"
    ></OrderSearchForm>
    <OrderTable :order-columns-table="orderColumns"
                :order-data-table="orderData"
                :page="page"
                @page-change-callback="pageChangeCallback"
                @pageSize-change-callback="pageSizeChangeCallback"
    ></OrderTable>
  </div>
</template>

<script>
  import { postOrderList} from '@/api/api'
  import OrderSearchForm from './components/OrderSearchForm'
  import OrderTable from './components/OrderTable'
  import expandRow from './components/OrderItemExpand'

  export default {
    name: 'NonPayment',
    components: { expandRow,OrderSearchForm,OrderTable },
    data() {
      return {
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        orderList: [],
        orderColumns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              console.log('params.row',params.row)
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
            key: 'orderType'
          },
          {
            title: '发货时间',
            key: 'orderSendTime'
          },
          {
            title: '发货至',
            key: 'vendorName'
          },
          {
            title: '送货至',
            key: 'retailName'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        orderData: []
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      pageChangeCallback(data){
        console.log('page callback',data)
        this.getList()
      },
      pageSizeChangeCallback(data){
        console.log('pageSize callback',data)
        this.getList()
      },
      searchCallback(data){
        console.log('確認',data)
        this.getList()
      },
      vendorCallback(data){
        console.log('廠商歷史記錄',data)
        this.getList()
      },
      retailCallback(data){
        console.log('生產商歷史記錄',data)
        this.getList()
      },
      getList() {
        let params = {
          page: 1,
          pageSize: 10,
          orderType: 0,
          vendorName: this.vendorName,
          retailName: this.retailName,
          startTime: this.startTime,
          endTime: this.endTime
        }
        postOrderList(params).then(res => {
          console.log('订单列表', res.data)
          let data = res.data
          this.orderData = data.orderList
          this.page = {
            index: data.page,
            size: data.pageSize,
            total: data.total
          }
        }).catch(err => {
          this.$Message.error('获取订单列表失败', err)
        })
      }
    }
  }
</script>

<style>
</style>
