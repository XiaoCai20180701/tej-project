<template>
  <div class="tej-product-item">
    <div class="picture">
      <div class="img" style="background-image: url('http://b-ssl.duitang.com/uploads/item/201805/13/20180513224039_tgfwu.png')"></div>
    </div>
    <div class="product" :style="getProductStyle()">
      <h4 class="title">{{data.productName}}</h4>
      <div v-if="totalAlign == 'left'">
        <p>总计：{{data.totalNumber}}件</p>
        <p>总价：{{data.totalPrice | money}}元</p>
      </div>
    </div>
    <div class="info">
      <p v-for="(item, index) in data.productTypeList" :key="index">
        <span>{{item.color}}</span> <span>全码</span> <span>{{item.number}}件</span>
      </p>
    </div>
    <div class="total" v-if="totalAlign == 'right'" :style="getTotalStyle()">
      <span>总计：{{data.totalNumber}}件</span>
      <span>总价：{{data.totalPrice? data.totalPrice: data.productPrice | money}}元</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductItem',
    props: {
      data: {
        type: Object
      },
      totalAlign: {
        type: String
      },
    },
    data() {
      return {}
    },
    computed:{
    },
    methods: {
      getProductStyle(){
        if(this.totalAlign == 'left'){
          return 'width: 70%'
        }else {
          return 'width: 40%'
        }
      },
      getTotalStyle(){
        if(this.totalAlign == 'left'){
          return 'width: 20%'
        }else {
          return 'width: auto'
        }
      }
    }
  }
</script>

<style scoped>
  .tej-product-item {
    display: table;
    width: 100%;
    margin: 10px 0;
  }

  .tej-product-item .picture {
    width: 88px;
    padding: 6px;
    border: 1px solid #e8eaec;
    border-radius: 4px;
  }
  .tej-product-item .img {
    vertical-align: middle;
    /*display: table-cell;*/
    width: 76px;
    height: 76px;
    background-size: cover;
  }

  .tej-product-item .product {
    vertical-align: middle;
    display: table-cell;
    width: 40%;
  }

  .tej-product-item .info {
    vertical-align: middle;
    display: table-cell;
    width: 20%;
  }
  .tej-product-item .total {
    vertical-align: middle;
    display: table-cell;
    width: 30%;
  }
  .tej-product-item .total span + span {
    margin-left: 20px;
  }
</style>
