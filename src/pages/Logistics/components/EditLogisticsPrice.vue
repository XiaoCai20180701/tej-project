<template>
  <div>
    <div v-for="(item, index) in formLogistics.expressageInfoList">
      {{item.place}}<Icon type="ios-remove-circle-outline" class="tej-delete-icon" @click="deleteItem(item.id)"/>
      <EditLogisticsPriceItem :item="item"
                          :type="type"
                          @logistics-price-item-callback="EditLogisticsPriceItemCallback"
      ></EditLogisticsPriceItem>
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
  import EditLogisticsPriceItem from './EditLogisticsPriceItem'
  import Area from '@/components/Area'
  import { deleteExpressage } from '@/api/api'

  export default {
    name: 'EditLogisticsPrice',
    components: {EditLogisticsPriceItem, Area},
    props: {
      type: Number,
      data: Array
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
      this.formLogistics.expressageInfoList = this.data
      console.log('88888',this.data)
    },
    methods: {
      deleteItem(id){
        deleteExpressage({
          id: id,
          type: 1 //模板里的内容删除
        }).then(() => {
          this.$Message.success('删除成功')
          this.$emit('edit-logistics-price-callback')
        }).catch(err => {
          this.$Message.error('删除失败', err)
        })
      },
      EditLogisticsPriceItemCallback(data) {
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
.tej-delete-icon {
  margin-left: 10px;
  font-size: 14px;
  color: red;
  font-weight: bold;
}
</style>

