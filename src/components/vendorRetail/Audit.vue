<template>
  <div class="tej-audit">
    <div class="outside">
      <Row>
        <Col span="6">
        <p class="title">{{ isVendor ? '厂商' : '零售商'}}基本信息</p>
        </Col>
        <Col span="10" offset="3">
        <div class="tej-audit-info">
          <p class="">
            <span class="s-text">{{isVendor ? '厂家' : '零售商'}}名称：</span>
            <span>{{retailInfo.name}}</span>
          </p>
          <p class="p-text">
            <span class="s-text">公司法人：</span>
            <span>{{retailInfo.juridicalPerson}}</span>
          </p>
          <p class="p-text">
            <span class="s-text">联系人：</span>
            <span>{{retailInfo.contact}}</span>
          </p>
          <p class="p-text">
            <span class="s-text">联系电话：</span>
            <span>{{retailInfo.mobile}}</span>
          </p>
          <p class="p-text">
            <span class="s-text">联系地址：</span>
            <span>{{retailInfo.address}}</span>
          </p>
        </div>
        </Col>
      </Row>
    </div>
    <div class="outside">
      <Row>
        <Col span="6">
        <p class="title">{{isVendor ? '厂商生产凭证' : '零售商生产凭证'}}</p>
        </Col>
        <Col span="10" offset="3">
        <div class="tej-audit-info">
          <p>
            <span class="s-text">{{isVendor ? '厂商生产许可证' : '零售商生产许可证'}}：</span>
            <span class="link" @click="showBigImg(info.brandImg)">查看大图</span>
          <div>
            <img :src="info.brandImg" class="img"/>
          </div>
          </p>
          <p class="p-text">
            <span class="s-text">{{isVendor ? '厂商商标' : '零售商商标'}}：</span>
            <span class="link" @click="showBigImg(info.licenceImg)">查看大图</span>
          <div>
            <img :src="info.licenceImg" class="img"/>
          </div>
          </p>
        </div>
        </Col>
      </Row>
    </div>
    <div class="tej-audit-action">
      <div class="tej-audit-btngroup" style="margin: 70px;" v-if="isAudit == 0">
        <div style="width: 180px; height: 35px;margin: 0 auto;">
          <Button class="b_style" @click="modal = true">不通过</Button>
          <Modal v-model="modal" :closable="false" :mask-closable="false">
            <Input v-model="value" type="textarea" :rows="6" placeholder="请输入审核不通过的理由"/>
            <div slot="footer" style="text-align: center;">
              <Button class="b_style" @click="modalCancel">取消</Button>
              <Button class="b_style" style="color: white; background: #409EFF;margin-left: 25px;" @click="modalOk">确认
              </Button>
            </div>
          </Modal>
          <Button class="b_style" style="color: white; background: #409EFF;margin-right: 0px; float: right;"
                  @click="success">通过
          </button>
        </div>
      </div>
      <div class="tej-audit-reason"  v-else>
        <p class="txt">{{isVendor ? '厂商未通过的原因' : '商家未通过的原因'}}</p>
        <p class="content"> {{info.reason}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isAudit: Number,
      info: Object,
      isVendor: {
        type: Boolean
      },
      retailInfo: Object
    },
    data() {
      return {
        modal: false,
        value: '',
        // isVendor: true
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      modalOk() {
        if (this.value == '') {
          this.$Message.warning("请输入不通过理由")
          return
        }
        // console.log('ok value', this.value)
        this.modal = false
        this.$emit('save-audit-callback', 0, this.value)
      },
      modalCancel() {
        console.log('cancel')
        this.modal = false
      },
      success() {
        this.$emit('save-audit-callback', 1, '')
      },
      showBigImg(imgurl) {
        console.log('imgurl', imgurl),
          this.$Modal.info({
            render: (h) => {
              return h('img', {
                domProps: {
                  src: imgurl,
                  width: 375
                }
              })
            }
          })
      }
    }
  }
</script>

<style scoped>
  .tej-audit {
    padding: 10px 20px;
    background: #fff;
  }

  .tej-audit .outside {
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px dashed #bbb;
  }

  .tej-audit .title {
    font-size: 16px;
  }

  .tej-audit-info {
    margin-top: 25px;
  }

  .tej-audit-info .link {
    color: #409eff;
    cursor: pointer;
  }

  .tej-audit-info .img {
    width: 100px;
    height: 100px;
    margin-left: 120px;
    margin-top: 10px;
  }

  .tej-audit-reason {
    padding-top: 20px;
    padding-bottom: 50px;
  }

  .tej-audit-reason .txt {
    font-size: 16px;
  }

  .tej-audit-reason .content {
    margin-top: 10px;
    margin-left: 85px;
  }
  .p-text {
    margin-top: 10px;
  }

  .s-text {
    display: inline-block;
    width: 120px;
    text-align: right;
  }

  .b_style {
    width: 70px;
    height: 30px;
    border-radius: 5px;
  }
</style>
