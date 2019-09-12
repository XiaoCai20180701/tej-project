<template>
  <div>
    <div style="background: white; padding: 20px 40px 20px 35px;">
      <div v-if="show">
        <Row :gutter="8">
          <i-col span="8">
            <Vendor :vendor-list="vendorList" @vendor-change-callback="vendorChangeCallback"></Vendor>
          </i-col>
          <i-col span="4" style="text-align: left">
            <Button type="primary" @click="searchClick">搜索</Button>
          </i-col>
        </Row>
      </div>
      <div v-else>
        <Button icon="md-add" type="primary" @click="addDiscount"> 新增折扣商品</Button>
        <Button icon="ios-trash-outline" style="margin-left: 15px;" @click="batchDelete">批量删除折扣商品</Button>
      </div>

    </div>
    <div style="background: white; margin-top: 10px;height: 85vh;">
      <div style="padding: 10px;">折扣商品列表</div>
      <Table :columns="columns"
             :data="list"
             :loading="showLoading"
             @on-selection-change="sectionChange"
      >
        <template slot-scope="{ row, index }" slot="action">
          <Tag :color="tagColor(row.activationStatus)">{{row.activationStatus}}</Tag>
        </template>
      </Table>
      <div class="tej-page-box" v-if="list.length != 0">
        <Page
          :total="page.total"
          show-sizer
          show-total
          class="tej-page"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"/>
      </div>
    </div>
  </div>
</template>

<script>
  import AddDiscountProduct from './components/AddDiscountProduct'
  import {userType, DiscountTable, activityType} from '@/api/tableData'
  import Vendor from '@/components/Vendor'
  import {getVendorList, postDiscountList, postAddDiscount, deleteDiscount} from '@/api/api'

  export default {
    name: "MarketingDiscountPage",
    components: {
      AddDiscountProduct,
      Vendor
    },
    data() {
      return {
        isAdmin: userType.platform,
        vendorId: '',
        vendorList: [],
        isDiscount: activityType.discount,
        //  modal: false,
        selectColumns: [],
        columns: [],
        list: [],
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        showLoading: false,
        addIds: [],
        discountInfo: {}
      }
    },
    computed: {
      show() {
        let checked = sessionStorage.getItem('userType') == userType.platform
        return checked ? true : false
      },
      tagColor() {
        return function (status) {
          return status == '未激活' ? '#FF7903' : '#00818C'
        }
      }
    },
    mounted() {
      this.columns = DiscountTable
      this.getVendorList()
      this.getList()
    },
    methods: {

      pageChange(page) {
        this.page.index = page
        this.getList()
      },
      pageSizeChange(page) {
        this.page.size = page
        console.log('pageSize', page)
        this.getList()
      },
      vendorChangeCallback(val) {
        console.log('厂家列表回调', val)
        this.vendorId = val
      },
      searchClick() {
        this.getList()
      },
      sectionChange(item) {
        console.log("section", item)
        let ids = []
        ids.push(item.map(item => item.discountId))
        console.log('ids', ids)
        this.selectColumns = ids.toString()
      },
      batchDelete() {
        console.log("批量删除折扣 selectColumns", this.selectColumns)
        if (this.selectColumns.length == 0) {
          this.$Message.error('请先选择要删除的折扣')
          return
        }
        this.cancelDiscount(this.selectColumns)
      },

      showDetail(item) {
        console.log("show", item);
        this.$router.push({
          name: 'CouponDetail',
          params: item
        })
      },
      cancelDiscount(discountId) {
        deleteDiscount({discountId: discountId}).then(res => {
          this.$Message.success('删除折扣成功')
          this.getList()
        }).catch(err => {
          this.$Message.error('删除折扣失败' + err)
        })
      },
      addDiscount() {
        this.$router.push({name: 'AddDiscount'})
      },
//      addDiscount(){
//          let params = {
//            discountInfo: this.discountInfo,
//            addIds: this.addIds,
//            editIds: []
//          }
//        postAddDiscount(params).then(res => {
//          if (res.code != 200) {
//            this.$Message.warning(res.msg)
//            if (res.code === 9998) {
//              sessionStorage.clear()
//              this.$router.push({path: '/login'})
//            }
//            return
//          }
//          this.$Message.success('新增成功')
//          this.getList()
//        }).catch(err => {
//          this.$Message.error('新增折扣失败' + err)
//        })
//      },
      getVendorList() {
        getVendorList('').then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            return
          }
          this.vendorList = res.data.list
        })
          .catch(err => {
            this.$Message.error('获取厂家列表失败', err)
          })
      },
      getList() {
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          vendorId: this.vendorId || sessionStorage.getItem('vendorId')
        }
        this.showLoading = true
        postDiscountList(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          console.log('111111111', res)
          this.showLoading = false
          this.list = res.data.list
          this.page = {
            index: res.data.page,
            size: res.data.pageSize,
            total: res.data.total
          }
        }).catch(err => {
          this.showLoading = false
          this.$Message.error('获取优惠券列表失败' + err)
        })
      }
    }
  }
</script>

<style scoped>
</style>
