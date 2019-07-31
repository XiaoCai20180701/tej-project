<template>
  <div class="tej-order-item-expand">
    <div class="left">
      <ProductItem v-for="(item, index) in row.productInformationList"
                   :key="index"
                   :data="item"
                   total-align="right"
      >
      </ProductItem>
    </div>
    <div class="right">
      <p><span class="label">运费：</span><span>{{row.orderLogisticsCost | money}}元</span> </p>
      <p><span class="label">优惠券：</span><span>{{row.discount | money}} 元</span></p>
      <p><span class="label">总计：</span><span>{{price | money}}元</span></p>
    </div>
  </div>
</template>

<script>
  import ProductItem from '@/components/ProductItem'

  export default {
    name: 'OrderItem',
    components: {
      'ProductItem': ProductItem
    },
    props: {
      row: Object
    },
    computed:{
      price(){
        let checked = this.row.hasOwnProperty('orderProductPrice')
        return  checked ? this.row.orderProductPrice: this.row.orderPrice
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style>
  .expand-row {
    margin-bottom: 16px;
  }
  .tej-order-item-expand {
    display: table;
    width: 100%;
  }
  .tej-order-item-expand .left{
    display: table-cell;
    width: 80%;
    border-right: 1px solid #e8eaec;
  }
  .tej-order-item-expand .right{
    display: table-cell;
    width: 20%;
    vertical-align: middle;
  }
  .tej-order-item-expand .right .label {
    display: inline-block;
    width: 80px;
    margin: 6px;
    text-align: right;
  }
  td.ivu-table-expanded-cell {
    background: #fff;
  }
</style>


