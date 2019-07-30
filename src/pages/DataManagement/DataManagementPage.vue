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
  import {
    postProductList,
    getStationdata,
    postRanklist
} from '@/api/api'
  import {get,post} from '@/utils/http'

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
      getInit(){
        //默认以当前时间为开始时间和结束时间
        let startDate = this.$Moment().locale('zh-cn').format('YYYY-MM-DD')
        let endDate = this.$Moment().locale('zh-cn').format('YYYY-MM-DD')
        this.getList(startDate,endDate)
      },
      getStation() {
        getStationdata()
          .then(res => {
            let data = res.data
            this.allData = [
              {
                title: '全站访问量(次)：',
                data: data.accessNum
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
      //全站销量前十商品排行
      async postProductSale(startDate, endDate) {
        await  postRanklist({
          startDate: startDate,
          endDate: endDate,
          status: dataStatus.commoditySales
        })
      },
      //全站访问量前十商品排行
      async postProductAccess(startDate,endDate) {
        await  postRanklist({
          startDate: startDate,
          endDate: endDate,
          status: dataStatus.commodityTraffic
        })
      },
      //全站销量前十厂商
      async postVendorSale(startDate,endDate) {
        await  postRanklist({
          startDate: startDate,
          endDate: endDate,
          status: dataStatus.vendorSales
        })
      },
      //全站前十厂商、商家合作次数
      async postCooperation(startDate, endDate) {
        await  postRanklist({
          startDate: startDate,
          endDate: endDate,
          status: dataStatus.cooperation
        })
      },
      async getList(startDate,endDate) {
        await Promise.all([
          this.postProductSale(startDate,endDate),
          this.postProductAccess(startDate,endDate),
          this.postVendorSale(startDate,endDate),
          this.postCooperation(startDate,endDate),
          ]).then(res=> {
          console.log('list~~~~~~~~~~',res)
        })
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

