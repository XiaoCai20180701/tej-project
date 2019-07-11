<template>
  <div>
    <h1>
      ProductManagementPage
    </h1>
    <div>
      <Button type="primary" @click="gotoAddClassification">新增商品分类</Button>
      <Button type="primary" @click="gotoAddProduct">新增商品</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductManagementPage',
    data() {
      return {

      }
    },
    methods: {
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
