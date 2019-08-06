<template>
  <div class="tej-data-tabs">
    <Tabs size="small" :animated="false" @on-click="tabClick">
      <TabPane label="全站商品销售量">
        <p class="date">{{ time[0] }}</p>
        <Table :columns="productSaleColumns" :data="productSalesList"></Table>
      </TabPane>
      <TabPane label="全站商品访问量">
        <p class="date">{{ time[1] }}</p>
        <Table :columns="productTrafficColumns" :data="productTrafficList"></Table>
      </TabPane>
      <TabPane label="全站畅销厂商">
        <p class="date">{{ time[2] }}</p>
        <Table :columns="vendorSaleColumns" :data="vendorSalesList"></Table>
      </TabPane>
      <TabPane label="全站回头客量">
        <p class="date">{{ time[3] }}</p>
        <Table :columns="cooperationColumns" :data="cooperationList"></Table>
      </TabPane>
      <TabPane label="全站厂商访问量">
        <p class="date">{{ time[4] }}</p>
        <Table :columns="vendorTrafficColumns" :data="vendorTrafficList"></Table>
      </TabPane>
      <div size="small" slot="extra" class="tej-data-date">
        <DatePicker
          :open="dateShow"
          v-model="dateValue"
          confirm
          type="date"
          transfer
          @on-change="handleDateChange"
          @on-ok="handleOk('date')"
        >
          <a href="javascript:void(0)" @click="handleClick( 'date')" :class="{ active: dateShow}">
            日
          </a>
        </DatePicker>
        <DatePicker
          :open="weekShow"
          :value="weekValue"
          confirm
          type="date"
          transfer
          @on-change="handleWeekChange"
          @on-ok="handleOk('week')"
        >
          <a href="javascript:void(0)" @click="handleClick( 'week')" :class="{ active: weekShow}">
            周
          </a>
        </DatePicker>
        <DatePicker
          :open="monthShow"
          :value="monthValue"
          confirm
          type="month"
          transfer
          @on-change="handleMonthChange"
          @on-ok="handleOk('month')"
        >
          <a href="javascript:void(0)" @click="handleClick('month')" :class="{ active: monthShow}">
            月
          </a>
        </DatePicker>
      </div>
    </Tabs>
  </div>
</template>

<script>
  import {
    productSaleTable,
    productTrafficTable,
    vendorSaleTable,
    cooperationTable,
    vendorTrafficTable,
    dataStatus,
    stationStatus
  } from '@/api/tableData'

  import {postRanklist, getRankAllList} from '@/api/api'

  export default {
    name: 'DataTab',
    props: {
      tableData: {
        type: Array
      },
      columnsData: {
        type: Array
      }
    },
    data() {
      return {
        dateShow: false,
        weekShow: false,
        monthShow: false,
        productSaleColumns: [],
        productTrafficColumns: [],
        vendorSaleColumns: [],
        cooperationColumns: [],
        vendorTrafficColumns: [],
        productTrafficList: [],
        vendorSalesList: [],
        cooperationList: [],
        productSalesList: [],
        vendorTrafficList: [],
        monthValue: '',
        weekValue: '',
        dateValue: '',
        weekendTime: 6, //周六是一周的最后一天
        startTime: null,
        endTime: null,
        tabIndex: 1,
        time: [
          '',
          '',
          '',
          '',
          ''
        ]
      }
    },
    computed: {
    },
    mounted() {
      this.productSaleColumns = productSaleTable
      this.productTrafficColumns = productTrafficTable
      this.vendorSaleColumns = vendorSaleTable
      this.cooperationColumns = cooperationTable
      this.vendorTrafficColumns = vendorTrafficTable
    },
    methods: {
      tabClick(index) {
        console.log('tabs', index)
        this.tabIndex = index + 1  //选中的值与后端status定义的相同
      },
      handleOk(name) {
        console.log('tabIndex', this.tabIndex)
        switch (name) {
          case 'date':
            this.dateShow = false
            break
          case 'week':
            this.weekShow = false
            break
          case 'month':
            this.monthShow = false
            break
        }
        this.postRanklistFun(this.startTime, this.endTime, this.tabIndex)
      },
      handleDateChange(date) {
        this.dateValue = date
        this.startTime = date
        this.endTime = date
        this.time[this.tabIndex -1 ] = this.startTime + ' - ' + this.endTime
        console.log('日', this.startTime, this.endTime)
      },
      handleMonthChange (date) {
        this.monthValue = date
        this.startTime = date + '-01'
        this.endTime = date + '-31'
        this.time[this.tabIndex -1 ] = this.startTime + ' - ' + this.endTime
        console.log('月', this.startTime,this.endTime)
      },
      handleWeekChange (date) {
        //TODO 样式可优化
        this.weekValue = date
        this.getWeek(date)
      },
      getWeek(checkedDate){
        let day =  new Date(checkedDate).getDay()  //选中的日期是这周的第几天
        let stepSunday = - day
        if(day == 0) {
          stepSunday = - this.weekendTime
        }
        let stepMonday = this.weekendTime - day
        let time = this.$Moment(checkedDate).valueOf()
        let monday = new Date(time +stepSunday *24*3600*1000 )
        let sunday = new Date(time +stepMonday *24*3600*1000 )
        this.startTime = this.$Moment(monday).format('YYYY-MM-DD')
        this.endTime = this.$Moment(sunday).format('YYYY-MM-DD')
        this.time[this.tabIndex -1 ] = this.startTime + ' - ' + this.endTime
        console.log('周', this.startTime,this.endTime)
      },
      handleClick(name) {
        switch (name){
          case 'date':
            this.dateShow = !this.dateShow
            this.weekShow = false
            this.monthShow = false
            break
          case 'week':
            this.weekShow = !this.weekShow
            this.dateShow = false
            this.monthShow = false
            break
          case 'month':
            this.monthShow = !this.monthShow
            this.dateShow = false
            this.weekShow = false
            break
        }
      },
      postRanklistFun(startDate, endDate, status) {
        postRanklist({
          startTime: startDate,
          endTime: endDate,
          status: status
        })
          .then(res => {
            if (res.code != 200) {
              this.$Message.warning(res.msg)
              return
            }
            this.getData(status, res.data.list)
          })
          .catch(err => {
            this.$Message.error('全站销量前十排行榜获取失败', err)
          })
      },
      getData(status, list) {
        switch (status) {
          case dataStatus.commoditySales:
            this.productSalesList = list
            break
          case dataStatus.commodityTraffic:
            this.productTrafficList = list
            break
          case dataStatus.vendorSales:
            this.vendorSalesList = list
            break
          case dataStatus.vendorTraffic:
            this.vendorTrafficList = list
            break
          default:
            this.cooperationList = list
        }
      },
    }
  }
</script>

<style>
  .tej-data-tabs .ivu-tabs {
    min-height: 350px;
  }
  .tej-data-tabs .date {
    margin-bottom: 10px;
  }

  .tej-data-date {
    color: #02b5f7;
    cursor: pointer;
  }
  .tej-data-date span + span {
    display: inline-block;
    margin-left: 10px;
  }

  .tej-data-date .active {
    color: red;
    border-bottom: 2px solid red;
  }
</style>

