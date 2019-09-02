<template>
  <div>
    <OrderSearchForm @retail-callback="retailCallback"
                     @ok-callback="searchCallback"
    ></OrderSearchForm>
    <OrderTable :order-columns-table="orderColumns"
                :order-data-table="orderData"
                :page="page"
                :show-loading="showLoading"
                @page-change-callback="pageChangeCallback"
                @pageSize-change-callback="pageSizeChangeCallback"
    ></OrderTable>
  </div>
</template>

<script>
  import { postOrderList} from '@/api/api'
  import { orderType } from '@/api/tableData'
  import OrderSearchForm from './components/OrderSearchForm'
  import OrderTable from './components/OrderTable'
  import expandRow from './components/OrderItemExpand'

  export default {
    name: 'EvaluatedPage', //待评价=已收货
    components: { expandRow,OrderSearchForm,OrderTable },
    data() {
      return {
        showLoading: false,
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
            title: '下单时间',
            key: 'orderTime'
          },
          {
            title: '发货时间',
            key: 'orderSendTime'
          },
          {
            title: '发货于',
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
        orderData: [],
        retailName: '',
        startTime: null,
        endTime: null
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
        console.log('确认 回调',data)
        this.retailName = data.retailName
        this.startTime = data.startTime
        this.endTime = data.endTime
        this.getList()
      },
      retailCallback(data){
        console.log('商家历史记录点击 回调',data)
        this.retailName = data
        this.getList()
      },
      getList() {
        this.showLoading = true
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          orderType: orderType.evaluate,
          retailName: this.retailName,
          startTime: this.startTime,
          endTime: this.endTime,
          vendorId: localStorage.getItem('vendorId')
        }
        postOrderList(params).then(res => {
          console.log('已收货 - 待评价订单列表', res.data)
          this.showLoading = false
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.orderData = data.orderList
          this.page = {
            index: data.page,
            size: data.pageSize,
            total: data.total
          }
        }).catch(err => {
          this.showLoading = false
          this.$Message.error('获取已收货订单列表失败', err)
        })
      }
    }
  }
</script>

<style>
</style>
