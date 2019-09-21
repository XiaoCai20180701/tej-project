<template>
  <div>
    <span >
      <!--<Checkbox-->
        <!--:indeterminate="indeterminate"-->
        <!--:value="checkAll"-->
        <!--@click.prevent.native="handleCheckAll">{{title}}-->
      <!--</Checkbox>-->
      {{title}}
    </span>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" style="display: inline-block">
      <Checkbox v-for="(item, index) in areaItem"
                :key="index"
                :label="item.code"
      >
        {{item.text}}
      </Checkbox>
    </CheckboxGroup>
    <!--<CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" style="display: inline-block">-->
      <!--<Checkbox v-for="(item, index) in areaItem"-->
                <!--:key="index"-->
                <!--:label="item.code"-->
      <!--&gt;-->
        <!--{{item.text}}-->
      <!--</Checkbox>-->
    <!--</CheckboxGroup>-->
  </div>
</template>

<script>
  import {areaData} from '@/api/areaData'
  import bus from '@/utils/bus'

  export default {
    name: 'AreaItem',
    props: {
      areaItem: Array,
      title: String
    },
    data() {
      return {
        indeterminate: false,
        checkAll: false,
        checkAllGroup: [],
        areaList: []
      }
    },
    mounted() {

    },
    methods: {
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.getCheckAllGroupValue()
        } else {
          this.checkAllGroup = []
        }
        console.log('checkAllGroup',this.checkAllGroup)
        this.$emit('allarea-check-callback',{
          area: this.checkAllGroup
        })
      },
      checkAllGroupChange(data) {
        console.log('选择',data)
        //this.areaList.push(data)
        this.$emit('allarea-check-callback',data)
      },
      getCheckAllGroupValue(){
        switch (this.title){
          case '江浙沪':
            this.checkAllGroup = ['310000', '320000', '330000']
            break
          case '华北地区':
            this.checkAllGroup = ['110000', '120000', '130000','140000','150000']
            break
          case '东北地区':
            this.checkAllGroup = ['210000', '220000', '230000']
            break
          case '华东地区':
            this.checkAllGroup = ['340000', '350000', '360000','370000']
            break
          case '华中地区':
            this.checkAllGroup = ['410000', '420000', '430000']
            break
          case '华南地区':
            this.checkAllGroup = ['440000', '450000', '460000']
            break
          case '西南地区':
            this.checkAllGroup = ['500000', '510000', '520000','530000','540000']
            break
          case '西北地区':
            this.checkAllGroup = ['610000', '620000', '630000','640000','650000']
            break
          default:
            break
        }
      }
    }
  }
</script>

<style scoped>
  .tej-area-item {
    padding: 12px 0;
    border-bottom: 1px dashed #ddd;
  }
</style>

