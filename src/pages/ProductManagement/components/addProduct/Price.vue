<template>
  <Card class="tej-bule-card">
    <div class="tej-product-box">
      <p><span class="symbol">*</span>商品库存</p>
      <Input v-model="inventory" type="number" placeholder="请输入库存数量" clearable @on-change="inventoryChange" :disabled="disabled"/>
    </div>
    <div class="tej-product-box">
      <p><span class="symbol">*</span>商品零售价</p>
      <Input v-model="priceSale" type="number" placeholder="请输入商品零售价" clearable @on-change="priceSaleChange" :disabled="disabled"/>
    </div>
    <div class="tej-product-box">
      <p><span class="symbol">*</span>商品批发价</p>
      <CheckboxGroup v-model="priceWholesaleCheckboxGroup" @on-change="priceWholesaleChange">
        <div v-for="(item, index) in priceWholesaleListDom" :key="index">
          <Checkbox :label="item.start">
            <slot v-if="item.isEdit">
              <span>
                <Input v-model="priceWholesaleEdit.start"  type="number" style="width: 50px" @on-change="getStartEditValue" size="small"/>
                -
                <Input v-model="priceWholesaleEdit.end" type="number"  style="width: 50px" @on-change="getEndEditValue" size="small"/>
                (件)
              </span>
              <span class="tej-price-dis">
                <Input v-model="priceWholesaleEdit.priceWholesale"  type="number" style="width: 40px;" @on-change="getPriceEditValue" size="small"/> (元)
              </span>
            </slot>
            <slot v-else>
              <span>{{item.start}} - {{item.end}} (件)</span>
              <span>{{item.priceWholesale}}(元)</span>
            </slot>
          </Checkbox>
          <b class="tej-delete-txt" @click="deletePriceWholesale(item,index)" v-if="!disabled">删除</b>
          <b class="tej-edit-txt" @click="savePriceWholesale(item)" v-if="item.isEdit">确定</b>
          <b class="tej-edit-txt" @click="editPriceWholesale(item)" v-else>修改</b>
        </div>
        <div v-if="!disabled">
          <Checkbox>
            <slot>
              <span>
                <Input v-model="priceWholesale.start"  type="number" style="width: 50px" @on-change="getStartValue" size="small"/>
                -
                <Input v-model="priceWholesale.end"  type="number" style="width: 50px" @on-change="getEndValue" size="small"/>
                (件)
              </span>
              <span class="tej-price-dis">
                <Input v-model="priceWholesale.priceWholesale"  type="number" style="width: 40px" @on-change="getPriceValue" size="small"/><span>(元)</span>
              </span>
            </slot>
          </Checkbox>
          <b class="tej-add-txt" @click="addPriceWholesale">新增</b>
        </div>
      </CheckboxGroup>
    </div>
  </Card>
</template>

<script>
  export default {
    name: 'Price',
    props: {
      price: {
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
        inventory: null,
        priceSale: null,
        priceWholesaleCheckboxGroup:[],
        priceWholesale: {
          start: null,
          end: null,
          priceWholesale: null,
        },
        priceWholesaleEdit: {
          start: null,
          end: null,
          priceWholesale: null,
        },
        priceWholesaleListDom: [],
        isEdit: false,
        index: 0
      }
    },
    mounted(){
      console.log('price props', this.price)
      let checked = this.$route.params.isEdit
      if (checked) {
        this.editInitData()
      }
    },
    methods: {
      editInitData(){
        this.inventory = this.price.inventory
        this.priceSale = this.price.priceSale
        this.priceWholesaleListDom = this.price.priceWholesaleList
        this.priceWholesaleListDom.map(item => {
          console.log('item!!!!',item.isShow,item.start)
          if(item.isShow == 1){
            this.priceWholesaleCheckboxGroup.push(item.start)
          }
        })
      },
      callback(){
        this.$emit('price-callback',{
          priceSale: this.priceSale,
          inventory: this.inventory,
          productWholesaleList: this.priceWholesaleListDom
        })
      },
      priceWholesaleChange(data){
        this.priceWholesaleListDom.map(item => {
          if(data.indexOf(item.start) == -1){
            item.isShow = 0
          }else {
            item.isShow = 1
          }
        })
        this.callback()
        console.log('修改勾选', this.priceWholesaleListDom)
      },
      deletePriceWholesale(item,index){
        this.priceWholesaleListDom.splice(index,1)
        this.callback()
        this.$Message.info('删除批发价')
      },
      savePriceWholesale(item) {
        item.isEdit = false
        item.start = this.priceWholesaleEdit.start
        item.end = this.priceWholesaleEdit.end
        item.priceWholesale = this.priceWholesaleEdit.priceWholesale
        this.callback()
        console.log('this.priceWholesaleList 修改后',this.priceWholesaleListDom)
      },
      editPriceWholesale(item){
        item.isEdit = true
        this.callback()
      },
      addPriceWholesale(){
        //TODO 不可重复添加
        this.priceWholesaleListDom.push({
          index: this.index++,
          start: this.priceWholesale.start,
          end: this.priceWholesale.end,
          priceWholesale: this.priceWholesale.priceWholesale,
          isShow: 1,
          isEdit: false
        })
        this.priceWholesaleCheckboxGroup.push(this.priceWholesale.start)
        console.log('this.priceWholesaleCheckboxGroup',this.priceWholesaleCheckboxGroup)
        this.callback()
        this.priceWholesale = {
          start: null,
          end: null,
          priceWholesale: null
        }
      },
      //TODO 需优化
      getPriceEditValue(e){
        this.priceWholesaleEdit.price = e.target.valueAsNumber
      },
      getEndEditValue(e){
        this.priceWholesaleEdit.end = e.target.valueAsNumber
      },
      getStartEditValue(e){
        this.priceWholesaleEdit.start = e.target.valueAsNumber
      },
      getPriceValue(e){
        this.priceWholesale.price = e.target.valueAsNumber
      },
      getEndValue(e){
        this.priceWholesale.end = e.target.valueAsNumber
      },
      getStartValue(e){
        this.priceWholesale.start = e.target.valueAsNumber
      },
      priceSaleChange(e){
        this.priceSale = e.target.valueAsNumber
        this.callback()
      },
      inventoryChange(e){
        this.inventory = e.target.valueAsNumber
        this.callback()
      }
    }
  }
</script>

<style>
.tej-price-dis {
  margin-left: 20px;
}
.tej-price-dis input {
  margin-right: 3px;
}
</style>


