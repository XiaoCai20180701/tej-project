<template>
  <div>
    <StationData :all-data="allData"></StationData>
    <div class="tej-data-tabs">
      <Tabs size="small" :animated="false">
        <TabPane label="全站商品访问量">
          <Table :columns="productTrafficColumns" :data="productTrafficList"></Table>
        </TabPane>
        <TabPane label="全站畅销厂商">
          <Table :columns="vendorSaleColumns" :data="vendorSalesList"></Table>
        </TabPane>
        <TabPane label="全站商品销售量">
          <Table :columns="productSaleColumns" :data="productSalesList"></Table>
        </TabPane>
        <TabPane label="全站厂商访问量">
          <Table :columns="vendorTrafficColumns" :data="vendorTrafficList"></Table>
        </TabPane>
        <TabPane label="全站回头客量">
          <Table :columns="cooperationColumns" :data="cooperationList"></Table>
        </TabPane>
        <div size="small" slot="extra" class="tej-data-date">
          <span>日</span>
          <span>周</span>
          <span>月</span>
        </div>
      </Tabs>
      <!--<Col span="12">-->
      <!--<TopDate list-name="全站销量前十商品排行"-->
      <!--:table-data="productSaleList"-->
      <!--:columns-data="productSaleColumns"-->
      <!--@date-change="postProductSale"-->
      <!--&gt;</TopDate>-->
      <!--</Col>-->
      <!--<Col span="12">-->
      <!--<TopDate list-name="全站访问量前十商品排行"-->
      <!--:table-data="productTrafficList"-->
      <!--:columns-data="productTrafficColumns"-->
      <!--@date-change="postProductTraffic"-->
      <!--&gt;</TopDate>-->
      <!--</Col>-->
      <!--<Col span="12">-->
      <!--<TopDate list-name="全站销量前十厂商"-->
      <!--:table-data="vendorSaleList"-->
      <!--:columns-data="vendorsaleColumns"-->
      <!--@date-change="postVendorSale"-->
      <!--&gt;</TopDate>-->
      <!--</Col>-->
      <!--<Col span="12">-->
      <!--<TopDate list-name="全站前十厂商、商家合作次数"-->
      <!--:table-data="cooperationList"-->
      <!--:columns-data="cooperationColumns"-->
      <!--@date-change="postCooperation"-->
      <!--&gt;</TopDate>-->
      <!--</Col>-->
    </div>
  </div>
</template>

<script>
  import DataTab from './components/DataTab'
  import StationData from './components/StationData'
  import {
    productSaleTable,
    productTrafficTable,
    vendorSaleTable,
    cooperationTable,
    vendorTrafficTable,
    dataStatus
  } from '@/api/tableData'
  import {getStationdata, postRanklist, getRankAllList} from '@/api/api'

  export default {
    name: 'DataManagementPage',
    components: {
      'DataTab': DataTab,
      'StationData': StationData
    },
    data() {
      return {
        allData: [],
        productSaleColumns: [],
        productTrafficColumns: [],
        vendorSaleColumns: [],
        cooperationColumns: [],
        vendorTrafficColumns: [],
        stationInfo: {},
        productTrafficList: [],
        vendorSalesList: [],
        cooperationList: [],
        productSalesList: [],
        vendorTrafficList: []
      }
    },
    mounted() {
      this.productSaleColumns = productSaleTable
      this.productTrafficColumns = productTrafficTable
      this.vendorSaleColumns = vendorSaleTable
      this.cooperationColumns = cooperationTable
      this.vendorTrafficColumns = vendorTrafficTable
      this.getInit()
    },
    methods: {
      getStation() {
        getStationdata()
          .then(res => {
            if (res.code != 200) {
              this.$Message.warning(res.msg)
              return
            }
            let data = res.data
          })
          .catch(err => {
            this.$Message.error('获取全站数据失败', err)
          })
      },
      getInit() {
        getRankAllList().then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            return
          }
          let data = res.data
          this.stationInfo = data.stationInfo
          this.productTrafficList = data.productTrafficList
          this.vendorSalesList = data.vendorSalesList
          this.cooperationList = data.cooperationList
          this.productSalesList = data.productSalesList
          this.vendorTrafficList = data.vendorTrafficList
          this.getInitStation(data.stationInfo)
//          this.productSaleList = res.data.productSalesList
//          this.productTrafficList = res.data.productTrafficList
//          this.vendorSaleList = res.data.vendorSalesList
//          this.cooperationList = res.data.cooperationList
        }).catch(err => {
          this.$Message.error('排行榜请求失败' + err)
        })
      },
      getInitStation(data) {
        this.allData = [
          {
            title: '全站访问量',
            data: data.stationTraffic,
            icon: 'icon-fangwenliang',
            txt: '次'
          },
          {
            title: '全站销售量',
            data: data.stationSales,
            icon: 'icon-datubiao',
            txt: '件'
          },
          {
            title: '全站销售额',
            data: data.stationPrice,
            icon: 'icon-xiaoshoue',
            txt: '元'
          },
        ]
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
            this.productSaleList = list
            break
          case dataStatus.commodityTraffic:
            this.productTrafficList = list
            break
          case dataStatus.vendorSales:
            this.vendorSaleList = list
          default:
            this.cooperationList = list
        }
      },
      //全站销量前十商品排行
      postProductSale(startDate, endDate) {
        this.postRanklistFun(startDate, endDate, dataStatus.commoditySales)
      },
      //全站访问量前十商品排行
      postProductTraffic(startDate, endDate) {
        this.postRanklistFun(startDate, endDate, dataStatus.commodityTraffic)
      },
      //全站销量前十厂商
      postVendorSale(startDate, endDate) {
        this.postRanklistFun(startDate, endDate, dataStatus.vendorSales)
      },
      //全站前十厂商、商家合作次数
      postCooperation(startDate, endDate) {
        this.postRanklistFun(startDate, endDate, dataStatus.cooperation)
      }
    }
  }
</script>

<style scoped>
  .tej-data-tabs {
    padding: 18px;
    margin: 20px 0;
    background: #fff;
  }

</style>

