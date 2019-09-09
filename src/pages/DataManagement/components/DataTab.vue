<template>
  <div class="tej-data-tabs">
    <Tabs size="small" :animated="false" @on-click="tabClick">
      <div v-if="show">
        <TabPane label="全站商品销售量" :index="tabIndexObj.two">
          <p class="date">{{ time[0] }}</p>
          <Table :loading="showLoading" :columns="productSaleColumns" :data="productSalesList"></Table>
        </TabPane>
        <TabPane label="全站商品访问量" :index="tabIndexObj.one">
          <p class="date">{{ time[1] }}</p>
          <Table :loading="showLoading" :columns="productTrafficColumns" :data="productTrafficList"></Table>
        </TabPane>
        <TabPane label="全站畅销厂家" :index="tabIndexObj.three">
          <p class="date">{{ time[2] }}</p>
          <Table :loading="showLoading" :columns="vendorSaleColumns" :data="vendorSalesList"></Table>
        </TabPane>
        <TabPane label="全站回头客量" :index="tabIndexObj.four">
          <p class="date">{{ time[3] }}</p>
          <Table :loading="showLoading" :columns="cooperationColumns" :data="cooperationList"></Table>
        </TabPane>
        <TabPane label="全站厂家访问量" :index="tabIndexObj.five">
          <p class="date">{{ time[4] }}</p>
          <Table :loading="showLoading" :columns="vendorTrafficColumns" :data="vendorTrafficList"></Table>
        </TabPane>
      </div>
      <div v-else>
        <TabPane label="商品销量" :index="tabIndexObj.vendorProductSale">
          <p class="date">{{ time[5] }}</p>
          <Table :loading="showLoading" :columns="vendorProductSaleColumns" :data="vendorProductSaleList">
            <template slot-scope="{row, index}" slot="action">
              <Tag v-if="row.coupon_id">优惠券</Tag>
              <Tag  v-if="row.discount">{{row.discount}}折 折扣</Tag>
            </template>
          </Table>
          <div class="tej-page-box" v-if="vendorProductSaleList.length != 0">
            <Page :total="vendorProductSalePage.total"
                  show-sizer
                  show-total
                  class="tej-page"
                  @on-change="vendorProductSalePageChange"
                  @on-page-size-change="vendorProductSalePageSizeChange"
            ></Page>
          </div>
        </TabPane>
        <TabPane label="商品访问量" :index="tabIndexObj.vendorProductTraffic">
          <p class="date">{{ time[6] }}</p>
          <Table :loading="showLoading" :columns="vendorProductTrafficColumns" :data="vendorProductTrafficList">
            <template slot-scope="{row, index}" slot="action">
              <Tag v-if="row.coupon_id">优惠券</Tag>
              <Tag  v-if="row.discount">{{row.discount}}折 折扣</Tag>
            </template>
          </Table>
          <div class="tej-page-box" v-if="vendorProductTrafficList.length != 0">
            <Page :total="vendorProductTrafficPage.total"
                  show-sizer
                  show-total
                  class="tej-page"
                  @on-change="vendorProductTrafficPageChange"
                  @on-page-size-change="vendorProductTrafficPageSizeChange"
            ></Page>
          </div>
        </TabPane>
        <TabPane label="待发货总单量" :index="tabIndexObj.vendorUnShipped">
          <p class="date">{{ time[7] }}</p>
          <Table :loading="showLoading" :columns="vendorUnShippedColumns" :data="vendorUnShippedList">
            <template slot-scope="{row, index}" slot="action">
              <Tag v-if="row.coupon_id">优惠券</Tag>
              <Tag  v-if="row.discount">{{row.discount}}折 折扣</Tag>
            </template>
          </Table>
          <div class="tej-page-box" v-if="vendorUnShippedList.length != 0">
            <Page :total="vendorUnShippedPage.total"
                  show-sizer
                  show-total
                  class="tej-page"
                  @on-change="vendorUnShippedPageChange"
                  @on-page-size-change="vendorUnShippedPageSizeChange"
            ></Page>
          </div>
        </TabPane>
      </div>
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
    stationStatus,
    vendorProductTrafficColumns,
    vendorProductSaleColumns,
    vendorUnShippedColumns,
    userType
  } from '@/api/tableData'

  import {postRanklist, getRankAllList, postVendorProductStatistics} from '@/api/api'

  export default {
    name: 'DataTab',
    props: {
    },
    data() {
      return {
        showLoading: false,
        dateShow: false,
        weekShow: false,
        monthShow: false,
        productSaleColumns: [],
        productTrafficColumns: [],
        vendorSaleColumns: [],
        cooperationColumns: [],
        vendorTrafficColumns: [],
        vendorProductSaleColumns: [],
        vendorProductTrafficColumns: [],
        vendorUnShippedColumns: [],
        productTrafficList: [],
        vendorSalesList: [],
        cooperationList: [],
        productSalesList: [],
        vendorTrafficList: [],
        vendorProductSaleList: [],
        vendorProductTrafficList: [],
        vendorUnShippedList: [],
        monthValue: '',
        weekValue: '',
        dateValue: '',
        weekendTime: 6, //周六是一周的最后一天
        startTime: null,
        endTime: null,
        tabIndex: 2,
        tabIndexObj: {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          vendorProductSale: 6,
          vendorProductTraffic: 7,
          vendorUnShipped: 8
        },
        time: [
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        vendorProductSalePage: {
          index: 1,
          size: 10,
          total: 10
        },
        vendorUnShippedPage: {
          index: 1,
          size: 10,
          total: 10
        },
        vendorProductTrafficPage: {
          index: 1,
          size: 10,
          total: 10
        }
      }
    },
    computed: {
      show(){
        let checked = sessionStorage.getItem('userType') == userType.platform
        return checked ? true : false
      }
    },
    mounted() {
      this.productSaleColumns = productSaleTable
      this.productTrafficColumns = productTrafficTable
      this.vendorSaleColumns = vendorSaleTable
      this.cooperationColumns = cooperationTable
      this.vendorTrafficColumns = vendorTrafficTable
      this.vendorProductSaleColumns = vendorProductSaleColumns
      this.vendorProductTrafficColumns = vendorProductTrafficColumns
      this.vendorUnShippedColumns = vendorUnShippedColumns

      //默认显示 tab1 当天的数据
      this.initData()
    },
    methods: {
      initData() {
        let startTime = this.$Moment(new Date()).add(0, 'year').format("YYYY-MM-DD")
        let endTime = this.$Moment(new Date()).add(0, 'year').format("YYYY-MM-DD")
        if(this.show){
          //平台登录，默认显示 全站商品访问量
          this.tabIndex = dataStatus.vendorSales
          this.postRanklistFun(startTime, endTime, this.tabIndex)
          this.time[1] = startTime + ' - ' + endTime
        }else {
          //厂家登录，默认显示 商品销量
          this.tabIndex = dataStatus.vendorProductSale
          this.postVendorProductStatisticsFun(startTime, endTime, this.tabIndex)
          this.time[5] = startTime + ' - ' + endTime
        }
      },
      vendorProductSalePageChange(index){
        this.vendorProductSalePage.index = index
      },
      vendorProductSalePageSizeChange(size){
        this.vendorProductSalePage.size = size
      },
      vendorProductTrafficPageChange(index){
        this.vendorProductTrafficPage.index = index
      },
      vendorProductTrafficPageSizeChange(size){
        this.vendorProductTrafficPage.size = size
      },
      vendorUnShippedPageChange(index){
        this.vendorUnShippedPage.index = index
      },
      vendorUnShippedPageSizeChange(size){
        this.vendorUnShippedPage.size = size
      },
      tabClick(index) {
        console.log('tabs', index)
        this.tabIndex = index + 1  //选中的值与后端status定义的相同
      },
      handleOk(name) {
        console.log('tabIndex', this.tabIndex)
        if (this.startTime == '' || this.endTime == '') {
          this.$Message.error('请选择时间')
          return
        }
        switch (name) {
          case 'date':
            if (this.dateValue == '') {
              this.$Message.error('请选择时间')
              return
            }
            this.dateShow = false
            //点击确认之后，将选择的时间置空
            this.dateValue = ''
            break
          case 'week':
            if (this.weekValue == '') {
              this.$Message.error('请选择时间')
              return
            }
            this.weekShow = false
            this.weekValue = ''
            break
          case 'month':
            if (this.monthValue == '') {
              this.$Message.error('请选择时间')
              return
            }
            this.monthShow = false
            this.monthValue = ''
            break
        }
        this.postRanklistFun(this.startTime, this.endTime, this.tabIndex)
        this.postVendorProductStatisticsFun(this.startTime,this.endTime,this.tabIndex)
      },
      handleDateChange(date) {
        this.dateValue = date
        this.startTime = date
        this.endTime = date
        this.time[this.tabIndex - 1] = this.startTime + ' - ' + this.endTime
        console.log('日', this.startTime, this.endTime)
      },
      handleMonthChange(date) {
        this.monthValue = date
        this.startTime = date + '-01'
        this.endTime = date + '-31'
        this.time[this.tabIndex - 1] = this.startTime + ' - ' + this.endTime
        console.log('月', this.startTime, this.endTime)
      },
      handleWeekChange(date) {
        //TODO 样式可优化
        this.weekValue = date
        this.getWeek(date)
      },
      getWeek(checkedDate) {
        let day = new Date(checkedDate).getDay()  //选中的日期是这周的第几天
        let stepSunday = -day
        if (day == 0) {
          stepSunday = -this.weekendTime
        }
        let stepMonday = this.weekendTime - day
        let time = this.$Moment(checkedDate).valueOf()
        let monday = new Date(time + stepSunday * 24 * 3600 * 1000)
        let sunday = new Date(time + stepMonday * 24 * 3600 * 1000)
        this.startTime = this.$Moment(monday).format('YYYY-MM-DD')
        this.endTime = this.$Moment(sunday).format('YYYY-MM-DD')
        this.time[this.tabIndex - 1] = this.startTime + ' - ' + this.endTime
//        this.monthShow = false
        console.log('周', this.startTime, this.endTime)
      },
      handleClick(name) {
        switch (name) {
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
        this.showLoading = true
        postRanklist({
          startTime: startDate,
          endTime: endDate,
          status: status
        })
          .then(res => {
            this.showLoading = false
            if (res.code != 200) {
              this.$Message.warning(res.msg)
              if (res.code === 9998) {
                sessionStorage.clear()
                this.$router.push({path: '/login'})
              }
              return
            }
            this.getData(status, res.data)
          })
          .catch(err => {
            this.showLoading = false
            this.$Message.error('全站销量前十排行榜获取失败', err)
          })
      },
      postVendorProductStatisticsFun(startDate, endDate, status){
        this.showLoading = true
        let params = {
          vendorId: sessionStorage.getItem('vendorId'),
          startTime: startDate,
          endTime: endDate,
          status: status,
          page: this.getPage(status),
          pageSize: this.getPageSize(status)
        }
        postVendorProductStatistics(params).then(res => {
          this.showLoading = false
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.getData(status, res.data)
        }).catch(err => {
          this.showLoading = false
          this.$Message.error('获取厂家商品统计失败' + err)
        })
      },
      getPage(status){
        if(status == dataStatus.vendorProductSale){
          return this.vendorProductSalePage.index
        }else if(status == dataStatus.vendorProductTraffic){
          return this.vendorProductTrafficPage.index
        }else {
          return this.vendorUnShippedPage.index
        }
      },
      getPageSize(status){
        if(status == dataStatus.vendorProductSale){
          return this.vendorProductSalePage.size
        }else if(status == dataStatus.vendorProductTraffic){
          return this.vendorProductTrafficPage.size
        }else {
          return this.vendorUnShippedPage.size
        }
      },
      getData(status, data) {
        switch (status) {
          case dataStatus.commoditySales:
            this.productSalesList = data.list
            break
          case dataStatus.commodityTraffic:
            this.productTrafficList = data.list
            break
          case dataStatus.vendorSales:
            this.vendorSalesList = data.list
            break
          case dataStatus.vendorTraffic:
            this.vendorTrafficList = data.list
            break
          case dataStatus.cooperation:
            this.cooperationList = data.list
            break
          case dataStatus.vendorProductSale:
            this.vendorProductSaleList = data.list
            this.vendorProductSalePage = {
              index: data.page,
              size: data.pageSize,
              total: data.total
            }
            break
          case dataStatus.vendorProductTraffic:
            this.vendorProductTrafficList = data.list
            this.vendorProductTrafficPage = {
              index: data.page,
              size: data.pageSize,
              total: data.total
            }
            break
          default:
            this.vendorUnShippedList = data.list
            this.vendorUnShippedPage = {
              index: data.page,
              size: data.pageSize,
              total: data.total
            }

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

