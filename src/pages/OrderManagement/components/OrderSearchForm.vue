<template>
  <Form :label-width="80" class="tej-order-search-form">
    <FormItem label="厂家：" v-if="showVendorInput">
      <Input type="text"
             class="tej-order-search-input"
             placeholder="请输入厂家名称"
             v-model="vendorName"
             @on-change="vendorNameChange"
             clearable
      />
      <span class="tej-order-tag"
            v-for="(item, index) in vendorList"
            :key="index"
            @click="vendorClick(item)"
      >{{item}}</span>
    </FormItem>
    <FormItem label="商家：">
      <Input type="text"
             class="tej-order-search-input"
             placeholder="请输入商家名称"
             v-model="retailName"
             @on-change="retailNameChange"
             clearable
      />
      <span class="tej-order-tag"
            v-for="(item, index) in retailList"
            :key="index"
            @click="retailClick(item)"
      >{{item}}
       </span>
    </FormItem>
    <Divider/>
    <FormItem label="订单时间：">
      <DatePicker type="date"
                  placeholder="请输入下单的开始时间"
                  :value="startTime"
                  @on-change="startTimeChange"
                  @on-clear="clearStartTime"
      ></DatePicker>
      -
      <DatePicker type="date"
                  placeholder="请输入下单的结束时间"
                  :value="endTime"
                  @on-change="endTimeChange"
                  @on-clear="clearEndTime"
      ></DatePicker>
      <Button type="primary" @click="search">确认</Button>
    </FormItem>
  </Form>
</template>

<script>
  import {getHistoryList} from '@/api/api'
  import { userType } from '@/api/tableData'
  export default {
    name: 'OrderSearchForm',
    data(){
      return {
        vendorName: '',
        retailName: '',
        startTime: null,
        endTime: null,
        vendorList: [],
        retailList: []
      }
    },
    computed:{
      showVendorInput(){
        let checked = localStorage.getItem('userType') == userType.platform
        return checked ? true :false
      }
    },
    mounted() {
      console.log('yyyyyyyyyyy',)
      this.getHistoryListFun()
    },
    methods: {
      search() {
        console.log('时间', this.startTime, this.endTime)
        this.$emit('ok-callback',{
          vendorName: this.vendorName,
          retailName: this.retailName,
          startTime: this.startTime,
          endTime: this.endTime,
        })
      },
      vendorClick(vendor) {
        this.vendorName = vendor
        console.log('vendorClick', this.vendorName)
        this.$emit('vendor-callback',vendor)
      },
      retailClick(retail) {
        this.retailName = retail
        console.log('retailClick', this.retailName)
        this.$emit('retail-callback',retail)
      },
      vendorNameChange(e) {
        this.vendorName = e.target.value
        console.log('厂家名称', e.target.value)
      },
      retailNameChange(e) {
        this.retailName = e.target.value
        console.log('商家名称', e.target.value)
      },
      startTimeChange(startTime) {
        this.startTime = startTime
        console.log('开始时间', startTime)
      },
      endTimeChange(endTime) {
        this.endTime = endTime
        console.log('结束时间', endTime)
      },
      clearStartTime(){
        this.startTime = null
      },
      clearEndTime(){
        this.endTime = null
      },
      getHistoryListFun() {
        getHistoryList().then(res => {
          console.log('历史记录', res.data)
          this.vendorList = res.data.vendorList
          this.retailList = res.data.retailList
        }).catch(err => {
          this.$Message.error('获取历史记录失败', err)
        })
      },
    }
  }
</script>

<style scoped>
  .tej-order-search-form {
    padding: 18px;
    background: #fff;
  }

  .tej-order-search-input {
    width: 300px;
    margin-right: 15px;
  }

  .tej-order-tag {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin: 2px 4px 2px 0;
    padding: 0 8px;
    border: 1px solid #e8eaec;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
  }
</style>


