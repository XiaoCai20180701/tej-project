<template>
  <div>
    <OrderSearchForm @vendor-callback="vendorCallback"
                     @retail-callback="retailCallback"
                     @ok-callback="searchCallback"
    ></OrderSearchForm>
   <Delivery></Delivery>
    <OrderTable :order-columns-table="orderColumns"
                :order-data-table="orderData"
                :page="page"
                :show-loading="showLoading"
                @page-change-callback="pageChangeCallback"
                @pageSize-change-callback="pageSizeChangeCallback"
                @ok-callback="okCallback"
    ></OrderTable>
  </div>
</template>

<script>
  import { postOrderList, putUpdateOrder} from '@/api/api'
  import { orderType } from '@/api/tableData'
  import OrderSearchForm from './components/OrderSearchForm'
  import OrderTable from './components/OrderTable'
  import expandRow from './components/OrderItemExpand'
  import bus from '@/utils/bus'
  import Delivery from '@/components/Delivery'

  export default {
    name: 'Unshipped',
    components: { expandRow,OrderSearchForm,OrderTable,Delivery },
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
        vendorName: '',
        startTime: null,
        endTime: null,
        formLogistics: {}
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      formLogisticsCallback(){
        bus.$on('formLogistics-callback',(data)=>{
          this.formLogistics = {
            orderLogisticsId: data.orderLogisticsId,
            orderLogisticsName: data.orderLogisticsName
          }
        })
      },
      okCallback(orderId){
        this.formLogisticsCallback()
        this.updateOrder(orderId)
      },
      updateOrder(orderId){
        let params = {
          orderId: orderId,
          orderLogisticsId: this.formLogistics.orderLogisticsId,
          orderLogisticsName: this.formLogistics.orderLogisticsName,
          orderType: orderType.received  //待发货到已发货，状态值需要传2
        }
        putUpdateOrder(params).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('修改成功')
          this.getList()
        }).catch(err => {
          this.$Message.error('修改失败')
        })
      },
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
        this.vendorName = data.vendorName
        this.retailName = data.retailName
        this.startTime = data.startTime
        this.endTime = data.endTime
        this.getList()
      },
      vendorCallback(data){
        console.log('厂家历史记录点击 回调',data)
        this.vendorName = data
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
          orderType: orderType.unshipped,
          vendorName: this.vendorName,
          retailName: this.retailName,
          startTime: this.startTime,
          endTime: this.endTime,
          vendorId: localStorage.getItem('vendorId')
        }
        postOrderList(params).then(res => {
          console.log('未发货订单列表', res.data)
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
          this.$Message.error('获取未发货订单列表失败', err)
        })
      }
    }
  }
</script>

<style>
</style>
