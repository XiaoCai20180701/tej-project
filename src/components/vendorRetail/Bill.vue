<template>
  <div>
    <p slot="header" class="tej-bill-header" >
      <Icon type="ios-arrow-back" size="24" @click="back"/>
      <span class="title">{{isVendor ? '厂家':'商家'}}账单</span>
    </p>
    <div class="modal_top">
      <Row :gutter="16">
        <Col span="12">
        <span class="modal_span">时间：</span>
        <DatePicker :value="startTimeValue" size="small" type="date" placeholder="请输入初始时间" style="width:150px"
                    @on-change="handleStartTimeChange"></DatePicker>
        <span class="modal_span"> - </span>
        <DatePicker :value="endTimeValue" size="small" type="date" placeholder="请输入结束时间" style="width: 150px"
                    @on-change="handleEndTimeChange"></DatePicker>
        </Col>
        <Col span="12">
        <span class="modal_span">金额：</span>
        <Input v-model="minAmountValue"
               placeholder="请输入最低金额"
               size="small"
               type="number"
               style="width: auto"
               clearable
        />
        <span class="modal_span"> - </span>
        <Input v-model="maxAmountValue"
               placeholder="请输入最高金额"
               size="small"
               type="number"
               style="width: auto"
               clearable
        />
        </Col>
      </Row>
      <div class="wrap" style="margin-top: 20px;">
        <div class="left" style="width: 36px;">
          <span style="height: 21px;display: inline-block;line-height: 23px;">类型：</span>
        </div>
        <div class="right">
          <RadioGroup v-model="billTypeGroup" @on-change="typeChange">
            <Radio v-for="(item,index) in billTypeArray"
                   :key="index"
                   :label='item.id'
                   class="tej-radio">{{item.name}}</Radio>
          </RadioGroup>
          <div class="btn-group">
            <Button type="primary" size="small" @click="search">确认搜索</Button>
            <Button size="small" @click="clearAll">清空</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal_center">
      <Spin fix v-if="showLoading"></Spin>
      <div v-else>
        <div v-if="billList.length == 0" class="tej-bill-nodata">
          账单暂无数据
        </div>
        <div v-else>
          <div v-for="(item, index) in billList" :key="index" class="bill_list_cell">
            <!-- Content {{ item }} -->
            <Row style="border-bottom: #E3E3E3 solid 1px; height: 100%;">
              <Col span="8" style="height: 100%;">
              <p style="height: 50%;color: #37AFB8;display: inline-block;line-height: 30px; font-size: 15px;">{{item.statusName}}</p>
              <p style="margin-top: 5px;">订单编号：{{item.orderId}}</p>
              </Col>
              <Col span="8" style="height: 100%;">
              <p style="margin-top: 39.5px;">时间：{{item.time}}</p>
              </Col>
              <Col span="8" style="height: 100%;">
              <p class="moneyLabType" :style="getStyle(item.status)">{{item.money}}</p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div class="tej-page-box">
        <Page
          :total="page.total"
          :page-size="5"
          :page-size-opts="pageSizeOpts"
          show-sizer
          show-total
          class="tej-page"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"/>
      </div>
      </div>
  </div>
</template>

<script>
  import { postVendorBillList, postRetailBillList } from '@/api/api'
  import { billTypeList } from '@/api/tableData'
  export default {
    name: 'Bill',
    props: {
      isVendor: {
        type: Boolean
      },
      id: {   //厂家编号或商家编号，具体看父组件的传值
        type: String,
        required: false
      }
    },
    data() {
      return {
        showLoading: false,
        page:{
          index: 1,
          size: 5,
          total: 10
        },
        pageSizeOpts: [5,10,20],
        startTimeValue: '',
        endTimeValue: '',
        minAmountValue: '',
        maxAmountValue: '',
        billTypeGroup: '',
        billTypeIntArray: [
          {
            id: '',
            name: '全部'
          }
        ],
        billTypeArray: [],
//        billList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        billList: [],

      }
    },
    mounted(){
      //TODO 组件有太多的v-if v-else，需要优化，可再分成小组件
      this.getBillTypeArray()
      this.getBill()
    },
    methods: {
      clearAll() {
        this.startTimeValue = ''
        this.endTimeValue = ''
        this.minAmountValue = ''
        this.maxAmountValue = ''
        this.billTypeGroup = ''
        this.getBill()
      },
      search() {
        if (this.startTimeValue !== '' && this.endTimeValue == '') {
          this.$Message.warning("请选择结束时间");
          console.log('index', this.billTypeGroup)
          return
        }
        if (this.endTimeValue !== '' && this.startTimeValue == '') {
          this.$Message.warning("请选择开始时间");
          return
        }
        if (this.minAmountValue != '' && this.maxAmountValue == '') {
          this.$Message.warning("请输入最高金额");
          return
        }
        if (this.maxAmountValue != '' && this.minAmountValue == '') {
          this.$Message.warning("请输入最低金额");
          return
        }
        let startTime = this.$Moment(this.startTimeValue).valueOf();
        let endTime = this.$Moment(this.endTimeValue).valueOf();
        if (startTime > endTime) {
          this.$Message.warning("开始时间不能大于结束时间");
          return;
        }
        if (Number(this.minAmountValue) > Number(this.maxAmountValue)) {
          this.$Message.warning("最低金额不能大于最高金额");
          return
        }
        this.getBill()
      },
      getBillTypeArray() {
        let vendor = billTypeList.filter((i, v) => i.id < 3)
        let retail = billTypeList.filter((i, v) => i.id >= 3)
        this.billTypeArray = this.isVendor ? [...this.billTypeIntArray, ...vendor] : [...this.billTypeIntArray, ...retail]
      },
      typeChange(e) {
        console.log('eeeeeeeeeeee', e)
        this.billTypeGroup = e
        this.getBill()
      },
      pageChange(page) {
        this.page.index = page
        this.getBill()
      },
      pageSizeChange(pageSize) {
        this.page.size = pageSize
        this.getBill()
      },
      getBill() {
        this.showLoading = true
        let id = this.isVendor ? {vendorId: this.id} : {retailId: this.id}
        let params = {
          ...id,
          page: this.page.index,
          pageSize: this.page.size,
          startTime: this.startTimeValue,
          endTime: this.endTimeValue,
          startMoney: this.minAmountValue,
          endMoney: this.maxAmountValue,
          billStatus: this.billTypeGroup
        }
        if (this.isVendor) {
          postVendorBillList(params).then(res => {
//            this.$Spin.hide()
            this.showLoading = false
            if (res.code != 200) {
              this.$Message.warning(res.msg)
              if(res.code === 9998){
                localStorage.clear()
                this.$router.push({path: '/login'})
              }
              return
            }
            let data = res.data
            this.billList = data.billList
            this.page = {
              index: data.page,
              size: data.pageSize,
              total: data.total
            }
            console.log('厂商账单 list', this.billList)
          }).catch(err => {
            this.showLoading = false
            this.$Message.error('获取厂商账单失败' + err)
          })
        } else {
          postRetailBillList(params).then(res => {
            this.showLoading = false
            if (res.code != 200) {
              this.$Message.warning(res.msg)
              if(res.code === 9998){
                localStorage.clear()
                this.$router.push({path: '/login'})
              }
              return
            }
            let data = res.data
            this.billList = data.billList
            this.page = {
              index: data.page,
              size: data.pageSize,
              total: data.total
            }
            console.log('零售商账单 list', this.billList)
          }).catch(err => {
            this.showLoading = false
            this.$Message.error('获取零售商账单失败' + err)
          })
        }

      },
      back() {
        this.$emit('back-callbak')
      },
      handleStartTimeChange(date) {
        this.startTimeValue = date
        console.log('startTimeValue', date)
      },
      handleEndTimeChange(date) {
        this.endTimeValue = date
        console.log('endTimeValue', date)
      },
      getStyle(status) {
        switch (status) {
          case 1:
          case 4:
            return 'color:#F55F00'
            break;
          default:
            return 'color:#333333'
        }
      }
    }

  }
</script>

<style scoped>
  .tej-bill-header {
    padding: 14px 10px;
  }
  .tej-bill-header .title{
    display: inline-block;
    width: 90%;
    text-align: center;
    font-size: 14px;
  }
  .modal_head {
    border-bottom: 1px solid #e8eaec;
    height: 40px;
    width: 800px;
    background: #FAFAFA;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .modal_top {
    background: #E7F3FE;
    padding: 20px 25px 20px 25px;
  }

  .modal_center {
    position: relative;
  }
  .modal_top .btn-group {
    float: right;
    margin-right: 45px;
  }

  .modal_span {
    line-height: 24px;
    height: 24px;
    display: inline-block;
  }

  .wrap {
    width: 100%;
    display: flex;
    /* border-bottom: #f1f1f1 solid 2px; */
    /*flex布局*/
  }

  .left {
    width: 150px;
    height: 100%;
    flex: none;
    text-align: right;
    /* background: #05DBFC; */
  }

  .right {
    height: 100%;
    flex: 1;
    /*flex布局*/
    /* background: #05DBFC; */
  }

  .bill_list_cell {
    padding: 10px 20px 0px 20px;
    /* border-bottom: #E3E3E3 solid 1px; */
    height: 80px;
  }

  .moneyLabType {
    margin-top: 25px; text-align: right; font-size: 15px;
  }

  .tej-page-box {
    padding-bottom: 20px;
  }

  .tej-bill-nodata {
    padding: 10px 25px;
  }
</style>
