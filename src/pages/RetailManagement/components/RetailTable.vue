<template>
  <div class="tej-table">
    <Table
      :columns="columnsData"
      :data="tableData"
      v-if="tableData.length >= 0"
    >
      <template slot-scope="{ row, index }" slot="action">
        <a @click="showDetail(row.orderId)">查看订单详情</a>
      </template>
    </Table>
    <div class="tej-page-box">
      <Page
        :total="page.total"
        show-sizer
        show-total
        class="tej-page"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      columnsData: {
        type: Array,
        required: true
      },
      tableData: {
        type: Array,
        required: true
      },
      page: {
        type: Object
      }
    },
    data() {
      return {
        enable: 1,
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      showDetail(id) {
        this.$router.push({
          name: 'OrderDetailPage',
          query: {orderId: id},
          params: {page: 1,pageSize: 10}
        })
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
      }
    }
  }
</script>

<style>
  .tej-form {
    padding: 15px;
    padding-bottom: 0;
    margin-bottom: 20px;
    background: #fff;
  }

  .tej-table {
    min-height: 60vh;
    padding-bottom: 15px;
    background: #fff;
  }

  .tej-label > :first-child {
    font-size: 14px;
  }

  .ivu-radio-inner, .ivu-radio-inner:after {
    border-radius: 0 !important;
  }

  .tej-radio {
    min-width: 70px;
  }

  .tej-table-search-box {
    display: flex;
    flex-direction: row;
    width: 360px;
    margin-bottom: 20px;
  }

  .tej-search-input {
    flex: 5;
  }

  .tej-search-btn {
    flex: 1;
    margin-left: 10px;
  }

  .tej-table-btngroup {
    text-align: right;
  }
</style>






