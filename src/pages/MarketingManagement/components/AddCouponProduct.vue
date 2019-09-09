<template>
  <div>
    <TejTable :columns-data="columns"
              :table-data="list"
              :page="page"
              :showLoading="showLoading"
              @page-change-callback='pageChangeCallback'
              @pageSize-change-callback='pageSizeChangeCallback'
    >
      <div slot="form">
        <div slot="search">
          <div class="tej-table-search-box">
            <Input v-model="keywords" placeholder="请输入商品名称或编号" class="tej-search-input" clearable
                   @on-change="inputChange"/>
            <Button type="primary" class="tej-search-btn" @click="searchClick(keywords)">搜索</Button>
          </div>
        </div>
      </div>
      <template slot-scope="{ row, index }" slot="action-btn">
        <Tag :color="tagColor(row.status)" style="margin-right: 5px">{{tagText(row.status)}}</Tag>
        <a style="margin-right: 5px" @click="addProduct(row)" v-if="row.status == 0">点击添加</a>
        <a @click="cancelProduct(row)" v-else>点击取消</a>
      </template>
    </TejTable>
  </div>
</template>

<script>
  import TejTable from '@/components/TejTable'
  import {postProductList, filterCouponProguctList} from '@/api/api'
  import {UsableCouponProductTable, addStatus, activityType} from '@/api/tableData'

  export default {
    name: "AddCouponProduct",
    components: {
      TejTable: TejTable
    },
    props: {
      isDetail: Boolean,
      productArray: Array,
      couponId: {
        type: Number,
        required: false
      }
    },
    data() {
      return {
        formInline: {
          discount: '',
          startTime: '',
          endTime: '',
          shareStatus: '0',
          discountThreshold: ''
        },
        discountList: [
          {
            value: '2',
            label: '2'
          },
          {
            value: '4',
            label: '4'
          },
          {
            value: '6',
            label: '6'
          },
          {
            value: '8',
            label: '8'
          }
        ],
        page: {
          index: 1,
          size: 10
        },
        showLoading: false,
        keywords: '',
        columns: [],
        list: [],
        productList: [],
        productIdList: [],
        rowClassNameIndex: 0
      }
    },
    computed: {
      tagText() {
        return function (status) {
          return status == addStatus.notAdded ? '未添加' : '已添加'
        }
      },
      tagColor() {
        return function (status) {
          return status == addStatus.notAdded ? 'orange' : 'magenta'
        }
      },
      clickText() {
        return function (status) {
          return status == addStatus.notAdded ? '点击添加' : '点击取消'
        }
      }
    },
    mounted() {
      this.columns = UsableCouponProductTable
      this.getList()
    },
    methods: {
      addProduct(row) {
        console.log('productId', row.productId)
        this.getCouponList(row)
      },
      getCouponList(row) {
        row.status = 1
        this.productIdList.push(row.productId)
        this.productList.push({
          productId: row.productId,
          productName: row.productName,
          inventory: row.inventory,
          saleNum: 0,
          useNum: 0
        })
        console.log('this.productList', this.productList)
        this.$emit('coupon-product-list-callback', {
          productIdList: this.productIdList,
          productList: this.productList
        })
      },
      getDiscountList(row) {
        this.productIdList.push(row.productId)
        this.$emit('discount-product-list-callback', {
          productIdList: this.productIdList,
          discountInfo: this.formInline,
        })
      },
      cancelProduct(row) {
        this.cancelCouponList(row)
      },
      cancelCouponList(row) {
        row.status = 0
        this.productIdList.splice(this.productIdList.findIndex(item => item.productId === row.productId), 1)
        this.productList.splice(this.productList.findIndex(item => item.productId === row.productId), 1)
        console.log('this.productIdList 删除后', this.productIdList)
        console.log('this.productList 删除后', this.productList)
        this.$emit('coupon-product-list-callback', {
          productIdList: this.productIdList,
          productList: this.productList
        })
      },
      pageChangeCallback(page) {
        console.log('page callback', page)
      },
      pageSizeChangeCallback(pagesize) {
        console.log('pagesize callback', pagesize)
      },
      inputChange(e) {
        console.log('eeeeeeeeeeeee', e.target.value)
      },
      startTimeChange(date) {
        this.formInline.startTime = date
      },
      endTimeChange(date) {
        this.formInline.endTime = date
      },
      couponActionCallback(row) {
        console.log('eeeeeeeeeeeee', row.status)
        if (row.status == 1) {
          console.log('已添加- 取消添加操作')
        } else {
          console.log('未添加- 添加操作')
        }
      },
      searchClick(keywords) {
        console.log('搜索')
        this.keywords = keywords
        this.getList()
      },
      getList() {
        this.isDetail ? this.getDetailList() : this.getAddList()
      },
      getAddList(){
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          vendorId: sessionStorage.getItem('vendorId'),
          type: activityType.coupon,
          keywords: this.keywords
        }
        postProductList(params).then(res => {
          if (res.code != 200) {
            this.$Message.error(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.list = res.data.list
          this.page = {
            index: res.data.page,
            size: res.data.pageSize,
            total: res.data.total
          }
        }).catch(err => {
          this.$Message.error('获取商品列表失败' + err)
        })
      },
      getDetailList(){
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          vendorId: sessionStorage.getItem('vendorId'),
          couponId: this.couponId,
          type: activityType.coupon,
          keywords: this.keywords
        }
        filterCouponProguctList(params).then(res => {
          if (res.code != 200) {
            this.$Message.error(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.list = res.data.list
          this.page = {
            index: res.data.page,
            size: res.data.pageSize,
            total: res.data.total
          }
        }).catch(err => {
          this.$Message.error('获取已过滤商品列表失败' + err)
        })
      }
    }

  }
</script>

<style>
</style>
