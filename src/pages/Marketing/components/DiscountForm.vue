<template>
  <Row>
    <i-col span="8">
      <Form :model="formInline" :label-width="85">
        <FormItem label="折扣力度：" style="width: 80%">
          <Select v-model="formInline.discount" clearable filterable @on-change="discountChange">
            <Option v-for="item in discountList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="折扣时间：">
          <Row>
            <i-col span="11">
              <DatePicker type="date" placeholder="请输入初始时间" v-model="formInline.startTime" @on-change="startTimeChange"></DatePicker>
            </i-col>
            <i-col span="2" style="text-align: center">
              -</i-col>
            <i-col span="11">
              <DatePicker type="date" placeholder="请输入结束时间" v-model="formInline.endTime" @on-change="endTimeChange"></DatePicker>
            </i-col>
          </Row>
        </FormItem>
      </Form>
    </i-col>
    <i-col span="12">
      <Form :model="formInline" :label-width="125">
        <FormItem label="是否与优惠劵共用：">
          <RadioGroup v-model="formInline.shareStatus" @on-change="shareStatusChange">
            <Radio label="1">共用</Radio>
            <Radio label="0">不共用</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="优惠劵名称：">
          <Row :gutter="8">
            <i-col span="4">
              <Input type="number" v-model="formInline.discountThreshold" placeholder="满" @on-change="discountThresholdChange"/>
            </i-col>
            <i-col span="4" style="text-align: left">
              可用</i-col>
          </Row>
        </FormItem>
      </Form>
    </i-col>
  </Row>

</template>

<script>
  import bus from '@/utils/bus'
  export default {
    name: 'DiscountForm',
    props: {

    },
    data(){
      return {
        formInline: {
          discount: '',
          startTime: '',
          endTime: '',
          shareStatus: '0',
          discountThreshold: ''
        },
        discountList: [
          {
            value: '2',
            label: '2'
          },
          {
            value: '4',
            label: '4'
          },
          {
            value: '6',
            label: '6'
          },
          {
            value: '8',
            label: '8'
          }
        ],
      }
    },
    methods: {
      callback(){
        bus.$emit('discount-form-callback',{
          discount: Number(this.formInline.discount),
          startTime: this.formInline.startTime,
          endTime: this.formInline.endTime,
          shareStatus: Number(this.formInline.shareStatus),
          discountThreshold: this.formInline.discountThreshold
        })
      },
      shareStatusChange(data){
        console.log('共享状态',data)
        this.formInline.shareStatus = data
        this.callback()
      },
      discountChange(data){
        console.log('折扣力度',data)
        this.formInline.discount = data
        this.callback()
      },
      discountThresholdChange(e){
        console.log('discountThreshold',e.target.value)
        this.formInline.discountThreshold = e.target.value
        this.callback()
      },
      startTimeChange(date){
        this.formInline.startTime = date
        this.callback()
      },
      endTimeChange(date){
        this.formInline.endTime = date
        this.callback()
      },
    }
  }
</script>

<style>
  .tej-discount-search {
    margin: 15px 0;
    padding: 15px;
    background: #fff;
  }
  .tej-discount-search .tej-table-search-box {
    margin-bottom: 0;
  }
</style>

