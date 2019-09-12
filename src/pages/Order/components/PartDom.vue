<template>
  <div class="tej-main">
    <Card class="tej-part-card">
      <p slot="title">
        <span>{{ people }}详情 </span>
        <span class="txt">{{txt}}名称：{{data.name}}</span>
        <span class="number">{{txt}}编号：{{id}}</span>
      </p>
      <p class="item">
        <span class="label">{{people}}：</span><span class="txt">{{data.contact}}</span>
      </p>
      <p class="item">
        <span class="label">{{people}}号码：</span><span class="txt">{{data.mobile}}</span>
      </p>
      <p class="item">
        <span class="label">{{people}}地址：</span><span class="txt">{{data.address}}</span>
      </p>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'PartDom',
    props: {
      people: {
        type: String
      },
      txt: {
        type: String
      },
      data: {
        type: Object
      },
      id: {
        type: Number | String
      }
    },
    mounted(){

    },
    data(){
      return {}
    }
  }
</script>

<style>
  .tej-part-card:first-child {
    margin-top: 0;
  }
  .tej-part-card {
    margin: 20px 0;
  }
.tej-part-card .ivu-card-head{
  background: rgb(243,247,250);
}
  .tej-part-card .ivu-card-head p {
    font-weight: normal;
  }
.tej-part-card .item {
  margin: 5px 0;
}
.tej-part-card .label {
  display: inline-block;
  width: 90px;
  margin-right: 10px;
  text-align: right;
}
  .tej-part-card .txt:first-child {
    margin-left: 15px;
  }
  .tej-part-card .number {
    float: right;
  }
</style>





