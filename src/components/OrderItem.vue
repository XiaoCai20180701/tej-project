<template>
  <div class="tej-order-item">
    <Card>
      <div slot="title" class="tej-order-title">
        <div class="item"><p>已发货：</p><p>2019年6月26日</p></div>
        <div class="item"><p>订单编号：</p><p>2019年6月26日</p></div>
        <div class="item"><p>发货至：</p><p>2019年6月26日</p></div>
        <div class="item"><p>送货至：</p><p>2019年6月26日</p></div>
        <div class="item"><a>查看订单详情</a></div>
      </div>
      <div>dddd</div>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'OrderItem',
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {}
    }
  }
</script>

<style>
  .tej-order-item .ivu-card-head{
    background: rgb(243,247,250);
  }
  .tej-order-title {
    display: flex;
  }
  .tej-order-title p{
    font-weight: normal;
  }
  .tej-order-title .item {
    flex: 1;
  }
  .tej-order-title .item:last-child {
    flex: 2;
    line-height: 44px;
    text-align: right;
  }
</style>



