<template>
  <div class="tej-vendor-baseinfo">
    <div class="avatar"
         style="background-image: url('http://b-ssl.duitang.com/uploads/item/201801/04/20180104151926_TH2xE.jpeg')"></div>
    <h2 class="title">{{detailData.name}}</h2>
    <div>
      <p class="item"><span class="label">厂商编号：</span><span>{{detailData.vendorId}}</span></p>
      <p class="item"><span class="label">联系人：</span><span>{{detailData.contact}}</span></p>
      <p class="item"><span class="label">联系号码：</span><span>{{detailData.mobile}}</span></p>
      <p class="item"><span class="label">联系地址：</span><span class="address">{{detailData.address}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseInfo',
    props: {
      detailData: {
        type: Object
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .tej-vendor-baseinfo {
    padding: 12px 12px 60px;
    background: #fff;
  }

  .tej-vendor-baseinfo .avatar {
    width: 250px;
    height: 250px;
    margin: 12px auto;
    background-size: cover;
  }

  .tej-vendor-baseinfo .title {
    margin: 25px 0 29px;
    text-align: center;
  }

  .tej-vendor-baseinfo .item {
    margin: 10px 0;
    font-size: 14px;
  }

  .tej-vendor-baseinfo .label {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
    text-align: right;
  }

  .tej-vendor-baseinfo .address {
    float: left;
    margin-left: 90px;
    margin-top: -21px;
  }
</style>
