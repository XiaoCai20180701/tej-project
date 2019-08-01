<template>
  <div class="tej-order-detail-page">
    <Row>
      <Col span="24">
        <div class="tej-order-detail-box">
          <span>订单编号：{{orderDetail.orderId}}</span>
          <span>下单时间：{{orderDetail.orderTime}}</span>
          <span class="number">订单状态：<Tag color="success">{{orderDetail.orderType}}</Tag></span>
        </div>
      </Col>
    </Row>
    <Row :gutter="12">
      <Col span="13">
        <PartDom people="收件人"
                 txt="零售商"
                 :data="orderDetail.retailInfo"
                 :id="orderDetail.retailInfo.retailId"
        ></PartDom>
        <PartDom people="发件人"
                 txt="厂商"
                 :data="orderDetail.vendorInfo"
                 :id="orderDetail.vendorInfo.vendorId"
        ></PartDom>
      </Col>
      <Col span="11">
        <Card class="tej-part-card" style="min-height: 356px;">
          <p slot="title">物流详情</p>
          <p>暂无</p>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card class="tej-part-card">
          <p slot="title">购买商品列表</p>
          <div v-if="orderDetail.productInformationList.list.length == 0">
            暂无数据
          </div>
          <div v-for="(item, index) in orderDetail.productInformationList.list" :key="index" v-else>
            <ProductItem :data="item" total-align="left"></ProductItem>
          </div>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <div class="tej-order-detail-box clearfix">
        <span class="number">总计：{{price | money}}元</span>
        <span class="number">优惠：{{orderDetail.discount | money}}元</span>
        <span class="number">运费：{{orderDetail.orderLogisticsCost | money}}元</span>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import PartDom from './components/PartDom'
  import ProductItem from '@/components/ProductItem'
  import {postOrderDetail} from '@/api/api'

  export default {
    name: 'OrderDetailPage',
    components: {
      'PartDom': PartDom,
      'ProductItem': ProductItem
    },
    computed: {
      price(){
        let checked = this.orderDetail.hasOwnProperty('orderProductPrice')
        return checked ? this.orderDetail.orderProductPrice: this.orderDetail.orderPrice
      }
    },
    data() {
      return {
        orderDetail: {
          orderId: null,
          orderTime: null,
          orderType: null,
          retailInfo: {
            retailId: null
          },
          vendorInfo: {},
          productInformationList: {
            list: []
          },
          orderLogisticsCost: null,
          discount: null,
          orderProductPrice: null
        }
      }
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      getDetail() {
        let id = this.$route.params.orderId
        let page = this.$route.params.page
        let pageSize = this.$route.params.pageSize
        postOrderDetail({
          orderId: id,
          page: page,
          pageSize: pageSize
        }).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            return
          }
          this.orderDetail = res.data
          console.log('oder list', res)
        }).catch(err => {
          this.$Message.error('获取订单详情失败', err)
        })
      }
    }
  }
</script>

<style scoped>
  .tej-order-detail-page {
    padding: 15px;
    background: #fff;
  }
  .tej-order-detail-box {
    padding: 14px 16px;
    margin-bottom: 20px;
    background: rgb(243,247,250);
    border: 1px solid #e8eaec;
    border-radius: 4px;
    font-size: 14px;
    color: #17233d;
  }
  .tej-order-detail-box .number {
    float: right;
  }
  .tej-order-detail-box .number + .number {
    margin: 0 40px;
  }
  .tej-order-detail-box span + span {
    margin-left: 15px;
  }
</style>


