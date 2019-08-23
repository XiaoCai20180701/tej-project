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
      <p><span class="symbol">*</span>所属厂家</p>
      <Select v-model="vendor"
              @on-change="vendorChange"
              :disabled="disabled">
        <OptionGroup
          v-for="(item, index) in vendorList"
          :key="index"
          :label="item.area"
        >
          <Option v-for="(child, c) in item.children" :value="child.vendorId" :key="child.vendorId">{{ child.vendorName
            }} ({{child.vendorId}})
          </Option>
        </OptionGroup>
      </Select>
    </div>
    <div class="tej-product-box">
      <p><span class="symbol">*</span>商品货号</p>
      <Input v-model="productNo" placeholder="请输入商品货号" clearable :disabled="disabled" required/>
    </div>
    <div class="tej-product-box">
      <Button type="primary" @click="openModal">商品参数填写</Button>
      <Modal
        v-model="showModal"
        title="Common Modal dialog box title"
        width="1000"
        @on-ok="ok"
        @on-cancel="cancel">
        <ParamsModal :params-obj="paramsObj"></ParamsModal>
      </Modal>
    </div>
  </Card>
</template>

<script>
  import {getVendorList, postSpecByTypeId} from '@/api/api'
  import bus from '@/utils/bus'
  import ParamsModal from './ParamsModal'

  export default {
    name: 'Classification',
    components: {
      'ParamsModal': ParamsModal
    },
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
        productNo: '',
        cascader: [],
        vendorList: [],
        vendor: null,
        typeChildId: null,      //商品分类二级目录Id
        typeId: null,           //商品分类一级目录Id
        productVendorId: null,
        openNum: 1,
        showModal: false,
        paramsObj: {}
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
      getParams() {
        postSpecByTypeId({
          typeId: this.typeId
        }).then(res => {
          console.log('res!!!!!!!!!', res)
          this.paramsObj = res.data
          console.log('data!!!!!!!!!!!!!!!!!!!!!', this.paramsObj)
        }).catch(res => {
          this.$Message.error('获取商品规格参数模板失败')
        })
      },
      openModal() {
        this.showModal = true
        this.getParams()
      },
      ok() {
        this.showModal = false
      },
      cancel() {
        this.showModal = false
      },
      editInitData() {
        this.productName = this.classification.productName
        this.vendor = this.classification.vendorId
        this.cascader = [this.classification.typeParentId, this.classification.typeChildId]
      },
      vendorChange(value) {
//        console.log('选择的厂家 productVendorId', value)
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
        this.typeId = value[0]
//        console.log('选择商品分类 typeChildId', this.typeChildId)
        //传递给父级组件
        this.$emit('classification-callback', {
          productVendorId: this.productVendorId,
          typeChildId: value[1],
          productName: this.productName
        })
        //将typeChildId传递给兄弟组件(feature)，尺码新增需要typeChildId
        bus.$emit('classification-brother-callback', value[1])
      },
      //获取厂家列表
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
            this.$Message.error('获取厂家列表失败', err)
          })
      }
    }
  }
</script>

<style scoped>
</style>

