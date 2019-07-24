<template>
  <div>
    <slot name="form">
      <Form :label-width="56" class="tej-form">
        <FormItem label="筛选：" class="tej-label">
          <div>
            <slot name="area">
              <RadioGroup v-model="checkedArea" @on-change="areaChange">
                <Radio v-for="(item, index) in area"
                       :key="index"
                       :label="item.id"
                       class="tej-radio"
                >{{item.name}}
                </Radio>
              </RadioGroup>
            </slot>
          </div>
          <div>
            <slot name="age">
              <RadioGroup v-model="checkedAge" @on-change="ageChange">
                <Radio v-for="(item, index) in age"
                       :key="index"
                       :label="item.id"
                       class="tej-radio"
                >{{item.name}}
                </Radio>
              </RadioGroup>
            </slot>
          </div>
        </FormItem>
        <Divider/>
        <div class="tej-table-extra">
          <Row>
            <Col span="19">
            <div class="tej-table-search-box">
              <Input v-model="keywords" :placeholder="inputText" class="tej-search-input" clearable
                     @on-change="inputChange"/>
              <Button type="primary" class="tej-search-btn" @click="searchClick(keywords)">搜索</Button>
            </div>
            </Col>
            <Col span="5">
            <div class="tej-table-btngroup">
              <slot name="btn"></slot>
            </div>
            </Col>
          </Row>
        </div>
      </Form>
    </slot>
    <div class="tej-table">
      <Table
        :columns="columnsData"
        :data="tableData"
        v-if="tableData.length > 0"
      >
        <template slot-scope="{ row, index }" slot="action">
          <a style="margin-right: 5px" @click="showDetail(row)">查看详情</a>
          <slot name="action-btn"></slot>
        </template>
      </Table>
      <slot name="page">
        <div class="tej-page-box">
          <Page
            :total="page.total"
            show-sizer
            show-total
            class="tej-page"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"/>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import {getProductFilter} from '@/api/api'

  export default {
    props: {
      inputText: {
        type: String,
        require: false,
        default: '请输入搜索关键词'
      },
      columnsData: {
        type: Array,
        required: true
      },
      tableData: {
        type: Array,
        required: true
      },
      page: {
        type: Object
      }
    },
    data() {
      return {
        area: [],
        age: [],
        checkedArea: 0,
        checkedAge: 0,
        keywords: ''
      }
    },
    created() {
    },
    mounted() {
      this.getProductFilterFun()
      console.log('路由', this.$route.name)
    },
    methods: {
      showDetail(row) {
        console.log('查看详情', row)
        switch (this.$route.name) {
          case 'CheckedPage':
            this.$router.push({
              name: 'AuditStatusPage',
              query: {retailId: row.retailId}
            })
            break
          case 'UnCheckedPage':
            this.$router.push({
              name: 'AuditStatusPage',
              query: {retailId: row.retailId},
              params: {isVendor: false}
            })
            break
          case 'ProductManagementPage':
            this.$router.push({
              name: 'EditProductPage',
              query: {productId: row.id},
              params: {isEdit: true}
            })
            break
          case 'CheckedVendorPage':
            this.$router.push({
              name: 'CheckedVendorDetailPage',
              query: {vendorId: row.vendorId},
              params: {page: 1, pageSize: 10}
            })
            break
          case 'UnCheckedVendorPage':
            this.$router.push({
              name: 'AuditStatusPage',
              query: {vendorId: row.vendorId},
              params: {isVendor: true}
            })
            break
        }
      },
      searchClick() {
        this.$emit('keywords-change-callback', this.keywords)
      },
      inputChange(e) {
        console.log('输入框内容', e.target.value)
        this.keywords = e.target.value
      },
      areaChange(e) {
        console.log('radio area', e)
        this.$emit('area-change-callback', e)
      },
      ageChange(e) {
        console.log('radio age', e)
        this.$emit('age-change-callback', e)
      },
      getProductFilterFun() {
        getProductFilter()
          .then(res => {
            this.area = res.data.area
            this.checkedArea = this.area[0].id
            this.age = res.data.age
            this.checkedAge = this.age[0].id
            console.log('filter', res.data)
          })
          .catch(err => {
            this.$Message.error('获取筛选条件失败', err)
          })
      },
      pageChange(i) {
        console.log('page', i)
        this.page.index = i
        this.$emit('page-change-callback', this.page)
      },
      pageSizeChange(s) {
        console.log('pageSize', s)
        this.page.size = s
        this.$emit('pageSize-change-callback', this.page)
      }
    }
  }
</script>

<style>
  .tej-form {
    padding: 15px;
    padding-bottom: 0;
    margin-bottom: 20px;
    background: #fff;
  }

  .tej-table {
    min-height: 60vh;
    padding-bottom: 15px;
    background: #fff;
  }

  .tej-label > :first-child {
    font-size: 14px;
  }

  .ivu-radio-inner, .ivu-radio-inner:after {
    border-radius: 0 !important;
  }

  .tej-radio {
    min-width: 70px;
  }

  .tej-table-search-box {
    display: flex;
    flex-direction: row;
    width: 360px;
    margin-bottom: 20px;
  }

  .tej-search-input {
    flex: 5;
  }

  .tej-search-btn {
    flex: 1;
    margin-left: 10px;
  }

  .tej-table-btngroup {
    text-align: right;
  }
</style>



