<template>
  <Row class="tej-add-product">
    <i-col span="8" class="tej-add-product-left">
      <!--商品分类选择-->
      <Classification :list="list" @classification-callback="classificationCallback"></Classification>
      <!--商品尺码、颜色-->
      <Feature @feature-callback="featureCallback"></Feature>
      <!--商品库存、零售价、批发价-->
      <Price @price-callback="priceCallback"></Price>
    </i-col>
    <i-col span="15" offset="1" class="tej-add-product-right">
      <!--商品主图、详情图-->
      <Photograph @photograph-callback="photographCallback"></Photograph>
      <!--商品使用状态-->
      <Card class="tej-bule-card">
        <p slot="title">使用状态</p>
        <RadioGroup v-model="productShow" @on-change="productShowChange">
          <Radio label="1">启用</Radio>
          <Radio label="0">未启用</Radio>
        </RadioGroup>
      </Card>
      <div>
        <Button @click="cancel">取消</Button>
        <Button @click="review">预览</Button>
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
  import { getClassificationlist, postAddProduct, getProductDetail } from '@/api/api'
  import { AddProductParams } from '@/api/tableData'
  export default {
    name: 'AddProductPage',
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
        productShow: '0'
      }
    },
    watch:{
      '$route': 'getClassificationlist'
    },
    mounted(){
      this.getClassificationlist()
    },
    methods: {
      cancel() {
        this.$router.push({name: 'ProductManagementPage'})
      },
      review(){
        this.$Message.info('跳转到 前台页面')
      },
      saveAddProduct(){
        let productShow = {productShow: Number(this.productShow)}
        let params = {...this.photograph, ...this.price, ...this.feature, ...this.classification, ...productShow}
        console.log('新增商品 params!!!!!!',params)
        //先判断商品属性是否填写完整，再请求接口
        if(this.validationParamFun(params)){
          postAddProduct(params).then(res => {
            if(res.code != 200){
              this.$Message.warning(res.msg)
              if(res.code === 9998){
                this.$router.push({path: '/login'})
              }
              return
            }
            this.$Message.success('成功新增商品')
            this.$router.push({ name: 'ProductManagementPage'})
          }).catch(err => {
            this.$Message.error('新增商品失败',err)
          })
        }

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
      getClassificationlist() {
        getClassificationlist('').then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              this.$router.push({path: '/login'})
            }
            return
          }
          let labelList= JSON.parse(JSON.stringify(res.data.list).replace(/title/g,"label"))
          let list = JSON.parse(JSON.stringify(labelList).replace(/id/g,"value"))
          this.list = list
        }).catch(err => {
          this.$Message.error('获取商品分类失败！',err)
        })
      },
      //验证新增商品属性是否填写完整的方法
      validationParamFun(params){
        let paramsProps = Object.getOwnPropertyNames(params)
        let referenceProps = Object.getOwnPropertyNames(AddProductParams)
        console.log('paramsProps',paramsProps)
        console.log('referenceProps',referenceProps)
        //判断属性名的length是否一致
        if(paramsProps.length != referenceProps.length){
          this.$Message.error('请填写全部信息')
          return false
        }
        return true
      },
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

