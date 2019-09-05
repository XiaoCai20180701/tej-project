<template>
  <div class="tej-discount-table">
    <TejTable :columns-data="columns"
              :table-data="discountProductList"
              :page="discountProductPage"
              :showLoading="showLoading"
    >
      <div slot="form">
        <div slot="search" class="tej-discount-search">
          <div class="tej-table-search-box">
            <Input v-model="keywords" placeholder="请输入商品名称或编号" class="tej-search-input" clearable
                   @on-change="inputChange"/>
            <Button type="primary" class="tej-search-btn" @click="searchClick(keywords)">搜索</Button>
          </div>
        </div>
      </div>
      <template slot-scope="{ row, index }" slot="action-btn">
        <Tag :color="tagColor(row.status)" style="margin-right: 5px">{{tagText(row.status)}}</Tag>
        <a @click="addProduct(row)" v-if="row.status == 0">点击添加</a>
        <a @click="replaceProduct(row)" v-else>点击替换</a>
        <Modal
          v-model="replaceModal"
          title="折扣情况"
          transfer
          width="676"
        >
          <div class="tej-old-discount">
            <div class="title">原折扣</div>
            <div class="content">
              <div>
                <span>折扣力度：{{discountInfo.discount}}折</span>
                <span class="share">能否与优惠券共用：{{showShareType(discountInfo.shareStatus)}}</span>
              </div>
              <div>
                <span>折扣时间：{{discountInfo.startTime}} - {{discountInfo.endTime}}</span>
                <span class="status">{{discountInfo.activationStatus}}</span>
              </div>
              <div>
                <span>使用门槛：{{showThreshold(discountInfo.discountThreshold)}}</span>
              </div>
            </div>
          </div>
          <div class="tej-new-discount">
            <div class="title">新折扣</div>
            <div class="content">
              <div>
                <span>折扣力度：{{discountModalInfo.discount}}折</span>
                <span class="share">能否与优惠券共用：{{showShareType(discountModalInfo.shareStatus)}}</span>
              </div>
              <div>
                <span>折扣时间：{{discountModalInfo.startTime}} - {{discountModalInfo.endTime}}</span>
              </div>
              <div><span>使用门槛：{{showThreshold(discountModalInfo.discountThreshold)}}</span> </div>
            </div>
          </div>
        </Modal>
      </template>

    </TejTable>
  </div>
</template>

<script>
  import { UsableDiscountProductTable,addStatus, shareType } from  '@/api/tableData'
  import TejTable from '@/components/TejTable'
  import { postDiscountInfo } from '@/api/api'
  import bus from '@/utils/bus'

  export default {
    name: 'DiscountTable',
    components: {
      TejTable
    },
    props: {
      discountProductPage: Object,
      discountProductList: Array
    },
    data(){
      return {
        columns:[],
        list: [],
        ids: [],
        replaceModal: false,
        showLoading: false,
        keywords: '',
        page: {},
        productIdList: [],
        discountInfo: {},
        discountModalInfo: {}
      }
    },
    computed: {
      tagText() {
        return function (status) {
          return status == addStatus.notAdded ? '未添加' : '已添加'
        }
      },
      tagColor() {
        return function (status) {
          return  status == addStatus.notAdded ? 'orange' : 'magenta'
        }
      },
      showThreshold(){
        return function (threshold) {
          return  threshold == '' ? '无' : '满'+  threshold + '元使用'
        }
      },
      showShareType(){
        return function (shareStatus) {
          return  shareStatus == shareType.notShare ? '不共用' : '共用'
        }

      }
    },
    mounted(){
      this.columns = UsableDiscountProductTable
    },
    methods: {
//      ok(){
//        this.replaceModal= false
//      },
      discountFormCallback(){
        bus.$on('discount-form-callback',(data)=>{
          console.log('新增折扣表单 折扣弹窗',data)
          this.discountModalInfo = data
        })
        console.log('discountModalInfo',this.discountModalInfo)
        if(Object.keys(this.discountModalInfo).length == 0){
          this.$Message.error('请先填写折扣表单信息')
          return
        }

      },
        addProduct(row) {
          console.log('productId', row.productId)
          row.status = 1
          this.getDiscountList(row)
        },
        getDiscountList(row) {
          this.productIdList.push(row.productId)
          this.$emit('discount-product-list-callback', {
            type: 'add',
            productIdList: this.productIdList
          })
        },
        replaceProduct(row){
          this.getDiscountInfo(row.productId)
      //    this.discountFormCallback()
          this.replaceModal = true
          this.replaceDiscountList(row)
        },
      replaceDiscountList(row){
//        row.status = 0
      //  this.productIdList.splice(this.productIdList.findIndex(item => item.productId === row.productId), 1)
        this.productIdList.push(row.productId)
        console.log('替换 list',this.productIdList)
        this.$emit('discount-product-list-callback', {
          type: 'replace',
          productIdList: this.productIdList
        })
      },
      inputChange(e) {
        console.log('eeeeeeeeeeeee', e.target.value)
      },
      searchClick(keywords) {
        console.log('搜索')
        this.keywords = keywords
        this.$emit('discount-search-callback',keywords)
      },
      getDiscountInfo(productId){
        postDiscountInfo({productId: productId}).then(res => {
          this.discountInfo = res.data
        }).catch(err => {
          this.$Message.error('获取商品折扣信息失败' + err)
        })
      }
    }
  }
</script>

<style>
  .tej-discount-table .tej-table {
    min-height: 50vh;
  }

  .tej-old-discount {
    display: flex;
    padding: 20px;
    border: 1px solid #df8d14;
    background: #fffbed;
  }

  .tej-new-discount {
    display: flex;
    padding: 20px;
    margin-top: 20px;
    border: 1px solid #14a8df;
    background: #edfaff;
  }

  .tej-old-discount .title,.tej-new-discount .title {
    flex: 1;
  }

  .tej-old-discount .content,.tej-new-discount .content {
    flex: 4;
  }

  .tej-old-discount .share,.tej-new-discount .share {
    display: inline-block;
    margin-left: 80px;
  }

  .tej-old-discount .status,.tej-new-discount .status {
    display: inline-block;
    margin-left: 60px;
  }
</style>

