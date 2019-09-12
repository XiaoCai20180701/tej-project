<template>
  <div id="printMe">
    <h1 class="title">童 E 家</h1>
    <a class="text" v-print="'#printMe'">打印此页</a>
    <div class="content">
      <p><b>订单编号：{{orderDetail.orderId}}</b></p>
      <p><b>订单总额：{{orderDetail.orderPrice | money}}元</b></p>
      <div style="margin-top: 38px;">
        <p class="date"><b>{{orderDetail.orderTypeName}}</b> 2019年6月25日 13:33:33</p>
        <div class="product-list">
          <div v-for="(item, index) in orderDetail.productInformationList.list" :key="index" style="margin-bottom: 38px">
            <p>{{item.productName}}</p>
            <div class="list">
              <div class="left">
                <span v-for="(a,num) in item.productTypeList" :key="num">
                  <b>{{a.color}} {{a.number}} 全码</b>
                </span>
                <!--<div v-for="(e,n) in evenlist(item.productTypeList)" :key="n">-->
                  <!--<b>{{e.color}} {{e.number}} 全码</b>-->
                <!--</div>-->
              </div>
              <div class="right">
                <p><b>总计：{{item.totalNumber}}件</b></p>
                <p><b>总价：{{item.totalPrice | money}}元</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <p><b><span class="label">收件人：</span>{{orderDetail.retailInfo.contact}}</b></p>
        <p><b><span class="label">收件人号码：</span>{{orderDetail.retailInfo.mobile}}</b></p>
        <p><b><span class="label">收件人地址：</span>{{orderDetail.retailInfo.address}}</b></p>
      </div>
      <div>
        <p class="date"><b>{{orderDetail.orderTypeName}}</b> 2019年6月25日 13:33:33</p>
        <div class="item">
          <div v-if="showPayType(orderDetail.orderType)" class="left">
            <b class="label">支付方式：</b>{{payType(orderDetail.payType)}}
          </div>
          <div class="right">
            <p><b>运费：{{orderDetail.orderLogisticsCost}}元</b></p>
            <p><b>优惠：{{orderDetail.discount}}元</b></p>
            <p><b>总计：{{orderDetail.orderPrice}}元</b></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {payType} from '@/api/tableData'
  import ProductItem from '@/components/ProductItem'

  export default {
    name: 'OrderPrintPage',
    components: {
      ProductItem
    },
    data() {
      return {
        orderDetail: {},
//        list:[
//          {
//            color: "红色",
//            number: 18
//          },
//          {
//            color: "蓝色",
//            number: 22
//          },
//          {
//            color: "黑色",
//            number: 18
//          },
//          {
//            color: "黄色",
//            number: 22
//          },
//          {
//            color: "绿色",
//            number: 18
//          },
//        ],
//        oddList: []
      }
    },
    computed: {
      showPayType() {
        return function (type) {
          return type == '未付款' ? false : true
        }
      },
      payType() {
        return function (type) {
          return payType[type]
        }
      }
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      even(list){
        return list.filter((i,v)=> i%2 === 0)
      },
      getDetail() {
        let detail = this.$route.params.orderDetail
        this.orderDetail = JSON.parse(detail)
      }
    }
  }
</script>

<style scoped>
  #printMe .title {
    margin-top: 34px;
    font-size: 60px;
    text-align: center;
  }

  #printMe .text {
    display: block;
    text-align: center;
  }

  #printMe .content {
    width: 1140px;
    margin: 50px auto;
    font-size: 14px;
  }

  #printMe .date {
    padding: 8px;
    border: 3px solid #2a2a2a;
    text-align: center;
  }

  #printMe .item {
    padding: 22px 80px;
    margin: 8px 0;
    border: 3px solid #2a2a2a;
  }
  #printMe .item:last-child{
    margin-top: 0;
    margin-bottom: 0;
    border-top: none;
  }
  #printMe .item:last-child, #printMe .list {
    display: table;
    width: 100%;
  }

  #printMe .item:last-child .left, #printMe .list .left {
    display: table-cell;
    vertical-align: middle;
  }

  #printMe .item:last-child .right, #printMe .list .right {
    display: table-cell;
    vertical-align: middle;
    width: 100px;
  }

  #printMe .product-list {
    padding: 22px 80px;
    border: 3px solid #2a2a2a;
    border-top: none;
  }

  #printMe .label {
    display: inline-block;
    width: 84px;
    text-align: right;
  }

</style>
