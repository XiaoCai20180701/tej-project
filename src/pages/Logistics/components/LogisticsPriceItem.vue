<template>
  <div>
    <span>默认运费</span>
    <Input placeholder="1"
           v-model="item.defaultNum"
           class="tej-logistics-input"
           @on-change="(value) => defaultNumChange(item, value)"
    />件内，
    <Input placeholder="1"
           v-model="item.defaultPrice"
           class="tej-logistics-input"
           @on-change="(value) => defaultPriceChange(item, value)"
    />元，
    每增加<Input placeholder="1"
              v-model="item.changeNum"
              class="tej-logistics-input"
              @on-change="(value) => changeNumChange(item, value)"
  />件，
    增加运费<Input placeholder="1"
               v-model="item.changePrice"
               class="tej-logistics-input"
               @on-change="(value) => changePriceChange(item, value)"
  />元
  </div>
</template>

<script>
  export default {
    name: 'LogisticsPriceItem',
    props: {
      item: Object,
      type: Number,
    },
    mounted(){
    },
    data(){
      return {

      }
    },
    methods: {
      defaultNumChange(item,e) {
        item.defaultNum = e.target.value
        console.log('e.target.value',e.target.value)
        console.log('item',item)
        console.log('item defaultNum',item.defaultNum)
        console.log('item type',this.type)
        this.$emit('logistics-price-item-callback',{
          defaultNum: e.target.value,
          defaultPrice: item.defaultPrice,
          changeNum: item.changeNum,
          changePrice: item.changePrice,
          type: this.type
        })
      },
      defaultPriceChange(item,e) {
        item.defaultPrice = e.target.value
        this.$emit('logistics-price-item-callback',{
          defaultNum: item.defaultNum,
          defaultPrice: e.target.value,
          changeNum: item.changeNum,
          changePrice: item.changePrice,
          type: this.type
        })
      },
      changeNumChange(item,e) {
      item.changeNum = e.target.value
        this.$emit('logistics-price-item-callback',{
          defaultNum: item.defaultNum,
          defaultPrice: item.defaultPrice,
          changeNum: e.target.value,
          changePrice: item.changePrice,
          type: this.type
        })
      },
      changePriceChange(item,e) {
      item.changePrice = e.target.value
        this.$emit('logistics-price-item-callback',{
          defaultNum: item.defaultNum,
          defaultPrice: item.defaultPrice,
          changeNum: item.changeNum,
          changePrice: e.target.value,
          type: this.type
        })
      },
    }
  }
</script>

<style scoped>
  .tej-logistics-input {
    width: 150px;
    margin: 5px 10px;
  }
</style>
