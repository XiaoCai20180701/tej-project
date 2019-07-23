<template>
  <div class="tej-main">
    <Row :gutter="18">
      <i-col span="5">
        <div class="tej-vendor-baseinfo">
          <div class="avatar"
               style="background-image: url('http://b-ssl.duitang.com/uploads/item/201801/04/20180104151926_TH2xE.jpeg')"></div>
          <h2 class="title">{{vendorDetail.vendorName}}</h2>
          <div>
            <p class="item"><span class="label">厂商编号：</span><span>{{vendorDetail.vendorId}}</span></p>
            <p class="item"><span class="label">联系人：</span><span>{{vendorDetail.vendorContactName}}</span></p>
            <p class="item"><span class="label">联系号码：</span><span>{{vendorDetail.vendorContactMobile}}</span></p>
            <p class="item"><span class="label">联系地址：</span><span class="address">{{vendorDetail.vendorAddress}}</span>
            </p>
          </div>
        </div>
      </i-col>
      <i-col span="19">
        <div class="tej-vendor-detailinfo">
          <Row :gutter="20">
            <i-col span="10">
              <div class="data-info">
                <div class="left">
                  <dl>
                    <dt>- 销售数据</dt>
                    <dd>日销售量：{{vendorDetail.salesDayVendor}}件</dd>
                    <dd>周销售量：{{vendorDetail.salesWeekVendor}}件</dd>
                    <dd>月销售量：{{vendorDetail.salesMonthVendor}}件</dd>
                  </dl>
                </div>
                <div class="right">
                  <dl>
                    <dt>- 访问数据</dt>
                    <dd>日访问量：{{vendorDetail.trafficDayVendor}}件</dd>
                    <dd>周访问量：{{vendorDetail.trafficWeekVendor}}件</dd>
                    <dd>月访问量：{{vendorDetail.trafficMonthVendor}}件</dd>
                  </dl>
                </div>

              </div>
            </i-col>
            <i-col span="10">
              <div class="environment-imglist">
                <!--<Carousel-->
                <!--v-model="environmentImgIndex"-->
                <!--autoplay-->
                <!--:height="148"-->
                <!--&gt;-->
                <!--<CarouselItem v-for="(item, index) in vendorDetail.vendorEnvironmentImg" :key="index">-->
                <!--<img src="http://dummyimage.com/200x100/4A7BF7&text=Hello"/>-->
                <!--</CarouselItem>-->
                <!--</Carousel>-->
              </div>
            </i-col>
          </Row>
          <div class="tej-vendor-table">
            <TejTable :columns-data="columnsData"
                      :table-data="tableData"
                      :page="page"
                      @page-change-callback="pageChange"
                      @pageSize-change-callback="pageSizeChange"
            >
              <div slot="form"></div>
                <div slot="action-btn">
                  <a @click="gotoEdit(1111)">编辑商品</a>
                  <a>已启用</a>
                </div>
            </TejTable>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import TejTable from '@/components/TejTable'
  import {postVendorDetail} from '@/api/api'

  export default {
    name: 'CheckedVendorDetailPage',
    components: {
      'TejTable': TejTable
    },
    data() {
      return {
        productShow: 0,  //未启用
        environmentImgIndex: 0,
        columnsData: [
          {
            'title': '编号',
            'key': 'productId'
          },
          {
            'title': '商品类别',
            'key': 'productType'
          },
          {
            'title': '商品名称',
            'key': 'productName'
          },
          {
            'title': '零售价',
            'key': 'priceSale'
          },
          {
            'title': '库存',
            'key': 'inventory'
          },
          {
            'title': '访问量',
            'key': 'traffic'
          },
          {
            'title': '销量',
            'key': 'salesNumber'
          },
          {
            title: '操作',
            slot: 'action',
          }
        ],
        tableData: [],
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        vendorDetail: {}
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      gotoEdit(id) {
        this.$router.push({
          name: 'EditProductPage',
          query: {productId: id},
          params: {isEdit: true}
        })
      },
      pageChange(page) {
        this.page = page
        this.getList()
      },
      pageSizeChange(page) {
        this.page = page
        this.getList()
      },
      getList() {
        postVendorDetail().then(res => {
          this.vendorDetail = res.data
          this.tableData = res.data.productInfo.productList
        }).catch(err => {
          this.$Message.error('获取厂商详情失败', err)
        })
      }
    }
  }
</script>

<style scoped>
  .tej-vendor-baseinfo {
    padding: 12px 12px 60px;
    background: #fff;
  }

  .tej-vendor-baseinfo .avatar {
    width: 250px;
    height: 250px;
    margin: 12px auto;
    background-size: cover;
  }

  .tej-vendor-baseinfo .title {
    margin: 25px 0 29px;
    text-align: center;
  }

  .tej-vendor-baseinfo .item {
    margin: 10px 0;
    font-size: 14px;
  }

  .tej-vendor-baseinfo .label {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
    text-align: right;
  }

  .tej-vendor-baseinfo .address {
    float: left;
    margin-left: 90px;
    margin-top: -21px;
  }

  .tej-vendor-detailinfo {
    /*padding: 12px;*/
  }

  .data-info {
    display: flex;
    padding: 12px;
    background: #fff;
    font-size: 14px;
  }

  .data-info .left {
    flex: 1;
  }

  .data-info dd {
    margin: 10px 0 10px 38px;
  }

  .data-info .right {
    flex: 1;
  }

  .environment-imglist {
    background: #fff;
  }

  .tej-vendor-table {
    margin-top: 15px;
    background: #fff;
  }
</style>





