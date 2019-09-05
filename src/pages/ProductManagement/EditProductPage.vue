<template>
  <Row class="tej-add-product">
    <i-col span="8" class="tej-add-product-left">
      <!--商品分类选择-->
      <Classification
        :list="list"
        v-if="productDetail.classification"
        :classification="productDetail.classification"
        @classification-callback="classificationCallback"
        :disabled="disabled"
      ></Classification>

      <!--商品尺码、颜色-->
      <Feature
        @feature-callback="featureCallback"
        v-if="productDetail.feature"
        :feature="productDetail.feature"
        :disabled="disabled"
      ></Feature>
      <!--商品库存、零售价、批发价-->
      <Price
        @price-callback="priceCallback"
        v-if="productDetail.price"
        :price="productDetail.price"
        :disabled="disabled"
      ></Price>
    </i-col>
    <i-col span="15" offset="1" class="tej-add-product-right">
      <!--商品主图、详情图-->
      <Photograph
        @photograph-callback="photographCallback"
        v-if="productDetail.photograph.mainPicture"
        :main-picture-props="productDetail.photograph.mainPicture"
        :img-content-props="productDetail.photograph.imgContent"
        :disabled="disabled"
      ></Photograph>
      <!--商品使用状态-->
      <Card class="tej-bule-card">
        <p slot="title">使用状态</p>
        <div v-if="disabled">
          {{productShowStatus}}
        </div>
        <div v-else>
          <RadioGroup v-model="productShow" @on-change="productShowChange">
            <Radio label="1">启用</Radio>
            <Radio label="0">未启用</Radio>
          </RadioGroup>
        </div>
      </Card>
      <div>
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="saveAddProduct">确定</Button>
      </div>
    </i-col>
  </Row>
</template>

<script>
  import Classification from './components/addProduct/Classification'
  import Photograph from './components/addProduct/Photograph'
  import Feature from './components/addProduct/Feature'
  import Price from './components/addProduct/Price'
  import { getClassificationlist, putProductDetail, getProductDetail, postSpecificationByProductId } from '@/api/api'
  import bus from '@/utils/bus'

  export default {
    name: 'EditProductPage',
    components: {
      'Classification': Classification,
      'Photograph': Photograph,
      'Feature': Feature,
      'Price': Price
    },
    data() {
      return {
        list: [],
        photograph:null,
        price: null,
        feature: null,
        classification: null,
        productShow: '0',
        productDetail: {
          classification: null,
          feature: null,
          price: null,
          photograph: {
            mainPicture: null,
            imgContent: null
          },
          productShow: '0'
        },
        isEdit: false,
        disabled: false,
        specificationDetail: {}
      }
    },
    computed:{
      productShowStatus(){
        return this.disabled == 0 ? '未启用' : '启用'
      }
    },
    watch: {
      '$route': 'getProductDetail',
    },
    mounted(){
      this.getClassificationlist()
      console.log('编辑商品页 params!!!!!!!!!!!!!',this.$route.params)
      console.log('编辑商品页 route!!!!!!!!!!!!!',this.$route)
      if(this.$route.params.isEdit){
        this.isEdit = true
        this.getProductDetail()
      }
    },
    methods: {
      //返回上一页
      cancel(){
        if (window.history.length <= 1) {
          this.$router.push({
            path: '/'
          })
          return false
        } else {
          this.$router.go(-1)
        }
      },
      saveAddProduct(){
        let productId = {productId: this.$route.params.productId}
        let productShow = {productShow: Number(this.productShow)}
        let params = {
          ...productId,
          ...this.photograph,
          ...this.price,
          ...this.feature,
          ...this.classification,
          ...productShow
        }
        console.log('修改商品 params!!!!!!',params)
        putProductDetail(params).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('成功修改商品')
          this.cancel()
        }).catch(err => {
          this.$Message.error('修改商品失败',err)
        })
      },
      photographCallback(data){
        console.log('商品主图、详情图回调',data)
        this.photograph = data
      },
      priceCallback(data){
        console.log('库存、零售价、批发价 回调',data)
        this.price = data
      },
      featureCallback(data){
        console.log('商品颜色、尺寸回调 data',data)
        this.feature = data
      },
      classificationCallback(data){
        console.log('商品选择分类回调 data',data)
        this.classification = data
      },
      productShowChange(i){
        console.log('使用状态 ',Number(i))
      },
      getSpecificationDetail(){
        //获取商品规格参数
        let productId = this.$route.params.productId
        postSpecificationByProductId({productId: productId}).then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          console.log('商品规格参数', data)
          this.specificationDetail = data.productSpecification
          console.log('specificationDetail!!!',this.specificationDetail)
        }).catch(err => {
          this.$Message.error('获取商品规格参数失败' + err)
        })
      },
      getProductDetail(){
        //获取商品详情
        let productId = this.$route.params.productId
        getProductDetail({productId: productId}).then(res => {
          console.log('获取商品详情',res)
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.getSpecificationDetail()
          let data = res.data
          console.log('specificationDetail  hklsldjajiijidsJK!!!',this.specificationDetail)
          this.productDetail.classification = {
            typeParentId: data.typeParentId,
            typeParentName: data.typeParentName,
            typeChildId: data.typeChildId,
            typeChildName: data.typeChildName,
            vendorId: data.vendorId,
            vendorName: data.vendorName,
            productName: data.productName,
            productNo: data.productNo,
            specification: this.specificationDetail
          }

          this.productDetail.feature = {
            colorList: data.colorList,
            sizeList: data.sizeList,
            typeChildId: data.typeChildId,
          }
          this.productDetail.price = {
            inventory: data.inventory,
            priceSale: data.priceSale,
            priceWholesaleList: data.productWholesaleList
          }
          this.productDetail.photograph = {
            mainPicture: data.mainPicture,
            imgContent: data.imgContent
          }
          this.productShow = data.show.toString()
          this.disabled = data.show == 0 ? false : true
        }).catch(err => {
          this.$Message.error('获取商品详情失败',err)
        })

      },
      getClassificationlist() {
        getClassificationlist('').then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            return
          }
          let labelList= JSON.parse(JSON.stringify(res.data.list).replace(/title/g,"label"))
          let list = JSON.parse(JSON.stringify(labelList).replace(/id/g,"value"))
          this.list = list
        }).catch(err => {
          this.$Message.error('获取商品分类失败！',err)
        })
      }
    }
  }
</script>

<style scoped>
  .tej-add-product {
    background: #fff;
  }
  .tej-bule-card {
    border-left: 5px solid #2d8cf0;
    border-top: none;
    border-bottom: none;
    borer-right: none;
  }
  .tej-add-product-left, .tej-add-product-right{
    padding: 20px;
    background: #fff;
  }
</style>



