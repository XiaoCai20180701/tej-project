<template>
  <div>
    <!-- 替换页面中 表格上面的整个搜索区域的插槽form,默认是显示-->
    <slot name="form">
      <Form :label-width="56" class="tej-form" @submit.native.prevent>
        <!-- 替换页面中 筛选条件的插槽filter,默认是显示-->
        <slot name="filter">
          <FormItem label="筛选：" class="tej-label">
            <div>
              <slot name="area">
                <RadioGroup v-model="checkedArea" @on-change="areaChange">
                  <!--<Radio v-model="checkedAllArea">全部</Radio>-->
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
              <slot name="extra"></slot>
            </div>
            <!--<div>-->
            <!--<slot name="age">-->
            <!--<RadioGroup v-model="checkedAge" @on-change="ageChange">-->
            <!--<Radio v-for="(item, index) in age"-->
            <!--:key="index"-->
            <!--:label="item.id"-->
            <!--class="tej-radio"-->
            <!--&gt;{{item.name}}-->
            <!--</Radio>-->
            <!--</RadioGroup>-->
            <!--</slot>-->
            <!--</div>-->
          </FormItem>
          <Divider/>
        </slot>
        <div class="tej-table-extra">
          <Row>
            <Col span="19">
            <slot name="search">
              <div class="tej-table-search-box">
                <Input v-model="keywords"
                       :placeholder="inputText"
                       class="tej-search-input"
                       clearable
                       @on-change="inputChange"
                       @keyup.enter.native="searchClick(keywords)"
                />
                <Button type="primary" class="tej-search-btn" @click="searchClick(keywords)">搜索</Button>
              </div>
            </slot>
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
        :loading = "showLoading"
        :columns="columnsData"
        :data="tableData"
        v-if="tableData.length >= 0"
      >
        <template slot-scope="{ row }" slot="licenceImg">
          <span>已上传</span><a class="tej-look-txt" @click="viewImg(row.licenceImg)">查看</a>
        </template>
        <template slot-scope="{ row }" slot="environmentImgList">
          <span>已上传</span><a class="tej-look-txt" @click="viewImgList(row.environmentImgList)">查看</a>
        </template>
        <template slot-scope="{ row }" slot="trademarkImgList">
          <span>已上传</span><a class="tej-look-txt" @click="viewImgList(row.trademarkImgList)">查看</a>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <!--<a style="margin-right: 5px" @click="showDetail(row)">查看详情</a>-->
          <!-- -->
          <slot name="action-btn" :row="row"></slot>
        </template>
      </Table>
      <slot name="page">
        <div class="tej-page-box" v-if="tableData.length != 0">
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
      },
      showLoading: {  //表格加载状态
        type: Boolean
      }
    },
    data() {
      return {
        area: [],
        age: [],
        checkedAllArea: 999,
        checkedArea: 0,
        checkedAge: 0,
        keywords: '',
      }
    },
    created() {
    },
    mounted() {
      this.getProductFilterFun()
      console.log('路由', this.$route.name)
    },
    methods: {
      searchClick() {
        this.$emit('keywords-change-callback', this.keywords)
      },
      inputChange(e) {
        console.log('输入框内容', e.target.value)
        this.keywords = e.target.value
      },
      areaChange(e) {
        console.log('radio area', e)
        e == 0 ? e = null : e
        this.$emit('area-change-callback', e)
      },
      ageChange(e) {
        console.log('radio age', e)
        this.$emit('age-change-callback', e)
      },
      getProductFilterFun() {
        getProductFilter()
          .then(res => {
            let area = res.data.area
            let firstArea = [{id: 0, name: '全部'}]
            this.area = [...firstArea, ...area]
            this.checkedArea = this.area[0].id
          })
          .catch(err => {
            console.log('获取筛选条件失败!!', err)
            this.$Message.error({
              content: '获取筛选条件失败'
            })
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
      },
      viewImg(imgurl){
        //查看图片
        this.$Modal.info({
          render: (h) => {
            return h('img', {
              domProps: {
                src: this.$IMG_URL + imgurl,
                width: 375
              }
            }
            )
          }
        })
      },
      viewImgList(imgList){
        if(imgList == []){
          this.$Message.warning('没有上传图片')
          return
        }else {
          this.$Modal.info({
            width: 700,
            render: (h, params)=> {
              console.log('params!!!!!!',params)
              return h('div',imgList.map(item => {
                return h('img',{
                  domProps: {
                    src: this.$IMG_URL + item.url,
                    width: 200,
                    height: 200
                  }
                })
              }))
            }
          })
        }
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
  .tej-look-txt {
    margin-left: 10px;
  }
</style>



