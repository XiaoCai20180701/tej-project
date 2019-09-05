<template>
  <div>
    <Row :gutter="15">
      <i-col span="6">
        <CouponInfo @coupon-info-callback="couponInfoCallback"></CouponInfo>
      </i-col>
      <i-col span="18">
        <CouponTable :coupon-product-list="couponProductList"
                     :coupon-product-page="couponProductPage"
                     :is-detail="isDetail"
                     @coupon-list-callback="couponListCallback"
        ></CouponTable>
      <div style="margin-top: 20px;background: white;height: 60px;padding: 15px;">
        <div style="width: 180px; height: 35px;margin: 0 auto;">
          <Button class="b_style" @click ="cancel" > 取消</Button>
          <Button class="b_style" style="color: white; background: #409EFF;margin-right: 0px; float: right;"
                  @click="success"> 确认
          </button>
        </div>
      </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import AddCouponProduct from './components/AddCouponProduct'
  import ICol from "../../../node_modules/iview/src/components/grid/col.vue"
  import CouponInfo from './components/CouponInfo'
  import CouponTable from  './components/CouponTable'
  import { postCouponProductList,postAddCoupon } from '@/api/api'

  export default {
    name: "AddCoupon",
    components:{
      ICol,
      AddCouponProduct,
      CouponInfo,
      CouponTable
    },
    data() {
      return {
        couponProductList: [],
        couponProductPage: {
          index: 1,
          size: 10,
          total: 10
        },
        info: {},
        ids: [],
        isDetail: false
      }
    },
    mounted() {
     // this.getList()
    },
    methods: {
      success(){
        //this.cancel()
        this.addCoupon()
      },
      couponInfoCallback(data){
        console.log('couponInfoCallback info!!!!!!!!!!',data)
        this.info = data
      },
      couponListCallback(data){
        console.log('couponListCallback',data)
        this.ids = data
      },
      getList(){
        let params = {
          page: this.couponProductPage.index,
          pageSize: this.couponProductPage.size,
        //  couponId:
        }
        postCouponProductList(params).then(res => {
          if(res.code != 200){
            this.$Message.error(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.couponProductList = res.data.list
          this.couponProductPage = {
            index: res.data.page,
            size: res.data.pageSize,
            total: res.data.total
          }
        }).catch(err => {
          this.$Message.error('获取优惠商品列表失败' + err)
        })
      },
      addCoupon(){
        let params = {
          vendorId: localStorage.getItem('vendorId'),
          ...this.info,
          productIds: this.ids
        }
        postAddCoupon(params).then(res => {
          if(res.code != 200){
            this.$Message.error(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('新增成功')
          this.$router.push('/MarketingCouponPage')
        }).catch(err => {
          this.$Message.error('新增优惠券失败' + err)
        })
      },
      cancel() {
        if (window.history.length <= 1) {
          this.$router.push({
            path: '/'
          })
          return false
        } else {
          this.$router.go(-1)
        }
      },
    }
  }
</script>

<style scoped>

</style>
