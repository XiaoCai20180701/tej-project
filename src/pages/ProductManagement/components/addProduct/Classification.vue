<template>
  <Card class="tej-bule-card">
    <div class="tej-product-box">
      <p><span class="symbol">*</span>商品分类选择</p>
      <Cascader
        :data="list"
        v-model="cascader"
        change-on-select
        @on-change="classificationChange"
        size="large"
        :disabled="disabled"
      ></Cascader>
    </div>
    <div class="tej-product-box">
      <p><span class="symbol">*</span>商品名称</p>
      <Input v-model="productName" placeholder="请输入商品名称" clearable :disabled="disabled" required/>
    </div>
    <div class="tej-product-box">
      <p><span class="symbol">*</span>所属厂商</p>
      <Select v-model="vendor"
              @on-change="vendorChange"
              :disabled="disabled">
        <OptionGroup
          v-for="(item, index) in vendorList"
          :key="index"
          :label="item.area"
        >
          <Option v-for="(child, c) in item.children" :value="child.vendorId" :key="child.vendorId">{{ child.vendorName
            }} ({{child.vendorId}})</Option>
        </OptionGroup>
      </Select>
    </div>
  </Card>
</template>

<script>
  import {getVendorList} from '@/api/api'

  export default {
    name: 'Classification',
    props: {
      list: Array,
      classification: {
        type: Object,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      }
    },
    data() {
      return {
        productName: '',
        cascader: [],
        vendorList: [],
        vendor: null,
        typeChildId: null,
        productVendorId: null,
        openNum: 1
      }
    },
    mounted() {
      this.getVendorList()
      console.log('classification props', this.classification)
      let checked = this.$route.params.isEdit
      if (checked) {
        this.editInitData()
      }
    },
    methods: {
      editInitData() {
        this.productName = this.classification.productName
        this.vendor = this.classification.vendorId
        this.cascader = [this.classification.typeParentId, this.classification.typeChildId]
      },
      vendorChange(value) {
//        console.log('选择的厂商 productVendorId', value)
        //TODO 下拉框需要支持搜索功能
        this.productVendorId = value
        this.$emit('classification-callback', {
          productVendorId: value,
          typeChildId: this.typeChildId,
          productName: this.productName
        })
      },
      classificationChange(value) {
        this.typeChildId = value[1]
//        console.log('选择商品分类 typeChildId', this.typeChildId)
        this.$emit('classification-callback', {
          productVendorId: this.productVendorId,
          typeChildId: value[1],
          productName: this.productName
        })
      },
      //获取厂商列表
      getVendorList() {
        getVendorList('').then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            return
          }
          this.vendorList = res.data.list
          console.log('vendorList', this.vendorList)
        })
          .catch(err => {
            this.$Message.error('获取厂商列表失败', err)
          })
      }
    }
  }
</script>

<style scoped>
</style>

