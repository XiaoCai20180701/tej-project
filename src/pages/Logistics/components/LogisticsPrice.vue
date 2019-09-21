<template>
  <div>
    <div v-for="(item, index) in formLogistics.expressageInfoList">
      {{item.expressageCode}}
      <LogisticsPriceItem :item="item"
                          :type="type"
                          @logistics-price-item-callback="logisticsPriceItemCallback"
      ></LogisticsPriceItem>
    </div>
    <!-- 按件计价 为指定地区设置运费 -->
    <div>
      <a @click="AreaModal = true">
        <Icon type="ios-add"/>
        为指定地区设置运费</a>
      <Modal v-model="AreaModal"
             title="为指定地区设置运费"
             width="800"
             @on-ok="ok"
             @on-cancel="cancel"
      >
        <p>红色表示在其他指定地区中有勾选，再次勾选会更新该省份的设置</p>
        <Area @area-callback="areaCallback"/>
      </Modal>
    </div>
  </div>
</template>

<script>
  import bus from '@/utils/bus'
  import LogisticsPriceItem from './LogisticsPriceItem'
  import Area from '@/components/Area'

  export default {
    name: 'LogisticsPrice',
    components: {LogisticsPriceItem, Area},
    props: {
      type: Number,
    },
    data() {
      return {
        index: 1,
        AreaModal: false,
        areaList: [],
        expressageCode: '',
        formLogistics: {
          expressageInfoList: [
            {
              defaultNum: null,
              defaultPrice: null,
              changeNum: null,
              changePrice: null,
              expressageCode: '100000',
            }
          ]
        }
      }
    },
    mounted(){
    },
    methods: {
      logisticsPriceItemCallback(data) {
        console.log('ffffff', data)
        if (this.index == 1) {
          this.formLogistics.expressageInfoList = [
            {
              sequence: this.index,
              defaultNum: data.defaultNum,
              defaultPrice: data.defaultPrice,
              changeNum: data.changeNum,
              changePrice: data.changePrice,
              expressageCode: '100000'
            }]
        }
        this.callback()
      },
      callback() {
        this.$emit('logistics-price-callback', this.formLogistics.expressageInfoList)
      },
      areaCallback(data) {
        console.log('确定 选择的区域', data)
        this.areaList = this.areaList.concat(data)
        this.expressageCode = [...new Set(this.areaList)].filter((i, v) => v > 0).toString()
        console.log('this.expressageCode', this.expressageCode)
        // this.expressageCode = data == undefined ? '100000' : data.area.toString()
      },
      ok() {
        this.index = this.formLogistics.expressageInfoList.length
        this.index++
        this.formLogistics.expressageInfoList.push({
          sequence: this.index,
          defaultNum: null,
          defaultPrice: null,
          changeNum: null,
          changePrice: null,
          expressageCode: this.expressageCode
        })
        this.callback()
      },
      cancel() {
      },
    }
  }
</script>

<style scoped>

</style>
