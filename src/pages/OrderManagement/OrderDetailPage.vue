<template>
  <div class="tej-order-detail-page">
    <Row>
      <i-col span="24">
        <div class="tej-order-detail-box">
          <span><span v-if="showCard">原</span>订单编号：{{orderDetail.orderId}}</span>
          <span>下单时间：{{orderDetail.orderTime}}</span>
          <Button class="number"
                  @click="printClick(orderDetail)"
                  type="primary">
            <Icon custom="iconfont icon-dayin"></Icon>
            打印
          </Button>
          <span class="number">订单状态：<Tag color="success">{{orderDetail.orderTypeName}}</Tag></span>
        </div>
      </i-col>
    </Row>
    <Row :gutter="12">
      <i-col span="13">
        <PartDom people="收件人"
                 txt="商家"
                 :data="orderDetail.retailInfo"
                 :id="orderDetail.retailInfo.retailId"
        ></PartDom>
        <PartDom people="发件人"
                 txt="厂家"
                 :data="orderDetail.vendorInfo"
                 :id="orderDetail.vendorInfo.vendorId"
                 v-if="!showCard"
        ></PartDom>
        <!-- 厂家操作版，退换货时，显示-->
        <Card class="tej-part-card" v-if="showCard">
          <div slot="title" class="clearfix">
            <span class="return-title">退货申请</span>
            <Button type="primary"
                    class="return-btn"
                    @click="returnBtnClick"
                    v-if="orderDetail.orderType == 5"
            >同意退货</Button>
          </div>
          <div class="tej-return-content">
            <span class="label">退货理由：</span>
            <span>{{orderDetail.reason}}</span>
          </div>
        </Card>
      </i-col>
      <i-col span="11">
        <Card class="tej-part-card tej-logistics-info">
          <p slot="title">物流详情</p>
          <TejTimeline :list="orderDetail.logisticsInfo.result"></TejTimeline>
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col span="24">
        <Card class="tej-part-card">
          <p slot="title">购买商品列表</p>
          <div v-if="orderDetail.productInformationList.list.length == 0">
            暂无数据
          </div>
          <div v-for="(item, index) in orderDetail.productInformationList.list" :key="index" v-else>
            <ProductItem :data="item" total-align="left"></ProductItem>
          </div>
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col span="24">
        <div class="tej-order-detail-box clearfix">
          <div v-if="orderDetail.orderType == 6">原订单编号：{{orderDetail.orderId}} <Button type="primary" class="number">确认收到退货</Button></div>
          <div v-else>
            <span v-if="showPayType(orderDetail.orderType)">支付方式：{{payType(orderDetail.payType)}}</span>
            <span class="number">总计：{{price | money}}元</span>
            <span class="number">优惠：{{orderDetail.discount | money}}元</span>
            <span class="number">运费：{{orderDetail.orderLogisticsCost | money}}元</span>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import PartDom from './components/PartDom'
  import ProductItem from '@/components/ProductItem'
  import {postOrderDetail, putUpdateOrder} from '@/api/api'
  import {payType, userType,orderType} from '@/api/tableData'
  import TejTimeline from '@/components/TejTimeline'

  export default {
    name: 'OrderDetailPage',
    components: {
      'PartDom': PartDom,
      'ProductItem': ProductItem,
      'TejTimeline': TejTimeline
    },
    computed: {
      price() {
        let checked = this.orderDetail.hasOwnProperty('orderProductPrice')
        return checked ? this.orderDetail.orderProductPrice : this.orderDetail.orderPrice
      },
      showPayType() {
        return function (type) {
          return type == '待付款' ? false : true
        }
      },
      payType() {
        return function (type) {
          return payType[type]
        }
      },
      showCard(){
        let checked = localStorage.getItem('userType') == userType.vendor && this.orderDetail.orderType == orderType.afterProcessing || this.orderDetail.orderType == orderType.agreeReturn
        return checked ? true : false
      }
    },
    data() {
      return {
        showLoading: false,
        orderDetail: {
          orderId: null,
          orderTime: null,
          orderType: null,
          orderTypeName: '',
          payType: null,
          retailInfo: {
            retailId: null
          },
          reason: '',
          vendorInfo: {},
          productInformationList: {
            list: []
          },
          orderLogisticsCost: null,
          discount: null,
          orderProductPrice: null,
          logisticsInfo: {}
        },
      }
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      returnBtnClick(){
        let id = this.$route.params.orderId
        this.$Modal.success({
          title: '已同意商家的退货申请',
          content: '等待商家填写物流信息',
          onOk: () => {
            this.updateOrder(id)
          },
        })
      },
      updateOrder(orderId){
        let params = {
          orderId: orderId,
          orderType: orderType.agreeReturn  //同意退货，状态值传6
        }
        putUpdateOrder(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('修改成功')
          this.getDetail()
        }).catch(err => {
          this.$Message.error('修改失败')
        })
      },
      printClick(orderDetail) {
        console.log('orderDetail', orderDetail)
        const {href} = this.$router.resolve({
          name: "OrderPrintPage",
          params: {
            orderDetail: JSON.stringify(orderDetail)
          }
        });
        window.open(href, '_blank')
      },
      getDetail() {
        this.showLoading = true
        let id = this.$route.params.orderId
        let page = this.$route.params.page
        let pageSize = this.$route.params.pageSize
        postOrderDetail({
          orderId: id,
          page: page,
          pageSize: pageSize
        }).then(res => {
          this.showLoading = false
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.orderDetail = res.data
          console.log('oder list', res)
        }).catch(err => {
          this.showLoading = false
          this.$Message.error('获取订单详情失败', err)
        })
      }
    }
  }
</script>

<style >
  .tej-order-detail-page {
    padding: 15px;
    background: #fff;
  }

  .tej-order-detail-box {
    padding: 14px 16px;
    margin-bottom: 20px;
    background: rgb(243, 247, 250);
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

  .tej-return-content {
    display: table;
    word-wrap: break-word;
    word-break: break-all;
  }

  .tej-return-content .label {
    display: table-cell;
  }

  .tej-return-content .label + span {
    display: table-cell;
    padding-left: 15px;
  }

  .tej-part-card .return-btn {
    float: right;
  }

  .tej-part-card .return-title {
    float: left;
    padding: 8px 0;
  }

  .tej-logistics-info .ivu-card-body{
    height: 305px;
    overflow: auto;
  }
</style>


