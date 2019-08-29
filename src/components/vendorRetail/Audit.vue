<template>
  <div class="tej-audit">
    <div class="outside">
      <Row>
        <Col span="6">
        <p class="title">{{ isVendor ? '厂家' : '商家'}}基本信息</p>
        </Col>
        <Col span="10" offset="3">
        <div class="tej-audit-info">
          <p class="">
            <span class="s-text">{{isVendor ? '厂家' : '商家'}}名称：</span>
            <span>{{retailInfo.name}}</span>
          </p>
          <p class="p-text">
            <span class="s-text">公司法人：</span>
            <span>{{retailInfo.juridicalPerson}}</span>
          </p>
          <p class="p-text">
            <span class="s-text">法人身份证号：</span>
            <!--<span>{{retailInfo.IdCard}}</span>-->
            <span>331002199312151205</span>
          </p>
          <p class="p-text">
            <span class="s-text">联系人及电话：</span>
            <span>{{retailInfo.contact}} - {{retailInfo.mobile}}</span>
          </p>
          <p class="p-text" v-if="retailInfo.contact2 != null">
            <span class="s-text"></span>
            <span>{{retailInfo.contact2}} - {{retailInfo.mobile2}}</span>
            <!--<span>李四 - 18769895698 / 0576-88316697</span>-->
          </p>
          <p class="p-text" v-if="retailInfo.contact3 != null">
            <span class="s-text"></span>
            <span>{{retailInfo.contact3}} - {{retailInfo.mobile3}}</span>
            <!--<span>王五 - 18769895698</span>-->
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
        <p class="title">{{isVendor ? '厂家生产凭证和环境信息' : '商家证件和环境信息'}}</p>
        </Col>
        <Col span="10" offset="3">
        <div class="tej-audit-info">
          <div>
            <span class="s-text">{{isVendor ? '厂家生产许可证' : '商家经营许可证'}}：</span>
            <span class="link" @click="showBigImg(info.brandImg)">查看大图</span>
            <div>
              <img :src="infoImg(info.brandImg)" class="img"/>
            </div>
          </div>
          <div class="p-text">
            <span class="s-text">{{isVendor ? '厂家商标' : '商家商标'}}：</span>
            <span class="link" @click="showBigImg(info.licenceImg)">查看大图</span>
            <div>
              <img :src="infoImg(info.licenceImg)" class="img"/>
            </div>
          </div>
          <div class="p-text">
            <span class="s-text">{{isVendor ? '厂家环境' : '商家环境'}}：</span>
            <span class="link" @click="showBigImgList(info.environmentList)">查看大图</span>
            <div>
              <span v-for="(img, index) in info.environmentList" :key="index">
                 <img :src="infoImg(img.path)" :alt="img.name" class="img" />
              </span>
            </div>
          </div>
        </div>
        </Col>
      </Row>
    </div>
    <div class="tej-audit-action">
      <div class="tej-audit-btngroup" style="margin: 70px;" v-if="isAudit == 0">
        <div style="width: 180px; height: 35px;margin: 0 auto;">
          <Button @click="modal = true">不通过</Button>
          <Modal v-model="modal" :closable="false">
            <Input v-model="value" type="textarea" :rows="6" placeholder="请输入审核不通过的理由"/>
            <div slot="footer" style="text-align: center;">
              <Button class="b_style" @click="modalCancel">取消</Button>
              <Button class="b_style" style="color: white; background: #409EFF;margin-left: 25px;" @click="modalOk">确认
              </Button>
            </div>
          </Modal>
          <Button type="primary" @click="success">通过</button>
        </div>
      </div>
      <div class="tej-audit-reason" v-else>
        <p class="txt">{{isVendor ? '厂家未通过的原因' : '商家未通过的原因'}}</p>
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
    computed: {
      infoImg() {
        return function (val) {
          return this.$IMG_URL + val
        }
      }
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
      showBigImgList(imgList){
        if(imgList == []){
          this.$Message.warning('没有上传图片')
          return
        }else {
          this.$Modal.info({
            width: 700,
            render: (h, params)=> {
              console.log('params!!!!!!',params)
              return h('div',imgList.map(item => {
                console.log('item!!!!!!',item)
                return h('img',{
                  domProps: {
                    src: this.$IMG_URL + item.path,
                    width: 200,
                    height: 200,
                  }
                })
              }))
            }
          })
        }
      },
      showBigImg(imgurl) {
        console.log('imgurl', imgurl),
          this.$Modal.info({
            render: (h) => {
              return h('img', {
                domProps: {
                  src: this.$IMG_URL + imgurl,
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
