<template>
  <div class="tej-table">
    <Table
      :loading="showLoading"
      :columns="columnsData"
      :data="tableData"
      v-if="tableData.length >= 0"
    >
      <template slot-scope="{ row, index }" slot="action">
        <a @click="showDetail(row.id)"
           v-if="row.show == enable"
        >查看详情</a>
        <a @click="edit(row.id)"
           v-else
        >编辑商品</a>
        <a style="margin-right: 5px" @click="setProductShow(row)">
          {{row.show == enable ? '已启用': '未启用'}}
        </a>
      </template>
    </Table>
    <div class="tej-page-box" v-if="tableData.length != 0">
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
  import { putProductDetail } from '@/api/api'
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
      },
      showLoading: {
        type: Boolean
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
        this.$Message.info('跳转到前台页面', id)
      },
      edit(id){
        this.$router.push({
          name: 'EditProductPage',
          params: { productId: id,isEdit: true }
        })
      },
      setProductShow(row){
          row.show = !row.show
        this.modifyProduct(row.id,row.show)
      },
      modifyProduct(id, show){
        let params = {
          productId: id,
          productShow: show == true ? 1:0
        }
        putProductDetail(params).then(res => {
          this.$Message.success('修改成功')
        }).catch(err => {
          this.$Message.error('修改商品状态失败! ' + err)
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




