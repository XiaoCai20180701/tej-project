<template>
  <div class="tej-addproduct-params clearfix">
    <Form :model="formRight" label-position="right" :label-width="148" inline>
      <!--通用模板专有参数-->
      <FormItem label="品牌：">
        <Input v-model="formRight.brand"></Input>
      </FormItem>
      <FormItem label="货源类别：">
        <div class="select">
          <Select v-model="formRight.productType">
            <Option value="0">预售</Option>
            <Option value="1">现货</Option>
          </Select>
        </div>
      </FormItem>
      <!--<FormItem label="适用年龄：">-->
      <!--<Input v-model="formRight.suitableAgeArray[0]" />- -->
      <!--<Input v-model="formRight.suitableAgeArray[1]" />-->
      <!--</FormItem>-->
      <FormItem label="适合季节：">
        <div class="select">
          <Select v-model="formRight.applyToSeason">
            <Option value="春秋">春秋</Option>
            <Option value="夏">夏</Option>
            <Option value="冬">冬</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="款式：">
        <Input v-model="formRight.style"></Input>
      </FormItem>
      <FormItem label="面料工艺：">
        <Input v-model="formRight.fabricCraft"></Input>
      </FormItem>
      <FormItem label="图案：">
        <Input v-model="formRight.pattern"></Input>
      </FormItem>
      <FormItem label="图片实拍：">
        <div class="select">
          <Select v-model="formRight.image">
            <Option value="0">无</Option>
            <Option value="1">有</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="是否库存：">
        <div class="select">
          <Select v-model="formRight.isInventory">
            <Option value="0">无</Option>
            <Option value="1">有</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="上市年份季节：">
        <Input v-model="formRight.input1"></Input>
      </FormItem>
      <FormItem label="元素：">
        <Input v-model="formRight.element"></Input>
      </FormItem>
      <FormItem label="AQL抽检标准：">
        <div class="select">
          <Select v-model="formRight.aql">
            <Option value="0">无</Option>
            <Option value="1">有</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="平车针距12-14：">
        <div class="select">
          <Select v-model="formRight.stitchLength">
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="毛头/杂余线头是否修剪：">
        <div class="select">
          <Select v-model="formRight.isClip">
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="面料名称：">
        <Input v-model="formRight.fabricName"></Input>
      </FormItem>
      <FormItem label="主要面料成分：">
        <Input v-model="formRight.fabricComposition"></Input>
      </FormItem>
      <FormItem label="主要面料成分含量：">
        <div class="select">
          <Select v-model="formRight.fabricCompositionContent">
            <Option value="0">0</Option>
            <Option value="20%">20%</Option>
            <Option value="40%">40%</Option>
            <Option value="60%">60%</Option>
            <Option value="80%">80%</Option>
            <Option value="100%">100%</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="安全等级：">
        <div class="select">
          <Select v-model="formRight.safeLevel">
            <Option value="A类">A类</Option>
            <Option value="B类">B类</Option>
            <Option value="C类">C类</Option>
          </Select>
        </div>
      </FormItem>
      <FormItem label="身高：">
        <Input v-model="formRight.suitableHeight"/>
      </FormItem>
      <FormItem label="是否跨域货源：">
        <div class="select">
          <Select v-model="formRight.crossDomain">
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </div>
      </FormItem>
      <!--裤子专有参数-->
      <div v-if="isTrousers">
        <FormItem label="裤长：">
          <Input v-model="formRight.pantsLength"/>
        </FormItem>
        <FormItem label="是否开档：">
          <div class="select">
            <Select v-model="formRight.openFiles">
              <Option value="0">否</Option>
              <Option value="1">是</Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="裤腰：">
          <Input v-model="formRight.pantsWaist"/>
        </FormItem>
        <FormItem label="裤门襟：">
          <Input v-model="formRight.pantsPlacket"/>
        </FormItem>
      </div>
      <!--上衣专有参数-->
      <div v-if="isCoat">
        <FormItem label="领型：">
          <Input v-model="formRight.collarType"/>
        </FormItem>
        <FormItem label="袖长：">
          <Input v-model="formRight.sleeveLength"/>
        </FormItem>
        <FormItem label="衣长：">
          <Input v-model="formRight.clothingLength"/>
        </FormItem>
      </div>
      <!--套装专有参数-->
      <div v-if="isSuit">
        <FormItem label="套装类型：">
          <div class="select">
            <Select v-model="formRight.suitType">
              <Option value="0">裙套装</Option>
              <Option value="1">裤套装</Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="套装件数：">
          <div class="select">
            <Select v-model="formRight.suitNumber">
              <Option value="0">两件套</Option>
              <Option value="1">三件套</Option>
              <Option value="2">多件套</Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="是否连帽：">
          <div class="select">
            <Select v-model="formRight.isHooded">
              <Option value="0">否</Option>
              <Option value="1">是</Option>
            </Select>
          </div>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
  import {isTrousersType, isCoatType, isSuitType} from '@/api/tableData'

  export default {
    name: 'error',
    props: {
      paramsObj: Object
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
        },
        isShow: false,                 //是否显示该字段
        isTrousers: false,             //是否显示裤子参数
        isCoat: false,                 //是否显示上衣参数
        isSuit: false                  //是否显示套装参数
      }
    },
    watch: {
      paramsObj(val) {
        this.getTemplate(val)
      }
    },
    mounted() {

    },
    methods: {
      getTemplate(paramsObj) {
        let paramsProps = Object.getOwnPropertyNames(paramsObj)
        let referenceProps = Object.getOwnPropertyNames(this.formRight)
        console.log('paramsProps!!!!!!!!', paramsProps)
        console.log('referenceProps!!!!!!!!', referenceProps)
        paramsProps.map(item => {
          console.log('item', item)
          isTrousersType.map(t => {
            if (item === t) {
              this.isTrousers = true
              return
            }
          })
          isCoatType.map(c => {
            if (item === c) {
              this.isCoat = true
              return
            }
          })
//          isSuitType.map(s => {
//            if (item === s) {
//              this.isSuit = true
//              return
//            }
//          })
        })
      }
    }
  }
</script>

<style scoped>
  .tej-addproduct-params .select {
    width: 162px;
  }

</style>
