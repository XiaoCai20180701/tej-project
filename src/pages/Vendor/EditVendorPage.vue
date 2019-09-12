<template>
  <div class="tej-edit-vendor">
    <div>
      <div class="outside">
        <Row>
          <i-col span="6">
            <p class="title">厂家基本信息</p>
          </i-col>
          <i-col span="10">
            <div class="tej-audit-info">
              <Form :label-width="100" class="tej-edit-vendor-form">
                <FormItem label="厂家编号：">
                  <label>{{vendorInfo.vendorId}}</label>
                </FormItem>
                <FormItem label="厂家名称：">
                  <label>{{vendorInfo.name}}</label>
                </FormItem>
                <FormItem label="法人代表：">
                  <label>{{vendorInfo.juridicalPerson}}</label>
                </FormItem>
                <FormItem label="法人身份证：">
                  <label>{{vendorInfo.IdCard}}</label>
                </FormItem>
                <FormItem label="联系人：">
                  <Input v-model="vendorInfo.contact" @on-change="contactChange"/>
                </FormItem>
                <FormItem label="联系电话：">
                  <Input v-model="vendorInfo.mobile" @on-change="mobileChange"/>
                </FormItem>
                <FormItem>
                  <Row>
                    <i-col span="12">
                      <Button type="dashed" long @click="addContactClick" icon="md-add">新增联系人</Button>
                    </i-col>
                  </Row>
                </FormItem>
                <div v-for="(item, index) in contactList" :key="index">
                  <FormItem
                    :label="'联系人 ' + (index+2)"
                    :prop="'items.' + index + '.value'">
                    <Input type="text" v-model="item.contact" />
                  </FormItem>
                  <FormItem
                    :label="'联系电话 ' + (index+2)"
                    :prop="'items.' + index + '.value'">
                    <Input type="text" v-model="item.mobile"/>
                  </FormItem>
                </div>

                <FormItem label="联系地址：">
                  <Input type="text" v-model="vendorInfo.address" @on-change="addressChange"/>
                </FormItem>
                <FormItem label="收款账户：">
                  <label>{{showBankCard(vendorInfo.shroffAccount)}}</label>
                </FormItem>
                <FormItem>
                  <Input type="text" v-model="vendorInfo.shroffAccount" @on-change="shroffAccountChange"/>
                </FormItem>
              </Form>

            </div>
          </i-col>
        </Row>
      </div>
      <Row class="tej-edit-vendor-imgpanel">
        <i-col span="4">
          <p class="title">生产许可证</p>
          <div>
            <img :src="infoImg(licenceImg)" class="img"/>
          </div>
        </i-col>
        <i-col span="6">
          <p class="title">厂家商标</p>
          <UploadFile :picture-num="brandPictureNumber"
                      @main-callback="brandCallback"
                      :upload-list-props="brandPictureProps"
                      :note="brandNote"
                      :upload-text="brandUploadText"
                      v-if="brandPictureProps"
          ></UploadFile>
        </i-col>
        <i-col span="14">
          <p class="title">生产环境</p>
          <UploadFile :picture-num="environmentPictureNumber"
                      @main-callback="environmentCallback"
                      :upload-list-props="environmentPictureProps"
                      :note="environmentNote"
                      :upload-text="environmentUploadText"
                      v-if="environmentPictureProps"
          ></UploadFile>
        </i-col>
      </Row>
      <Row>
        <i-col span="4" offset="8" class="tej-edit-vendor-btn">
          <Button @click="cancel">取消</Button>
          <Button type="primary" @click="ok">确定</Button>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  import {postVendorInfo, putUpdateVendor} from '@/api/api'
  import UploadFile from '@/components/UploadFile'
  import { cancel } from '@/utils/utils'
  import { bankCardAttribution } from '@/utils/bankCardAttribution'

  export default {
    name: 'EditVendorPage',
    components: { UploadFile },
    props: {},
    data() {
      return {
        vendorInfo: {
          contact: '',
          address: '',
          shroffAccount: ''
        },
        licenceImg:'',
        contactList: [],
        brandPictureNumber: 2,
        brandPictureProps: [],
        brandNote: '',
        brandUploadText: '新增商标',
        environmentPictureNumber: 5,
        environmentPictureProps: [],
        environmentNote: '',
        environmentUploadText: '新增图片',
      }
    },
    computed: {
      infoImg() {
        return function (val) {
          return this.$IMG_URL + val
        }
      },
      showBankCard(){
        return function(val){
          return bankCardAttribution(val)
        }
      }
    },
    mounted() {
      this.getDetail()
      console.log('bankCardAttribution  111111!!!!!!!!!',bankCardAttribution('6217001210024455220'))
      console.log('bankCardAttribution 222222!!!!!!!!!',bankCardAttribution('6222620170000874441'))
      console.log('bankCardAttribution 333333!!!!!!!!!',bankCardAttribution('6013821300002591491'))
      console.log('bankCardAttribution 44444!!!!!!!!!',bankCardAttribution('6225768621169943'))
      console.log('bankCardAttribution 5555!!!!!!!!!',bankCardAttribution(''))
      console.log('bankCardAttribution 66666!!!!!!!!!',bankCardAttribution('6222031207001786738'))
    },
    methods: {
      mobileChange(e){
        this.vendorInfo.mobile = e.target.value
      },
      contactChange(e){
        this.vendorInfo.contact = e.target.value
      },
      addressChange(e){
        this.vendorInfo.address = e.target.value
      },
      shroffAccountChange(e){
        this.vendorInfo.shroffAccount = e.target.value
      },
      cancel(){
        cancel(this.$router)
      },
      ok(){
        this.updateVendor()
      },
      updateVendor(){
        let params = {
          vendorId: this.vendorInfo.vendorId,
          contact: this.vendorInfo.contact,
          mobile: this.vendorInfo.mobile,
          address: this.vendorInfo.address,
          shroffAccount: this.vendorInfo.shroffAccount
        }
        putUpdateVendor(params).then(res => {
          this.$Message.success('修改成功')
        }).catch(err => {
          this.$Message.error('修改厂家信息失败' + err)
        })
      },
      environmentCallback(data){
        console.log('厂家生产环境',data)
      },
      brandCallback(data){
        console.log('厂家商标',data)
      },
      addContactClick() {
        this.contactList.push({
          contact: '',
          mobile: ''
        })
      },
      getDetail() {
        postVendorInfo({vendorId: this.$route.params.vendorId}).then(res => {
          this.vendorInfo = res.data.vendorInfo
          this.licenceImg = res.data.licenceImg
          this.brandPictureProps = res.data.trademarkImgList
          this.environmentPictureProps = res.data.environmentList
        }).catch(err => {
          this.$Message.error('获取厂家详细信息失败' + err)
        })
      }
//      showBigImgList(imgList){
//        if(imgList == []){
//          this.$Message.warning('没有上传图片')
//          return
//        }else {
//          this.$Modal.info({
//            width: 700,
//            render: (h, params)=> {
//              console.log('params!!!!!!',params)
//              return h('div',imgList.map(item => {
//                console.log('item!!!!!!',item)
//                return h('img',{
//                  domProps: {
//                    src: this.$IMG_URL + item.path,
//                    width: 200,
//                    height: 200,
//                  }
//                })
//              }))
//            }
//          })
//        }
//      },
//      showBigImg(imgurl) {
//        console.log('imgurl', imgurl),
//          this.$Modal.info({
//            render: (h) => {
//              return h('img', {
//                domProps: {
//                  src: this.$IMG_URL + imgurl,
//                  width: 375
//                }
//              })
//            }
//          })
//      }
    }
  }
</script>

<style>
  .tej-edit-vendor {
    padding: 10px 20px;
    background: #fff;
  }

  .tej-edit-vendor .outside {
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px dashed #bbb;
  }

  .tej-edit-vendor .title {
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

  .tej-edit-vendor-form .ivu-form-item {
    margin-bottom: 5px;
  }

  .tej-edit-vendor-btn {
    text-align: center;
    margin-top: 60px;
  }

  .tej-edit-vendor-imgpanel {
    margin-top: 30px;
    padding-bottom: 30px;
  }

  .tej-edit-vendor .title {
    padding-left: 8px;
    border-left: 5px solid #2d8cf0;
    margin-bottom: 15px;
  }
</style>
