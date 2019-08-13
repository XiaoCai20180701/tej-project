<template>
  <div>
    <div class="tej-vendor-baseinfo">
      <div class="avatar"
           style="background-image: url('http://b-ssl.duitang.com/uploads/item/201801/04/20180104151926_TH2xE.jpeg')"></div>
      <h2 class="title">{{detailData.name}}</h2>
      <div>
        <p class="item">
          <span class="label">{{detailData.vendorId ? '厂商' : '商家'}}编号：</span>
          <span>{{detailData.vendorId ? detailData.vendorId : detailData.retailId}}</span>
        </p>
        <p class="item"><span class="label">联系人：</span><span>{{detailData.contact}}</span></p>
        <p class="item"><span class="label">联系号码：</span><span>{{detailData.mobile}}</span></p>
        <p class="item"><span class="label">联系地址：</span><span>{{detailData.address}}</span>
        </p>
      </div>
    </div>
    <div class="tej-bill-box">
      <p class="item">
        <span class="label">账户余额：</span><span>{{detailData.balance}}元</span>
      </p>
      <p class="item" v-if="!isVendor">
        <span class="label">积分余额：</span><span>{{detailData.balanceIntegration}}点</span>
      </p>
      <div class="btn">
        <Button type="primary" @click="modal = true">
          {{isVendor ? '厂商' : '商家'}}账单
        </Button>
      </div>
      <Modal v-model="modal"
             class="tej-modal"
             width="820"
             :closable="false"
             :mask-closable="false"
      >
        <div v-if="modal">
          <Bill @back-callbak="back"
                :is-vendor="isVendor"
                :id="id"
          ></Bill>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import Bill from './Bill.vue'

  export default {
    name: 'BaseInfo',
    props: {
      detailData: {
        type: Object
      }
    },
    components: {Bill},
    data() {
      return {
        modal: false
      }
    },
    computed: {
      isVendor: function () {
        let checked = this.detailData.hasOwnProperty('vendorId')
        console.log('checked!!!', checked)
        return checked ? true : false
      },
      id: function(){
        let checked = this.detailData.hasOwnProperty('vendorId')
        console.log('checked!!!', checked)
        return checked ? this.detailData.vendorId : this.detailData.retailId
      }
    },
    mounted() {

    },
    methods: {
      back() {
        this.modal = false
      },
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

  .tej-vendor-baseinfo .item, .tej-bill-box .item {
    margin: 10px 0;
    font-size: 14px;
  }
  .tej-bill-box .item {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .tej-vendor-baseinfo .label, .tej-bill-box .label {
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

  .tej-bill-box{
    padding: 10px;
    background: #fff;
    margin-top: 20px;
  }

  .tej-bill-box p + p,.tej-bill-box p + button {
    margin-top: 20px;
  }
  .tej-bill-box p + button {
    text-align: center;
  }
  .tej-bill-box .btn {
    margin-top: 20px;
    text-align: center;
  }
</style>

