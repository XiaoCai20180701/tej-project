<template>
  <Row>
    <i-col span="8">
      <!--商品分类选择-->
      <Classification :list="list" @classification-callback="classificationCallback"></Classification>
      <!--商品尺码、颜色-->
      <Feature></Feature>
      <!--商品库存、零售价、批发价-->
      <Price></Price>
    </i-col>
    <i-col span="15" offset="1">
      <!--商品主图、详情图-->
      <Photograph></Photograph>
      <!--商品使用状态-->
      <Card>
        <p slot="title">使用状态</p>
        <RadioGroup v-model="checkedStr">
          <Radio label="启用"></Radio>
          <Radio label="未启用"></Radio>
        </RadioGroup>
      </Card>
      <div>
        <Button>取消</Button>
        <Button type="primary">确定</Button>
      </div>
    </i-col>
  </Row>
</template>

<script>
  import Classification from './components/addProduct/Classification'
  import Photograph from './components/addProduct/Photograph'
  import Feature from './components/addProduct/Feature'
  import Price from './components/addProduct/Price'
  import { getClassificationlist } from '@/api/api'
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
        checkedStr: '未启用',
        list: []
      }
    },
    mounted(){
      this.getClassificationlist()
//      console.log('query id',this.$route.query)
//      console.log('params',this.$route.params)
    },
    methods: {
      classificationCallback(data){
        console.log('商品选择分类返回 data',data)
      },
      getClassificationlist() {
        getClassificationlist('').then(res => {
          console.log('parentList before',res.data.list)
          let labelList= JSON.parse(JSON.stringify(res.data.list).replace(/title/g,"label"))
          let list = JSON.parse(JSON.stringify(labelList).replace(/id/g,"value"))
          this.list = list
          console.log('parentList after',list)
        }).catch(err => {
          this.$Message.error('获取商品分类失败！',err)
        })
      }
    }
  }
</script>

<style scoped>

</style>

