<template>
  <div style="background: white; min-height:600px; padding: 15px;">
    <div style="margin-bottom: 10px;">
      <span class="title_top">可用优惠商品</span>
      <Button icon="md-add" style="float: right;display: inline-block;" type="primary" @click="modal = true"> 添加商品</Button>
      <Modal class ="tej-modal" v-model="modal" :closable="false" :mask-closable="false" width = 80vw>
        <div v-if = "modal == true">
          <AddCouponProduct style = "padding: 10px;min-height: 500px;max-height: 800px;overflow: auto;"
                            @coupon-product-list-callback="couponProductListCallback"
                            :is-detail="isDetail"
          ></AddCouponProduct>
        </div>
        <div slot="footer" style="text-align: center;padding: 20px;">
          <Button class="b_style" @click="modalCancel">取消</Button>
          <Button class="b_style" style="color: white; background: #409EFF;margin-left: 25px;" @click="modalOk">确认
          </Button>
        </div>
      </Modal>
    </div>
    <Table border :columns="columns" :data="list" style="width: 100%;">
    </Table>
  </div>
</template>

<script>
  import { UsableCouponTable } from  '@/api/tableData'
  import AddCouponProduct from './AddCouponProduct'

  export default {
    name: 'CouponTable',
    components: {
      AddCouponProduct
    },
    props: {
      couponProductPage: Object,
      couponProductList: Array,
      isDetail: Boolean
    },
    data(){
      return {
        columns:[],
        list: [],
        ids: [],
        modal: false,
      }
    },
    mounted(){
      this.columns = UsableCouponTable
      this.list = this.couponProductList
    },
    methods: {
      couponProductListCallback(data){
        console.log('data',data)
        this.list = data.productList
        this.ids = data.productIdList
      },
      modalOk() {
        this.modal = false
        this.$emit('coupon-list-callback',this.ids)
      },
      modalCancel() {
        console.log('cancel')
        this.modal = false
      },
    }
  }
</script>

<style scoped>

</style>
