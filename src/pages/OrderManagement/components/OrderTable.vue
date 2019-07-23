<template>
  <div class="tej-order-list">
    <Table :columns="orderColumnsTable" :data="orderDataTable">
      <template slot-scope="{row, index}" slot="action">
        <a @click="showDetail(row.orderId)">查看详情</a>
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
  export default {
    name: 'OrderTable',
    props: {
      orderColumnsTable: {
        type: Array
      },
      orderDataTable: {
        type: Array
      },
      page: {
        type: Object
      }
    },
    data(){
      return {

      }
    },
    methods: {
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
        this.$router.push({
          name: 'OrderDetailPage',
          query: { orderId: orderId}
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

