<template>
  <div class="data-info">
    <div class="left">
      <dl>
        <dt>- 销售数据</dt>
        <dd>日销售量：{{data.salesDayVendor}}件</dd>
        <dd>周销售量：{{data.salesWeekVendor}}件</dd>
        <dd>月销售量：{{data.salesMonthVendor}}件</dd>
      </dl>
    </div>
    <div class="right">
      <dl>
        <dt>- 访问数据</dt>
        <dd>日访问量：{{data.trafficDayVendor}}件</dd>
        <dd>周访问量：{{data.trafficWeekVendor}}件</dd>
        <dd>月访问量：{{data.trafficMonthVendor}}件</dd>
      </dl>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DataInfo',
    props: {
      data: Object
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .data-info {
    display: flex;
    padding: 12px;
    background: #fff;
    font-size: 14px;
  }

  .data-info .left {
    flex: 1;
  }

  .data-info dd {
    margin: 10px 0 10px 38px;
  }

  .data-info .right {
    flex: 1;
  }
</style>
