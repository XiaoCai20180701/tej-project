<template>
  <div class="tej-main">
    <h1>
      ProductManagementPage
    </h1>
    <div>
      <Button type="primary" @click="gotoAddClassification">新增商品分类</Button>
      <Button type="primary" @click="gotoAddProduct">新增商品</Button>
    </div>
    <TejTable></TejTable>
  </div>
</template>

<script>
  import {getProductList} from '@/api/api'
  import  TejTable  from '@/components/TejTable'
  export default {
    name: 'ProductManagementPage',
    components: {
      'TejTable': TejTable
    },
    data() {
      return {

      }
    },
    mounted(){
      this.getProductList()
    },
    methods: {
      getProductList(){
        getProductList({page:1, pageSize: 10}).then(res => {
          console.log('res',res)
        })
          .catch(err => {console.log('err', err)})
      },
      gotoAddClassification() {
        this.$router.push({name: 'AddClassificationPage'})
      },
      gotoAddProduct() {
        this.$router.push({name: 'AddProductPage'})
      }
    }
  }
</script>

<style scoped>

</style>
