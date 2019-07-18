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
      <TopDate tag="0" list-name="全站销量前十商品排行" :table-data="productsaleArray" :columns-data="productsaleColumns"
                   @dateChange="dateChange"></TopDate>
      </Col>
      <Col span="12">
      <TopDate tag="1" list-name="全站访问量前十商品排行" :table-data="productaccessArray" :columns-data="productaccessColumns"
                   @dateChange="dateChange"></TopDate>
      </Col>
      <Col span="12">
      <TopDate tag="2" list-name="全站销量前十厂商" :table-data="vendorsaleArray" :columns-data="vendorsaleColumns"
                   @dateChange="dateChange"></TopDate>
      </Col>
      <Col span="12">
      <TopDate tag="3" list-name="全站前十厂商、商家合作次数" :table-data="cooperationArray" :columns-data="cooperationColumns"
                   @dateChange="dateChange"></TopDate>
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
        timeArray: [
          {
            startTime: '',
            endTime: ''
          },
          {
            startTime: '',
            endTime: ''
          },
          {
            startTime: '',
            endTime: ''
          },
          {
            startTime: '',
            endTime: ''
          }
        ],
        productsaleArray: [],
        productsaleColumns: [],
        productaccessArray: [],
        productaccessColumns: [],
        vendorsaleArray: [],
        vendorsaleColumns: [],
        cooperationArray: [],
        cooperationColumns: []
      }
    },
    mounted() {
      this.productsaleColumns = productSaleTable
      this.productaccessColumns = productAccessTable
      this.vendorsaleColumns = vendorSaleTable
      this.cooperationColumns = cooperationTable
      this.getStation()
      this.postProductsale()
      this.postProductaccess()
      this.postVendorsale()
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
      postProductsale() {
        console.log(this.timeArray[0].startTime, this.timeArray[0].endTime);
        postProductsaletop({
          startTime: this.timeArray[0].startTime,
          endTime: this.timeArray[0].endTime
        })
          .then(res => {
            console.log('postProductsaletopOk', res)
            this.productsaleArray = res.data.list
            res.data.list.map(item => {
              this.productsaleColumns.map((pro, index) => {
                pro['key'] = Object.keys(item)[index]
              })
            })
          })
          .catch(err => {
            this.$Message.error('获取全站销量前十排行榜失败',err)
          })
      },
      postProductaccess() {
        console.log(this.timeArray[1].startTime, this.timeArray[1].endTime);
        postProductaccesstop({
          startTime: this.timeArray[1].startTime,
          endTime: this.timeArray[1].endTime
        })
          .then(res => {
            console.log('postProductaccesstopOk', res)
            this.productaccessArray = res.data.list
            res.data.list.map(item => {
              this.productaccessColumns.map((pro, index) => {
                pro['key'] = Object.keys(item)[index]
              })
            })
          })
          .catch(err => {
            console.log('fail', err)
          })
      },
      postVendorsale() {
        postVendorsaletop({
          startTime: this.timeArray[2].startTime,
          endTime: this.timeArray[2].endTime
        })
          .then(res => {
            console.log('postVendorsaletopOk', res);
            this.vendorsaleArray = res.data.list
            res.data.list.map(item => {
              this.vendorsaleColumns.map((pro, index) => {
                pro['key'] = Object.keys(item)[index]
              })
            })
          })
          .catch(err => {
            console.log('fail', err)
          })
      },
      postCooperation() {
        postCooperationtop({
          startTime: this.timeArray[3].startTime,
          endTime: this.timeArray[3].endTime
        })
          .then(res => {
            console.log('postCooperationtopOk', res);
            this.cooperationArray = res.data.list;
            res.data.list.map(item => {
              this.cooperationColumns.map((pro, index) => {
                pro['key'] = Object.keys(item)[index]
              })
            })
            console.log('cooperationArray', this.cooperationArray);
          })
          .catch(err => {
            console.log('fail', err)
          })
      },

      dateChange(tag, objc) {
        console.log('objc', objc);

        this.timeArray[tag].startTime = this.$Moment(objc[0]).valueOf();
        this.timeArray[tag].endTime = this.$Moment(objc[1]).valueOf();
        console.log('timeArray', this.timeArray);
        switch (Number(tag)) {
          case 0:
          {
            console.log('tag', tag);
            this.postProductsale();
          }
            break;
          case 1:
          {
            console.log('tag', tag);
            this.postProductaccess();
          }
            break;
          case 2:
          {
            console.log('tag', tag);
            this.postVendorsale();
          }
            break;
          case 3:
          {
            console.log('tag', tag);
            this.postCooperation();
          }
            break;
          default:
            break;
        }

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

