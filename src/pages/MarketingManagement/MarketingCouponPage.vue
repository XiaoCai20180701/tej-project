<template>
  <div>
    <div style="background: white; padding: 20px 40px 20px 35px;">
      <div v-if="show">
        <Row :gutter="8">
          <Col span="8">
            <Vendor :vendor-list="vendorList" @vendor-change-callback="vendorChangeCallback"></Vendor>
          </Col>
          <Col span="4" style="text-align: left">
          <Button type="primary" @click="searchClick">搜索</Button>
          </Col>
        </Row>
      </div>
      <div v-else>
        <Button icon="md-add" type="primary" @click="addCoupon"> 新增优惠劵</Button>
        <Button icon="ios-trash-outline" style="margin-left: 15px;" @click="batchDelete">批量删除优惠劵</Button>
      </div>

    </div>
    <div class="tej-coupon-list" >
      <div class="tej-coupon-tilte">优惠劵列表</div>
      <Table :columns="columns"
             :data="list"
             :loading="showLoading"
             @on-selection-change="sectionChange"
      >
        <template slot-scope="{ row, index }" slot="action">
          <a @click="showDetail(row.couponId)">查看详情</a>
          <a v-if="!show" style="margin-left: 10px;color: red;display: inline-block;" @click="deleteAction(row)">
            删除
          </a>
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
  import {postCouponList, getVendorList, deleteCoupon} from '@/api/api'
  import {CouponTable, userType} from '@/api/tableData'
  import  Vendor from '@/components/Vendor'

  export default {
    name: "MarketingCouponPage",
    components: {
      Vendor
    },
    data() {
      return {
        isAdmin: userType.platform,
        vendorId: '',
        vendorList: [],
        selectColumns: [],
        columns: [],
        list: [],
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        showLoading: false
      }
    },
    computed: {
      show(){
        let checked = localStorage.getItem('userType') == userType.platform
        return checked ? true : false
      }
    },
    mounted() {
      this.columns = CouponTable
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
        console.log('pageSize',page)
        this.getList()
      },
      vendorChangeCallback(val){
        console.log('厂家列表回调',val)
        this.vendorId = val
      },
      searchClick() {
        this.getList()
      },
      sectionChange(item) {
        console.log("section", item)
        let ids = []
        ids.push(item.map(item => item.couponId))
        console.log('ids',ids)
        this.selectColumns = ids.toString()
      },
      batchDelete() {
        //批量删除优惠券
        console.log("批量删除优惠券 selectColumns", this.selectColumns)
        if(this.selectColumns.length == 0){
          this.$Message.error('请先选择要删除的优惠券')
          return
        }
        this.cancelCoupon(this.selectColumns)
      },
      deleteAction(item) {
        //单个删除优惠券
        console.log("delete", item)
        this.cancelCoupon(item.couponId.toString())
      },
      showDetail(couponId) {
        console.log("show", couponId)
        this.$router.push({
          name: 'CouponDetail',
          params: {couponId: couponId}
        })
      },
      cancelCoupon(couponId){
        deleteCoupon({couponId:couponId}).then(res => {
          this.$Message.success('删除优惠券成功')
          this.getList()
        }).catch(err => {
          this.$Message.error('删除优惠券失败' + err)
        })
      },
      addCoupon() {
        this.$router.push({name: 'AddCoupon'})
      },
      getVendorList() {
        getVendorList('').then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
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
          vendorId: this.vendorId || localStorage.getItem('vendorId')
        }
        this.showLoading = true
        postCouponList(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
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
  .tej-coupon-list {
    background: white;
    margin-top: 10px;
    min-height: 85vh;
  }
  .tej-coupon-tilte {
    padding: 15px;
  }
</style>
