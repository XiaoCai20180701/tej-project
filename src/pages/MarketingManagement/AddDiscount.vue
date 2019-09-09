<template>
  <div>
    <div class="tej-discount-form" >
      <!--<DiscountForm @discount-form-callback="discountFormCallback"></DiscountForm>-->
      <DiscountForm></DiscountForm>
    </div>

    <DiscountTable :discount-product-list="list"
                   :discount-product-page="page"
                   @discount-product-list-callback="discountProductListCallback"
    ></DiscountTable>

    <div style="margin-top: 20px;background: white;height: 60px;padding: 15px;">
      <div style="width: 180px; height: 35px;margin: 0 auto;">
        <Button class="b_style"  > 取消</Button>
        <Button class="b_style" style="color: white; background: #409EFF;margin-right: 0px; float: right;"
                @click="ok"
               > 确认
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import TejTable from '@/components/TejTable'
  import DiscountForm from './components/DiscountForm'
  import DiscountTable from './components/DiscountTable'
  import {postProductList, postAddDiscount} from '@/api/api'
  import {activityType} from '@/api/tableData'
  import bus from '@/utils/bus'

  export default {
    name: "AddDiscount",
    components: {
      TejTable,
      DiscountForm,
      DiscountTable
    },
    props: {
      productArray: Array
    },
    data() {
      return {
        list: [],
        page: {
          index: 1,
          size: 10
        },
        addIds: [],
        editIds: [],
        productIdList: [],
        rowClassNameIndex: 0,
        type: ''
      }
    },
    mounted() {
      this.getList()
      this.discountFormCallback()
    },
    methods: {
      discountFormCallback(){
        bus.$on('discount-form-callback',(data)=>{
          console.log('新增折扣表单',data)
          this.discountInfo = data
        })
      },
      discountProductListCallback(data){
        this.type = data.type
        if(data.type == 'add'){
          this.addIds = data.productIdList
        }else {
          this.editIds = data.productIdList
        }
        console.log('addIds',this.addIds)
      },
      ok(){
        this.discountSubmit()
      },
      discountSubmit(){
        let ids = {}
        if(this.type == 'add'){
          ids = {addIds: this.addIds}
        }else {
          ids = {editIds: this.editIds}
        }
        let params = {
          discountInfo: this.discountInfo,
          ...ids
        }
        postAddDiscount(params).then(res => {
          if (res.code != 200) {
            this.$Message.error(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let msg = this.type == 'add' ? '新增折扣成功' : '修改折扣成功'
          this.$Message.success(msg)
          this.$router.push({name: 'MarketingDiscountPage'})
        }).catch(err => {
          this.$Message.error('新增折扣失败' + err)
        })
      },
//      addProduct(type, row) {
//        console.log('productId', row.productId)
//        type == 'coupon' ? this.getCouponList(row) : this.getDiscountList(row)
//      },
//      getDiscountList(row) {
//        this.productIdList.push(row.productId)
//        this.$emit('discount-product-list-callback', {
//          productIdList: this.productIdList,
//          discountInfo: this.formInline,
//        })
//      },
//      cancelProduct(row){
//        this.cancelDiscountList(row)
//      },
//      cancelCouponList(row){
//        row.status = 0
//        this.productIdList.splice(this.productIdList.findIndex(item => item.productId === row.productId), 1)
//        this.productList.splice(this.productList.findIndex(item => item.productId === row.productId),1)
//        console.log('this.productIdList 删除后', this.productIdList)
//        console.log('this.productList 删除后', this.productList)
//        this.$emit('coupon-product-list-callback', {
//          productIdList: this.productIdList,
//          productList: this.productList
//        })
//      },
//      cancelDiscountList(row){
//
//      },
      pageChangeCallback(page) {
        console.log('page callback', page)
      },
      pageSizeChangeCallback(pagesize) {
        console.log('pagesize callback', pagesize)
      },
      getList() {
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          vendorId: sessionStorage.getItem('vendorId'),
          type: activityType.discount,
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
      }
    }

  }
</script>

<style>
  .tej-discount-form {
    background: white;
    height: 120px;
    margin-top: 10px;
    padding: 15px;
  }
</style>


