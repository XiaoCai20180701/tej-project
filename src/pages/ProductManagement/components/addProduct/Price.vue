<template>
  <Card>
    <div class="tej-product-box">
      <p>商品库存</p>
      <Input v-model="inventory" placeholder="请输入库存数量" clearable />
    </div>
    <div class="tej-product-box">
      <p>商品零售价</p>
      <Input v-model="inventory" placeholder="请输入商品零售价" clearable />
    </div>
    <div class="tej-product-box">
      <p>商品批发价</p>
      <CheckboxGroup v-model="priceWholesaleCheckboxGroup">
        <div v-for="(item, index) in priceWholesaleList" :key="index">
          <Checkbox :label="item.start">
            <slot v-if="item.isEdit">
              <span>
                <Input v-model="priceWholesaleEdit.start"  style="width: 50px" @on-change="getStartEditValue"/>
                -
                <Input v-model="priceWholesaleEdit.end"  style="width: 50px" @on-change="getEndEditValue"/>
                (件)
              </span>
              <span class="tej-price-dis">
                <Input v-model="priceWholesaleEdit.price"  style="width: 40px" @on-change="getPriceEditValue"/>(元)
              </span>
            </slot>
            <slot v-else>
              <span>{{item.start}} - {{item.end}} (件)</span>
              <span>{{item.price}}(元)</span>
            </slot>
          </Checkbox>
          <b class="tej-delete-txt" @click="deletePriceWholesale(item)">删除</b>
          <b class="tej-edit-txt" @click="savePriceWholesale(item)" v-if="item.isEdit">确定</b>
          <b class="tej-edit-txt" @click="editPriceWholesale(item)" v-else>修改</b>
        </div>
        <div>
          <Checkbox>
            <slot>
              <span>
                <Input v-model="priceWholesale.start"  style="width: 50px" @on-change="getStartValue"/>
                -
                <Input v-model="priceWholesale.end"  style="width: 50px" @on-change="getEndValue"/>
                (件)
              </span>
              <span class="tej-price-dis">
                <Input v-model="priceWholesale.price"  style="width: 40px" @on-change="getPriceValue"/>(元)
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
    data() {
      return {
        inventory: null,
        priceWholesaleCheckboxGroup:[],
        priceWholesale: {
          start: null,
          end: null,
          price: null,
        },
        priceWholesaleEdit: {
          start: null,
          end: null,
          price: null,
        },
        priceWholesaleList: [],
        isEdit: false
      }
    },
    methods: {
      deletePriceWholesale(item){
        this.$Message.info('删除批发价')
      },
      savePriceWholesale(item) {
        item.isEdit = false
        item.start = this.priceWholesaleEdit.start
        item.end = this.priceWholesaleEdit.end
        item.price = this.priceWholesaleEdit.price
      },
      editPriceWholesale(item){
        item.isEdit = true
        this.priceWholesaleEdit = {
          start: item.start,
          end: item.end,
          price: item.price
        }
      },
      addPriceWholesale(){
        //TODO 不可重复添加
        this.priceWholesaleList.push({
          start: this.priceWholesale.start,
          end: this.priceWholesale.end,
          price: this.priceWholesale.price,
          show: true,
          isEdit: false
        })
        this.priceWholesaleCheckboxGroup.push(this.priceWholesale.start)
        this.priceWholesale = {
          start: null,
          end: null,
          price: null
        }
      },
      //TODO 需优化
      getPriceEditValue(e){
        this.priceWholesaleEdit.price = e.target.value
      },
      getEndEditValue(e){
        this.priceWholesaleEdit.end = e.target.value
      },
      getStartEditValue(e){
        this.priceWholesaleEdit.start = e.target.value
      },
      getPriceValue(e){
        this.priceWholesale.price = e.target.value
      },
      getEndValue(e){
        this.priceWholesale.end = e.target.value
      },
      getStartValue(e){
        this.priceWholesale.start = e.target.value
      }
    }
  }
</script>

<style scoped>
.tej-price-dis {
  margin-left: 20px;
}
</style>


