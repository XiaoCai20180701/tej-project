<template>
  <div>
    <div style="background: white; padding: 20px 40px 20px 35px;">
      <div  v-if="isAdmin == 1">
        <Row :gutter="8">
          <Col span="8">
            <Vendor :vendor-list="vendorList" @vendor-change-callback="vendorChangeCallback"></Vendor>
          </Col>
          <Col span="4" style="text-align: left">
             <Button type="primary" @click="searchClick">搜索</Button>
          </Col>
        </Row>
      </div>
      <div v-else>
        <Button icon="md-add" type="primary" @click = "modal = true"> 新增折扣商品</Button>
        <Modal class="tej-modal" v-model="modal" :closable="false" :mask-closable="false" width=80vw>
          <div v-if="modal == true">
            <AddCouponProduct
                style="padding: 10px;min-height: 450px;max-height: 750px;overflow: auto;"
                :is-discount= "isDiscount" ></AddCouponProduct>
          </div>
          <div slot="footer" style="text-align: center;padding: 20px;">
            <Button class="b_style" @click="modalCancel">取消</Button>
            <Button class="b_style" style="color: white; background: #409EFF;margin-left: 25px;" @click="modalOk">确认
            </Button>
          </div>
        </Modal>
        <Button icon="ios-trash-outline" style="margin-left: 15px;" @click = "batchDelete">批量删除折扣商品</Button>
      </div>

    </div>
    <div style="background: white; margin-top: 10px;height: 85vh;">
      <div style="padding: 10px;">折扣商品列表</div>
      <Table :columns="columns"
             :data="data"
             :loading="showLoading">
      </Table>
      <div class="tej-page-box" v-if="data.length != 0">
        <Page
          :total="page.total"
          show-sizer
          show-total
          class="tej-page"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"/>
      </div>
    </div>
  </div>
</template>

<script>
  import AddCouponProduct from './AddCouponProduct'
  import { StytemRole, DiscountTable } from '@/api/tableData'
  import  Vendor from '@/components/Vendor'
  import { getVendorList,postDiscountList } from  '@/api/api'

  export default {
    name: "MarketingDiscountPage",
    components: {
      AddCouponProduct,
      Vendor
    },
    data() {
      return {
        isAdmin: StytemRole.back,
        keywords:'',
        vendorList: [],
        isDiscount: 1,
        modal: false,
        selectColumns:[],
        columns: [],
        data: [],
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        showLoading: false
      }
    },
    mounted() {
      this.columns = DiscountTable
      this.getVendorList()
    },
    methods: {
      pageChange(page) {
        this.page.index = page
        this.getList()
      },
      pageSizeChange(page) {
        this.page.size = page
        console.log('pageSize',page)
        this.getList()
      },
      vendorChangeCallback(val){
        console.log('厂家列表回调',val)
        this.keywords = val
      },
      searchClick(){
        this.getList()
      },
      modalOk() {
        // console.log('ok value', this.value)
        this.modal = false
      },
      modalCancel() {
        console.log('cancel')
        this.modal = false
      },

        sectionChange(item){
          console.log("section",item);
          this.selectColumns = item;
        },
        batchDelete(){
          console.log("selectColumns",this.selectColumns);
        },
        deleteAction(item){
          console.log("delete",item);
        },
        showDetail(item){
          console.log("show",item);
          this.$router.push({
            name: 'CouponDetail',
            params: item
          })
        },
      getVendorList() {
        getVendorList('').then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            return
          }
          this.vendorList = res.data.list
        })
          .catch(err => {
            this.$Message.error('获取厂家列表失败', err)
          })
      },
      getList() {
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          keywords: this.keywords
        }
        this.showLoading = true
        postDiscountList(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              localStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.showLoading = false
          this.data = res.data.list
          this.page = {
            index: res.data.page,
            size: res.data.pageSize,
            total: res.data.total
          }
        }).catch(err => {
          this.showLoading = false
          this.$Message.error('获取优惠券列表失败' + err)
        })
      }
    }
  }
</script>

<style scoped>
</style>
