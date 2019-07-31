<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <Col :xs="24" :sm="10" :md="12" :lg="8" v-for="(item, index) in allData" :key="index">
      <div class="headClass">
        <p class="headTitleClass">{{item.title}}</p>
        <p class="headContentClass">{{item.data | 1000}}</p>
      </div>
      </Col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <Col span="12">
      <TopDate list-name="全站销量前十商品排行"
               :table-data="productSaleList"
               :columns-data="productSaleColumns"
               @date-change="postProductSale"
      ></TopDate>
      </Col>
      <Col span="12">
      <TopDate list-name="全站访问量前十商品排行"
               :table-data="productAccessList"
               :columns-data="productAccessColumns"
               @date-change="postProductAccess"
      ></TopDate>
      </Col>
      <Col span="12">
      <TopDate list-name="全站销量前十厂商"
               :table-data="vendorSaleList"
               :columns-data="vendorsaleColumns"
               @date-change="postVendorSale"
      ></TopDate>
      </Col>
      <Col span="12">
      <TopDate list-name="全站前十厂商、商家合作次数"
               :table-data="cooperationList"
               :columns-data="cooperationColumns"
               @date-change="postCooperation"
      ></TopDate>
      </Col>
    </Row>
  </div>
</template>

<script>
  import TopDate from './components/TopDate'
  import { productSaleTable, productAccessTable, vendorSaleTable, cooperationTable, dataStatus } from '@/api/tableData'
  import { getStationdata, postRanklist, getRankAllList} from '@/api/api'

  export default {
    name: 'DataManagementPage',
    components: {
      'TopDate': TopDate
    },
    data() {
      return {
        allData: [],
        productSaleList: [],
        productSaleColumns: [],
        productAccessList: [],
        productAccessColumns: [],
        vendorSaleList: [],
        vendorsaleColumns: [],
        cooperationList: [],
        cooperationColumns: []
      }
    },
    mounted() {
      this.productSaleColumns = productSaleTable
      this.productAccessColumns = productAccessTable
      this.vendorsaleColumns = vendorSaleTable
      this.cooperationColumns = cooperationTable
      this.getStation()
      this.getInit()
    },
    methods: {
      getStation() {
        getStationdata()
          .then(res => {
            if(res.code != 200){
              this.$Message.warning(res.msg)
              return
            }
            let data = res.data
            this.allData = [
              {
                title: '全站访问量(次)：',
                data: data.traffic
              },
              {
                title: '全站销售量(件)：',
                data: data.saleNum
              },
              {
                title: '全站销售额(元)：',
                data: data.salePrice
              },
            ]
          })
          .catch(err => {
            this.$Message.error('获取全站数据失败', err)
          })
      },
      getInit(){
        getRankAllList().then(res => {
          if(res.code != 200){
            this.$Message.warning(res.msg)
            return
          }
          this.productSaleList = res.data.productSalesList
          this.productAccessList = res.data.productTrafficList
          this.vendorSaleList = res.data.vendorSalesList
          this.cooperationList = res.data.cooperationList
        }).catch(err => {
          this.$Message.error('排行榜请求失败' + err)
        })
      },
      postRanklistFun(startDate, endDate,status){
        postRanklist({
          startTime: startDate,
          endTime: endDate,
          status: status
        })
          .then(res => {
            if(res.code != 200){
              this.$Message.warning(res.msg)
              return
            }
            this.getData(status,res.data.list)
          })
          .catch(err => {
            this.$Message.error('全站销量前十排行榜获取失败',err)
          })
      },
      getData(status,list){
        switch (status){
          case dataStatus.commoditySales:
            this.productSaleList = list
            break
          case dataStatus.commodityTraffic:
            this.productAccessList = list
            break
          case dataStatus.vendorSales:
            this.vendorSaleList = list
          default:
            this.cooperationList = list
        }
      },
      //全站销量前十商品排行
      postProductSale(startDate, endDate) {
        this.postRanklistFun(startDate, endDate,dataStatus.commoditySales)
      },
      //全站访问量前十商品排行
      postProductAccess(startDate,endDate) {
        this.postRanklistFun(startDate, endDate,dataStatus.commodityTraffic)
      },
      //全站销量前十厂商
      postVendorSale(startDate,endDate) {
        this.postRanklistFun(startDate, endDate,dataStatus.vendorSales)
      },
      //全站前十厂商、商家合作次数
      postCooperation(startDate, endDate) {
        this.postRanklistFun(startDate, endDate,dataStatus.cooperation)
      }
    }
  }
</script>

<style scoped>
  .headClass {
    background: white;
  }

  .headTitleClass {
    color: #000000;
    text-align: center;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
  }

  .headContentClass {
    color: #1890FF;
    text-align: center;
    font-size: 32px;
    padding-top: 0px;
    height: 68px;
  }

  .spanHeadClass {
    color: #000000;
    font-size: 14px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    margin-left: 10px;
  }
</style>

