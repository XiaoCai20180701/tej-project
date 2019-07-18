<template>
  <Row>
    <i-col span="8">
      <!--商品分类选择-->
      <Classification :list="list" @classification-callback="classificationCallback"></Classification>
      <!--商品尺码、颜色-->
      <Feature @feature-callback="featureCallback"></Feature>
      <!--商品库存、零售价、批发价-->
      <Price @price-callback="priceCallback"></Price>
    </i-col>
    <i-col span="15" offset="1">
      <!--商品主图、详情图-->
      <Photograph @photograph-callback="photographCallback"></Photograph>
      <!--商品使用状态-->
      <Card>
        <p slot="title">使用状态</p>
        <RadioGroup v-model="productShow" @on-change="productShowChange">
          <Radio label="1">启用</Radio>
          <Radio label="0">未启用</Radio>
        </RadioGroup>
      </Card>
      <div>
        <Button>取消</Button>
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
    mounted(){
      this.getClassificationlist()
    },
    methods: {
      saveAddProduct(){
        let productShow = {productShow: Number(this.productShow)}
        let params = {...this.photograph, ...this.price, ...this.feature, ...this.classification, ...productShow}
        console.log('新增商品 params!!!!!!',params)
        postAddProduct(params).then(res => {
          this.$Message.success('成功新增商品')
        }).catch(err => {
          this.$Message.error('新增商品失败',err)
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
      getClassificationlist() {
        getClassificationlist('').then(res => {
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

</style>

