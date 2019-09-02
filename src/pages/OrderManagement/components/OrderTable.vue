<template>
  <div class="tej-order-list">
    <Table :columns="orderColumnsTable" :data="orderDataTable" :loading="showLoading">
      <template slot-scope="{row, index}" slot="action">
        <a @click="showDetail(row.orderId)">查看详情</a>
        <a @click="showDeliveryModal = true" v-if="!showBtn && row.orderType== '未发货'">发货</a>
        <Modal v-model="showDeliveryModal"
               title="填写发货信息"
               @on-ok="ok(row.orderId)"
        >
          <DeliveryModal></DeliveryModal>
        </Modal>
      </template>
    </Table>
    <div class="tej-page-box">
      <Page :total="page.total"
            show-sizer
            show-total
            class="tej-page"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
      ></Page>
    </div>
  </div>
</template>

<script>
  import { userType,orderType } from '@/api/tableData'
  import DeliveryModal from './DeliveryModal'

  export default {
    name: 'OrderTable',
    components: {
      DeliveryModal
    },
    props: {
      orderColumnsTable: {
        type: Array
      },
      orderDataTable: {
        type: Array
      },
      page: {
        type: Object
      },
      showLoading: {
        type: Boolean
      }
    },
    computed:{
      showBtn(){
        let checked = localStorage.getItem('userType') == userType.platform
        return checked ? true :false
      }
    },
    data(){
      return {
        showDeliveryModal: false,
        formLogistics: {},
        orderId: null
      }
    },
    methods: {
      ok(orderId){
        this.$emit('ok-callback',orderId)
      },
      pageChange(i) {
        console.log('page', i)
        this.page.index = i
        this.$emit('page-change-callback', this.page)
      },
      pageSizeChange(s) {
        console.log('pageSize', s)
        this.page.size = s
        this.$emit('pageSize-change-callback', this.page)
      },
      showDetail(orderId) {
        this.orderId = orderId
        this.$router.push({
          name: 'OrderDetailPage',
          params: {orderId: orderId,page: 1,pageSize: 10}
        })
      }
    }
  }
</script>

<style>
  .tej-order-list {
    padding: 18px;
    margin-top: 18px;
    background: #fff;
  }
  .tej-order-list .ivu-table-expanded-cell{
    padding-top: 0;
    padding-bottom: 0;
  }
</style>

