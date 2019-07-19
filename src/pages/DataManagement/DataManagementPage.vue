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
  import { productSaleTable, productAccessTable, vendorSaleTable, cooperationTable } from '@/api/tableData'
  import {
    postProductList,
    getStationdata,
    postProductsaletop,
    postProductaccesstop,
    postVendorsaletop,
    postCooperationtop
  } from '@/api/api'

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
      this.postProductSale()
      this.postProductAccess()
      this.postVendorSale()
      this.postCooperation()
    },
    methods: {
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
      postProductSale(startDate, endDate) {
        postProductsaletop({
          startTime: startDate,
          endTime: endDate
        })
          .then(res => {
            console.log('postProductsaletopOk', res)
            this.productSaleList = res.data.list
            res.data.list.map(item => {
              this.productSaleColumns.map((pro, index) => {
                pro['key'] = Object.keys(item)[index]
              })
            })
          })
          .catch(err => {
            this.$Message.error('全站销量前十排行榜获取失败',err)
          })
      },
      //全站访问量前十商品排行
      postProductAccess(startDate,endDate) {
       // console.log(this.timeArray[1].startTime, this.timeArray[1].endTime);
        postProductaccesstop({
          startTime: startDate,
          endTime: endDate
        })
          .then(res => {
            console.log('全站访问量Ok', res)
            this.productAccessList = res.data.list
            res.data.list.map(item => {
              this.productAccessColumns.map((pro, index) => {
                pro['key'] = Object.keys(item)[index]
              })
            })
          })
          .catch(err => {
            this.$Message.error('全站访问量 获取失败', err)
          })
      },
      //全站销量前十厂商
      postVendorSale(startDate,endDate) {
        postVendorsaletop({
          startTime: startDate,
          endTime: endDate
        })
          .then(res => {
            this.vendorSaleList = res.data.list
            res.data.list.map(item => {
              this.vendorsaleColumns.map((pro, index) => {
                pro['key'] = Object.keys(item)[index]
              })
            })
          })
          .catch(err => {
            this.$Message.error('全站销量前十厂商 获取失败', err)
          })
      },
      //全站前十厂商、商家合作次数
      postCooperation(startDate, endDate) {
        postCooperationtop({
          startTime: startDate,
          endTime: endDate
        })
          .then(res => {
            this.cooperationList = res.data.list;
            res.data.list.map(item => {
              this.cooperationColumns.map((pro, index) => {
                pro['key'] = Object.keys(item)[index]
              })
            })
          })
          .catch(err => {
            this.$Message.error('全站前十厂商、商家合作次数 获取失败', err)
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

