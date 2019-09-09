<template>
  <div>
    <Row :gutter="15">
      <i-col span="6">
        <CouponInfo :is-detail="isDetail"
                    :coupon-info="couponInfo"
        ></CouponInfo>
      </i-col>
      <i-col span="18">
        <div style="background: white; padding: 15px;">
            <span class="title_top">可用优惠商品</span>
            <Button icon="md-add" style="float: right;display: inline-block;" type="primary" @click="modal = true" v-if="isAdmin != 1">
              继续添加商品</Button>
            <Modal class="tej-modal" v-model="modal" :closable="false" :mask-closable="false" width=80vw>
              <div v-if="modal == true">
                <AddCouponProduct style="padding: 10px;min-height: 500px;max-height: 800px;overflow: auto;"
                                  :is-detail="true"
                                  :coupon-id="couponInfo.couponId"
                                  @coupon-product-list-callback="couponProductListCallback"
                ></AddCouponProduct>
              </div>
              <div slot="footer" style="text-align: center;padding: 20px;">
                <Button class="b_style" @click="modalCancel">取消</Button>
                <Button class="b_style" style="color: white; background: #409EFF;margin-left: 25px;" @click="modalOk">确认
                </Button>
              </div>
            </Modal>
          </div>
          <div style="width: 100%;">
            <Table border :columns="columns" :data="list" >
            </Table>
          </div>
      </i-col>
    </Row>

  </div>
</template>

<script>
  import AddCouponProduct from './components/AddCouponProduct'
  import CouponInfo from './components/CouponInfo'
  import { userType, CouponDetailTable } from '@/api/tableData'
  import { postCouponDetails, postCouponRelation } from '@/api/api'

  export default {
    name: "CouponDetail",
    components: {
      AddCouponProduct,
      CouponInfo
    },
    data() {
      return {
        isAdmin: userType.platform,
        modal: false,
        status: 1,
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        columns: [],
        list: [],
        couponInfo: {},  //优惠券基本信息
        style: '',
        isDetail: true,
        productIds: []
      }
    },
    computed: {
      getStatusStyle(){
        return function(val){
          let checked = val === '已到期'
          return checked ? 'color:red': 'color:#00A73C'
        }
      }
    },
    mounted() {
      this.columns = CouponDetailTable
      this.getCouponDetail()
    },
    methods: {
      couponProductListCallback(data){
        console.log('关联优惠券',data)
        this.productIds = data.productIdList
      },
      modalOk() {
        //优惠券没有更改，那么只关闭弹窗；有更改时，才调用关联优惠券接口
        if(this.productIds.length == 0){
          this.modal = false
        }else {
          this.couponRelationSumbit(this.productIds)
        }
      },
      modalCancel() {
        console.log('cancel')
        this.modal = false
      },
      couponRelationSumbit(productIds){
        let params = {
          couponId: this.couponInfo.couponId,
          productIds: productIds
        }
        postCouponRelation(params).then(res => {
          if(res.code != 200){
            this.$Message.error(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.modal = false
          this.getCouponDetail()
        }).catch(err => {
          this.$Message.error('关联优惠券失败' + err)
        })
      },
      getCouponDetail(){
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          couponId: this.$route.params.couponId || this.couponInfo.couponId
        }
        postCouponDetails(params).then(res => {
          if(res.code != 200){
            this.$Message.error(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.list = data.productInfo.list
          this.couponInfo = data.couponInfo
        }).catch(err => {
          this.$Message.error('获取优惠券详情失败' + err)
        })
      }
    }
  }
</script>

<style scoped>
  .title_top {
    /*  border-left: 2.5px solid #1890FF;
  padding-left: 5px; */
    font-size: 15px;
    display: inline-block;
    line-height: 32px;
    height: 32px;
  }

  .title_top:before {
    content: "";
    border-left: 2.5px solid #1890FF;
    padding-left: 5px;
  }
</style>
