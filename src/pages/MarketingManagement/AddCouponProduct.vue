<template>
  <div>
    <!-- <Table border :columns="columns" :data="data" style="width: 100%;"></Table> -->
    <div style="background: white; height: 120px;margin-top: 10px;" v-if="isDiscount == 1">
      <Row>
        <Col span="8">
        <Form :model="formInline" :label-width="85">
          <FormItem label="折扣力度:" style="width: 80%">
            <Select v-model="formInline.discounts" clearable filterable >
              <Option v-for="item in discountsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <FormItem label="折扣时间:">
            <Row>
              <Col span="11">
              <DatePicker type="date" placeholder="请输入初始时间" v-model="formInline.startTime"></DatePicker>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
              <DatePicker type="date" placeholder="请输入结束时间" v-model="formInline.endTime"></DatePicker>
              </Col>
            </Row>
          </FormItem>
        </Form>
        </Col>
        <Col span="12">
        <Form :model="formInline" :label-width="125">
          <FormItem label="是否与优惠劵共用:">
            <RadioGroup v-model="formInline.public">
              <Radio label="1">共用</Radio>
              <Radio label="0">不共用</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="优惠劵名称:">
            <Row :gutter="8">
              <Col span="4">
              <Input type="number" v-model="formInline.minAmount" placeholder="满">
              </Input>
              </Col>
              <Col span="4" style="text-align: left">可用</Col>
            </Row>
          </FormItem>
        </Form>
        </Col>
      </Row>


    </div>
    <TejTable :columns-data="columns" :table-data="data" :page="page" :showLoading="showLoading" @page-change-callback='pageChangeCallback'
      @pageSize-change-callback='pageSizeChangeCallback' @coupon-action-callback='couponActionCallback'>
      <div slot="form">
        <div slot="search">
          <div class="tej-table-search-box">
            <Input v-model="keywords" placeholder="请输入商品名称或编号" class="tej-search-input" clearable @on-change="inputChange" />
            <Button type="primary" class="tej-search-btn" @click="searchClick(keywords)">搜索</Button>
          </div>
        </div>
      </div>

    </TejTable>
  </div>
</template>

<script>
  import TejTable from '@/components/TejTable'
  export default {
    name: "AddCouponProduct",
    components: {
      TejTable: TejTable
    },
    props: {
      isDiscount: Number,
      productArray: Array
    },
    data() {
      return {
        formInline: {
          discounts: '',
          startTime: '',
          endTime: '',
          public: '0',
          minAmount: ''
        },
        discountsList: [{
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
        page: {
          index: 1,
          size: 8,
          total: 50
        },
        showLoading: false,
        keywords: '',
        columns: [{
            title: '编号',
            key: 'number'
          },
          {
            title: '商品类型',
            key: 'productType'
          },
          {
            title: '商品名称',
            key: 'productName'
          },
          {
            title: '零售价',
            key: 'price'
          },
          {
            title: '库存',
            key: 'stock'
          },
          {
            title: '访问量',
            key: 'traffic'
          },
          {
            title: '销量',
            key: 'sales'
          },
          {
            title: '最低批发价',
            key: 'minPrice'
          },
          {
            title: '最高批发价',
            key: 'maxPrice'
          },
          {
            title: '优惠劵情况',
            slot: 'couponAction',
            width: 135
          }
        ],
        data: [{
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20,
            status: 1
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20,
            status: 0
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20,
            status: 1
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20,
            status: 0
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20,
            status: 0
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20,
            status: 1
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20,
            status: 1
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20,
            status: 1
          }
        ],
      }
    },
    mounted() {
      console.log('isdiscount', this.isDiscount)
    },
    methods: {
      pageChangeCallback(page) {
        console.log('page callback', page)
      },
      pageSizeChangeCallback(pagesize) {
        console.log('pagesize callback', pagesize)
      },
      inputChange(e) {
        console.log('eeeeeeeeeeeee', e.target.value)
      },
      couponActionCallback(row) {
        console.log('eeeeeeeeeeeee', row.status)
        if (row.status == 1) {
          console.log('已添加- 取消添加操作')
        } else {
          console.log('未添加- 添加操作')
        }
      },
      searchClick() {
        console.log('搜索')
      }
    }

  }
</script>

<style>
</style>
