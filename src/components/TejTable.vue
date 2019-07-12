<template>
  <div>
    <Form :label-width="56" >
      <FormItem label="筛选：" class="tej-label">
        <div>
          <RadioGroup v-model="checkedArea" @on-change="areaChange">
            <Radio v-for="(item, index) in area"
                   :key="index"
                   :label="item.id"
                   class="tej-radio"
            >{{item.name}}
            </Radio>
          </RadioGroup>
        </div>
        <div>
          <RadioGroup v-model="checkedAge" @on-change="ageChange">
            <Radio v-for="(item, index) in age"
                   :key="index"
                   :label="item.id"
                   class="tej-radio"
            >{{item.name}}
            </Radio>
          </RadioGroup>
        </div>
      </FormItem>
    </Form>
    <Table border :columns="columnsData" :data="tableData" v-if="tableData.length > 0">
      <template slot-scope="{ row, index }" slot="action">
        <a style="margin-right: 5px" @click="show(index)">查看详情</a>
      </template>
    </Table>
    <div class="tej-page-box">
        <Page :total="total" show-sizer show-total class="tej-page" @on-change="pageChange"  @on-page-size-change="pageSizeChange"/>
    </div>
  </div>
</template>

<script>
  import { getProductList, getAuditedlist, getApplylist, getProductFilter } from '@/api/api'
  import { productManagementTable, checkedRetailTable, unCheckedRetailTable } from '@/api/tableData'
  export default {
    data() {
      return {
        columnsData: [],
        tableData: [],
        page: 1,
        pageSize: 10,
        total: 1,
        area: [],
        age: [],
        checkedArea: 0,
        checkedAge: 0
      }
    },
    created(){
    },
    mounted(){
      this.getProductFilterFun()
      console.log('路由',this.$route.name)
      switch(this.$route.name){
        case 'ProductManagementPage':
          this.columnsData = productManagementTable
          this.getProductListFun(this.page, this.pageSize)
          break
        case 'CheckedPage':
          this.columnsData = checkedRetailTable
          this.getAuditedlistFun(this.page, this.pageSize)
          break
        case 'UnCheckedPage':
          this.columnsData = unCheckedRetailTable
          this.getApplylistFun(this.page, this.pageSize)
          break
      }
    },
    methods: {
      areaChange(e){
        console.log('radio area', e)
      },
      ageChange(e){
        console.log('radio age', e)
      },
      getProductFilterFun(){
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
      getProductListFun(page,pageSize) {
        getProductList({page:page,pageSize: pageSize}).then(res => {
          this.tableData = res.data.list
          this.total = res.data.total
          this.page = res.data.page
          this.pageSize = res.data.pageSize
          res.data.list.map((item) => {
//            console.log('key Object---------',Object.keys(item))
            this.columnsData.map((col,c) => {
              col['key'] = Object.keys(item)[c]
            })
          })
        })
          .catch(err => {
            this.$Message.error('获取商品列表失败',err)
          })
      },
      getAuditedlistFun(page,pageSize){
        getAuditedlist({page:page,pageSize: pageSize}).then(res => {
          this.tableData = res.data.list
          this.total = res.data.total
          this.page = res.data.page
          this.pageSize = res.data.pageSize
          res.data.list.map((item) => {
//            console.log('key Object---------',Object.keys(item))
            this.columnsData.map((col,c) => {
              col['key'] = Object.keys(item)[c]
            })
          })
        })
          .catch(err => {
            this.$Message.error('获取零售商已审核列表失败',err)
          })
      },
      getApplylistFun(page,pageSize){
        getApplylist({page:page,pageSize: pageSize}).then(res => {
          this.tableData = res.data.list
          this.total = res.data.total
          this.page = res.data.page
          this.pageSize = res.data.pageSize
          res.data.list.map((item) => {
            this.columnsData.map((col,c) => {
              col['key'] = Object.keys(item)[c]
            })
          })
        })
          .catch(err => {
            this.$Message.error('获取零售商待审核列表失败',err)
          })
      },
      pageChange(page) {
        switch(this.$route.name){
          case 'CheckedPage':
            this.getAuditedlistFun(page)
            break
          case 'UnCheckedPage':
            this.getApplylistFun(page)
            break
        }
      },
      pageSizeChange(pageSize){
        switch(this.$route.name){
          case 'CheckedPage':
            this.getAuditedlistFun(pageSize)
            break
          case 'UnCheckedPage':
            this.getApplylistFun(pageSize)
            break
        }
      }
    }
  }
</script>

<style>
  .tej-page-box {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }
  .tej-page {
    flex: 1;
    text-align: right;
    align-self: center;
  }
  .tej-label > :first-child {
    font-size: 14px;
  }
  .ivu-radio-inner,.ivu-radio-inner:after {
    border-radius: 0 !important;
  }
  .tej-radio {
    min-width: 70px;
  }
</style>



