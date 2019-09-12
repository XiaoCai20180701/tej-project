<template>
  <div class="tej-addproduct-params clearfix">
    <Form :model="formRight" label-position="right" :label-width="148" inline>
      <!--通用模板专有参数-->
      <FormItem :label="paramsObj.brand">
        <Input v-model="formRight.brand" @on-change="brandChange"/>
      </FormItem>
      <FormItem :label="paramsObj.productType">
        <div class="select">
          <Select v-model="formRight.productType" @on-change="productTypeChange">
            <Option value="0">预售</Option>
            <Option value="1">现货</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="适用年龄：">
        <Input v-model="formRight.suitableAgeArray[0]" style="width:76px"/>-
        <Input v-model="formRight.suitableAgeArray[1]" style="width:76px"/>
      </FormItem>
      <FormItem :label="paramsObj.applyToSeason">
        <div class="select">
          <Select v-model="formRight.applyToSeason" @on-change="applyToSeasonChange">
            <Option value="春秋">春秋</Option>
            <Option value="夏">夏</Option>
            <Option value="冬">冬</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.style">
        <Input v-model="formRight.style" @on-change="styleChange"/>
      </FormItem>
      <FormItem :label="paramsObj.fabricCraft">
        <Input v-model="formRight.fabricCraft" @on-change="fabricCraftChange"/>
      </FormItem>
      <FormItem :label="paramsObj.pattern">
        <Input v-model="formRight.pattern" @on-change="patternChange"/>
      </FormItem>
      <FormItem :label="paramsObj.image">
        <div class="select" @on-change="imageChange">
          <Select v-model="formRight.image">
            <Option value="0">无</Option>
            <Option value="1">有</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.isInventory">
        <div class="select">
          <Select v-model="formRight.isInventory" @on-change="isInventoryChange">
            <Option value="0">无</Option>
            <Option value="1">有</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.listedYear">
        <Input v-model="formRight.listedYear" @on-change="listedYearChange"/>
      </FormItem>
      <FormItem :label="paramsObj.element">
        <Input v-model="formRight.element" @on-change="elementChange"/>
      </FormItem>
      <FormItem :label="paramsObj.aql">
        <div class="select">
          <Select v-model="formRight.aql" @on-change="aqlChange">
            <Option value="0">无</Option>
            <Option value="1">有</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.stitchLength">
        <div class="select">
          <Select v-model="formRight.stitchLength" @on-change="stitchLengthChange">
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.isClip">
        <div class="select">
          <Select v-model="formRight.isClip" @on-change="isClipChange">
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.fabricName">
        <Input v-model="formRight.fabricName" @on-change="fabricNameChange"/>
      </FormItem>
      <FormItem :label="paramsObj.fabricComposition">
        <Input v-model="formRight.fabricComposition" @on-change="fabricCompositionChange"/>
      </FormItem>
      <FormItem :label="paramsObj.fabricCompositionContent">
        <div class="select">
          <Select v-model="formRight.fabricCompositionContent" @on-change="fabricCompositionContentChange">
            <Option value="0">0</Option>
            <Option value="20%">20%</Option>
            <Option value="40%">40%</Option>
            <Option value="60%">60%</Option>
            <Option value="80%">80%</Option>
            <Option value="100%">100%</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.safeLevel">
        <div class="select">
          <Select v-model="formRight.safeLevel" @on-change="safeLevelChange">
            <Option value="A类">A类</Option>
            <Option value="B类">B类</Option>
            <Option value="C类">C类</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.suitableHeight">
        <Input v-model="formRight.suitableHeight" @on-change="suitableHeightChange"/>
      </FormItem>
      <FormItem :label="paramsObj.crossDomain">
        <div class="select">
          <Select v-model="formRight.crossDomain" @on-change="crossDomainChange">
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </div>
      </FormItem>
      <!--套装专有参数-->
      <FormItem :label="paramsObj.suitType" v-if="paramsObj.suitType">
        <div class="select">
          <Select v-model="formRight.suitType" @on-change="suitTypeChange">
            <Option value="0">裙套装</Option>
            <Option value="1">裤套装</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.suitNumber" v-if="paramsObj.suitNumber">
        <div class="select">
          <Select v-model="formRight.suitNumber" @on-change="suitNumberChange">
            <Option value="0">两件套</Option>
            <Option value="1">三件套</Option>
            <Option value="2">多件套</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.isHooded" v-if="paramsObj.isHooded">
        <div class="select">
          <Select v-model="formRight.isHooded" @on-change="isHoodedChange">
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </div>
      </FormItem>
      <!--上衣专有参数-->
      <FormItem :label="paramsObj.collarType" v-if="paramsObj.collarType">
        <Input v-model="formRight.collarType" @on-change="collarTypeChange"/>
      </FormItem>
      <FormItem :label="paramsObj.sleeveLength" v-if="paramsObj.sleeveLength">
        <Input v-model="formRight.sleeveLength" @on-change="sleeveLengthChange"/>
      </FormItem>
      <FormItem :label="paramsObj.clothingLength" v-if="paramsObj.clothingLength">
        <Input v-model="formRight.clothingLength" @on-change="clothingLengthChange"/>
      </FormItem>
      <!--裤子专有参数-->
      <FormItem :label="paramsObj.pantsLength" v-if="paramsObj.pantsLength">
        <Input v-model="formRight.pantsLength" @on-change="pantsLengthChange"/>
      </FormItem>
      <FormItem :label="paramsObj.openFiles" v-if="paramsObj.openFiles">
        <div class="select">
          <Select v-model="formRight.openFiles" @on-change="openFilesChange">
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem :label="paramsObj.pantsWaist" v-if="paramsObj.pantsWaist">
        <Input v-model="formRight.pantsWaist" @on-change="pantsWaistChange"/>
      </FormItem>
      <FormItem :label="paramsObj.pantsPlacket" v-if="paramsObj.pantsPlacket">
        <Input v-model="formRight.pantsPlacket" @on-change="pantsPlacketChange"/>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import bus from '@/utils/bus'

  export default {
    name: 'ParamsModal',
    props: {
      paramsObj: Object,
      typeId: Number,
      specification: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        formRight: {
          brand: '',                    //品牌
          productType: '1',             //货源类别：'0'=预售，'1'=现货
          image: '1',                   //图片实拍：'0'=无，'1'=有
          isInventory: '1',             //是否库存: '0'=否，'1'=是
          element: '',                  //元素
          aql: '0',                     // AQL抽检标准： '0'=无 '1'=有
          stitchLength: '1',            //平车针距12 -14: '0'=否，'1'=是
          isClip: '1',                  //毛头/杂余线头是否修剪： '0'=否 '1'=是
          suitableHeight: '',           //身高
          applyToSeason: '',            //适合季节
          suitableAge: '3,8',           //适合年龄
          suitableAgeArray: [],
          fabricCraft: '',              //面料工艺
          pattern: '',                  //图案
          fabricName: '',               //面料名称
          isHooded: '1',                //是否连帽
          fabricComposition: '',        //主要面料成分
          fabricCompositionContent: '',  //主要面料成分含量
          safeLevel: '',                //安全等级
          crossDomain: '1',             //是否跨域货源 ：'0'=否 '1'=是
          listedYear: '',               //上市年份季节
          pantsLength: '',              //裤长
          openFiles: '0',               //是否开档：'0'=否 '1'=是
          pantsWaist: '',               //裤腰
          pantsPlacket: '',             //裤门襟
          collarType: '',               //领型
          sleeveLength: '',             //袖长
          clothingLength: '',           //袖长
          suitType: '1',                //套装类型：'0'=裙套装 '1'=裤套装
          suitNumber: '0',              //套装件数：'0'=两件套 '1'=三件套 '2'
          style: ''                     //款式
        }
      }
    },
    mounted() {
      this.initData()

    },
    methods: {
      initData(){
       console.log('specification props',this.specification)
        this.formRight.brand = this.specification.brand
        this.formRight.style = this.specification.style,
          this.formRight.fabricCraft = this.specification.fabricCraft,
          this.formRight.pattern = this.specification.pattern,
          this.formRight.listedYear = this.specification.listedYear,
          this.formRight.productType = this.specification.productType,
          this.formRight.applyToSeason = this.specification.applyToSeason,
          this.formRight.image = this.specification.image,
          this.formRight.isInventory = this.specification.isInventory,
          this.formRight.element = this.specification.element,
          this.formRight.aql = this.specification.aql,
          this.formRight.stitchLength = this.specification.stitchLength,
          this.formRight.isClip = this.specification.isClip,
          this.formRight.fabricName = this.specification.fabricName,
          this.formRight.fabricComposition = this.specification.fabricComposition,
          this.formRight.suitableHeight = this.specification.suitableHeight,
          this.formRight.collarType = this.specification.collarType,
          this.formRight.sleeveLength = this.specification.sleeveLength,
          this.formRight.clothingLength = this.specification.clothingLength,
          this.formRight.pantsLength = this.specification.pantsLength,
          this.formRight.fabricCompositionContent = this.specification.fabricCompositionContent,
          this.formRight.crossDomain = this.specification.crossDomain,
          this.formRight.safeLevel = this.specification.safeLevel,
          this.formRight.suitTyp = this.specification.suitTyp,
          this.formRight.suitNumber = this.specification.suitNumber,
          this.formRight.isHooded = this.specification.isHooded,
          this.formRight.openFiles = this.specification.openFiles,
          this.formRight.pantsWaist = this.specification.pantsWaist,
          this.formRight.pantsPlacket = this.specification.pantsPlacket
      },
      callback() {
        bus.$emit('params-modal-callback', {
          specifications: {
            typeId: this.typeId,
            brand: this.formRight.brand,
            style: this.formRight.style,
            fabricCraft: this.formRight.fabricCraft,
            pattern: this.formRight.pattern,
            listedYear: this.formRight.listedYear,
            productType: this.formRight.productType,
            applyToSeason: this.formRight.applyToSeason,
            image: this.formRight.image,
            isInventory: this.formRight.isInventory,
            element: this.formRight.element,
            aql: this.formRight.aql,
            stitchLength: this.formRight.stitchLength,
            isClip:  this.formRight.isClip,
            fabricName: this.formRight.fabricName,
            fabricComposition: this.formRight.fabricComposition,
            suitableHeight: this.formRight.suitableHeight,
            collarType: this.formRight.collarType,
            sleeveLength: this.formRight.sleeveLength,
            clothingLength: this.formRight.clothingLength,
            pantsLength: this.formRight.pantsLength,
            fabricCompositionContent: this.formRight.fabricCompositionContent,
            crossDomain: this.formRight.crossDomain,
            safeLevel: this.formRight.safeLevel,
            suitTyp: this.formRight.suitTyp,
            suitNumber: this.formRight.suitNumber,
            isHooded: this.formRight.isHooded,
            openFiles: this.formRight.openFiles,
            pantsWaist: this.formRight.pantsWaist,
            pantsPlacket: this.formRight.pantsPlacket
          }
        })
      },
      pantsPlacketChange(e){
        this.formRight.pantsPlacket = e.target.value
        this.callback()
      },
      pantsWaistChange(e){
        this.formRight.pantsWaist = e.target.value
        this.callback()
      },
      fabricCompositionContentChange(val){
        this.formRight.fabricCompositionContent = val
        this.callback()
      },
      crossDomainChange(val){
        this.formRight.crossDomain = val
        this.callback()
      },
      safeLevelChange(val){
        this.formRight.safeLevel = val
        this.callback()
      },
      suitTypeChange(val){
        this.formRight.suitTyp = val
        this.callback()
      },
      suitNumberChange(val){
        this.formRight.suitNumber = val
        this.callback()
      },
      isHoodedChange(val) {
        this.formRight.isHooded = val
        this.callback()
      },
      openFilesChange(val){
        this.formRight.openFiles = val
        this.callback()
      },
      suitableHeightChange(e){
        this.formRight.suitableHeight = e.target.value
        this.callback()
      },
      collarTypeChange(e){
        this.formRight.collarType = e.target.value
        this.callback()
      },
      sleeveLengthChange(e){
        this.formRight.sleeveLength = e.target.value
        this.callback()
      },
      clothingLengthChange(e){
        this.formRight.clothingLength = e.target.value
        this.callback()
      },
      pantsLengthChange(e){
        this.formRight.pantsLength = e.target.value
        this.callback()
      },
      fabricNameChange(e){
        this.formRight.fabricName = e.target.value
        this.callback()
      },
      fabricCompositionChange(e){
        this.formRight.fabricComposition = e.target.value
        this.callback()
      },
      isClipChange(val){
        this.formRight.isClip = val
        this.callback()
      },
      stitchLengthChange(val){
        this.formRight.stitchLength = val
        this.callback()
      },
      aqlChange(val){
        this.formRight.aql = val
        this.callback()
      },
      elementChange(e){
        this.formRight.element = e.target.value
        this.callback()
      },
      isInventoryChange(val){
        this.formRight.isInventory = val
        this.callback()
      },
      brandChange(e) {
        this.formRight.brand = e.target.value
        this.callback()
      },
      styleChange(e) {
        this.formRight.style = e.target.value
        this.callback()
      },
      fabricCraftChange(e) {
        this.formRight.fabricCraft = e.target.value
        this.callback()
      },
      patternChange(e) {
        this.formRight.pattern = e.target.value
        this.callback()
      },
      listedYearChange(e) {
        this.formRight.listedYear = e.target.value
        this.callback()
      },
      productTypeChange(val) {
        this.formRight.productType = val
        this.callback()
      },
      applyToSeasonChange(val) {
        this.formRight.applyToSeason = val
        this.callback()
      },
      imageChange() {
        this.formRight.image = val
        this.callback()
      }

    }
  }
</script>

<style scoped>
  .tej-addproduct-params .select {
    width: 162px;
  }

</style>
