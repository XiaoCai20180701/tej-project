<template>
    <Card>
      <div class="tej-product-box">
        <p>商品分类选择</p>
        <Cascader :data="list" change-on-select size="large"></Cascader>
      </div>
      <div class="tej-product-box">
        <p>商品名称</p>
        <Input v-model="productName" placeholder="请输入商品名称" clearable />
      </div>
      <div class="tej-product-box">
        <p>所属厂商</p>
        <Select v-model="model1">
          <OptionGroup v-for="(item, index) in vendorList" :key="index" :label="item.area">
            <Option v-for="(child, c) in item.children" :value="child.vendorName" :key="child.vendorId">
              {{ child.vendorName }} ({{child.vendorId}})
            </Option>
          </OptionGroup>
        </Select>
      </div>
    </Card>
</template>

<script>
  import { getVendorList }  from '@/api/api'
  export default {
    name: 'Classification',
    props: {
      list: Array
    },
    data() {
      return {
        productName: '',
        vendorList:[],
        model1: 3,
//        vendorId: 1
      }
    },
    mounted() {
      this.getVendorList()
    },
    methods: {
      //获取厂商列表
      getVendorList() {
        getVendorList('').then(res => {
          this.vendorList = res.data.list
          console.log('vendorList', this.vendorList)
        })
          .catch(err => {
          this.$Message.error('获取厂商列表失败',err)
        })
      }
    }
  }
</script>

<style scoped>
</style>

