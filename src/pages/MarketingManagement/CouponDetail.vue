<template>
  <div>
      <div style="background: white; padding: 15px;">
        <p class="title_top">优惠劵基本信息</p>
        <Row style="margin-top: 25px;">
          <Form :label-width="120">
            <i-col :xs="12" :sm="12" :md="6" :lg="6">
              <FormItem label="发行商家：" >
                <p>{{couponInfo.vendorName}}</p>
              </FormItem>
            </i-col>
            <i-col :xs="12" :sm="12" :md="6" :lg="6">
              <FormItem label="优惠劵名称：" >
                <p>{{couponInfo.couponName}}</p>
              </FormItem>
            </i-col>
            <i-col :xs="12" :sm="12" :md="6" :lg="6">
              <FormItem label="优惠折扣：" style="width: 100%">
                <span>满</span><span style="color: orangered;">{{couponInfo.couponThreshold}}元</span>
                <span>减</span><span style="color: orangered;">{{couponInfo.couponPrice}}元</span>
              </FormItem>
            </i-col>
            <i-col :xs="12" :sm="12" :md="6" :lg="6">
              <FormItem label="发放数量：" >
                <p>{{couponInfo.number}}张</p>
              </FormItem>
            </i-col>
            <i-col :xs="12" :sm="12" :md="6" :lg="6">
              <FormItem label="领取数量：" >
                <p>{{couponInfo.receiveNum}}张</p>
              </FormItem>
            </i-col>
            <i-col :xs="12" :sm="12" :md="6" :lg="6">
              <FormItem label="已使用数量：">
                <p>{{couponInfo.useNum}}张</p>
              </FormItem>
            </i-col>
            <i-col :xs="12" :sm="12" :md="6" :lg="6">
              <FormItem label="使用期限：" >
                <p><span>{{couponInfo.startTime}}</span> - <span>{{couponInfo.endTime}}</span></p>
              </FormItem>
            </i-col>
            <i-col :xs="12" :sm="12" :md="6" :lg="6">
              <FormItem label="优惠劵状态：">
                <p :style="getStatusStyle(couponInfo.status)">{{couponInfo.status}}</p>
              </FormItem>
            </i-col>
          </Form>
        </Row>
      </div>
      <div style="background: white; padding: 15px;margin-top: 20px;">
        <div style="margin-top: 20px;">
          <span class="title_top">可用优惠商品</span>
          <Button icon="md-add" style="float: right;display: inline-block;" type="primary" @click="modal = true" v-if="isAdmin != 1">
            继续添加商品</Button>
          <Modal class="tej-modal" v-model="modal" :closable="false" :mask-closable="false" width=80vw>
            <div v-if="modal == true">
              <AddCouponProduct style="padding: 10px;min-height: 500px;max-height: 800px;overflow: auto;"></AddCouponProduct>
            </div>
            <div slot="footer" style="text-align: center;padding: 20px;">
              <Button class="b_style" @click="modalCancel">取消</Button>
              <Button class="b_style" style="color: white; background: #409EFF;margin-left: 25px;" @click="modalOk">确认
              </Button>
            </div>
          </Modal>
        </div>
        <div style="width: 100%;">
          <Table border :columns="columns" :data="data" >
        </Table>
        </div>
      </div>
  </div>
</template>

<script>
  import AddCouponProduct from './AddCouponProduct'
  import { StytemRole, CouponDetailTable } from '@/api/tableData'
  import { postCouponDetails } from '@/api/api'

  export default {
    name: "CouponDetail",
    components: {
      AddCouponProduct
    },
    data() {
      return {
        isAdmin: StytemRole.back,
        modal: false,
        status: 1,
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        columns: [],
        data: [],
        couponInfo: {},  //优惠券基本信息
        style: ''
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
      modalOk() {
        // console.log('ok value', this.value)
        this.modal = false
      },
      modalCancel() {
        console.log('cancel')
        this.modal = false
      },
      getCouponDetail(){
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          couponId: this.$route.params.couponId
        }
        postCouponDetails(params).then(res => {
          let data = res.data
          this.data = data.productInfo.list
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
