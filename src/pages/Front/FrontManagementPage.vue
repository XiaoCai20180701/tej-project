<template>
  <div class="tej-front-management">
    <!-- PC端海报 -->
    <div class="tej-front-management-item">
      <h3 class="title">PC端</h3>
      <div>
        <p class="subtitle">轮播海报(注：尺寸 1920px * 380px)</p>
        <Form label-position="right" :label-width="100">
          <div v-for="(item, index) in formList">
            <FormItem :label="getTitle(item.id)">
              <Row>
                <i-col :xs="24" :sm="24" :md="10" :lg="10">
                  <Input v-model="item.poster == '' ? item.poster : $IMG_URL + item.poster" placeholder="轮播图链接"
                         clearable/>
                </i-col>
                <i-col :xs="24" :sm="24" :md="2" :lg="2">
                  <Upload :action="actionUrl"
                          :show-upload-list="false"
                          :headers="fileHeaders"
                          :on-success="(value) => handleSuccess('pc',item,index, value) "
                          :before-upload="(value) => handleBeforeUpload('pc',value)"
                          style="display: inline-block;cursor: pointer"
                  >
                    <a class="btn-txt">上传</a>
                  </Upload>
                  <a :href="$IMG_URL + item.poster" target="_blank">预览</a>
                  <span class="line">—</span>
                </i-col>
                <i-col :xs="24" :sm="24" :md="10" :lg="10">
                  <Input v-model="item.productLink == '' ? item.productLink : $IMG_URL + item.productLink" placeholder="商品链接" clearable/>
                </i-col>
                <i-col :xs="24" :sm="24" :md="2" :lg="2">
                  <a class="btn-txt" @click="openProductModal(item)">{{getAddText(item.productLink)}}</a>
                </i-col>
              </Row>
            </FormItem>
          </div>
        </Form>
      </div>
      <div>
        <p class="subtitle">小海报(注：尺寸 970px * 380px)</p>
        <Form label-position="right" :label-width="100">
          <div v-for="(item, index) in smallFormList">
            <FormItem :label="getSmallTitle(item.sequenceNumber)">
              <Row>
                <i-col :xs="24" :sm="24" :md="10" :lg="10">
                  <Input v-model="item.poster == '' ? item.poster : $IMG_URL + item.poster" placeholder="小海报链接"
                         clearable/>
                </i-col>
                <i-col :xs="24" :sm="24" :md="2" :lg="2">
                  <Upload :action="actionUrl"
                          :show-upload-list="false"
                          :headers="fileHeaders"
                          :on-success="(value) => handleSuccess('small',item,index, value) "
                          :before-upload="(value) => handleBeforeUpload('small',value)"
                          style="display: inline-block;cursor: pointer"
                  >
                    <a class="btn-txt">上传</a>
                  </Upload>
                  <a :href="$IMG_URL + item.poster" target="_blank">预览</a>
                  <span class="line">—</span>
                </i-col>
                <i-col :xs="24" :sm="24" :md="10" :lg="10">
                  <Input v-model="item.productLink == '' ? item.productLink : $IMG_URL + item.productLink" placeholder="商品链接" clearable/>
                </i-col>
                <i-col :xs="24" :sm="24" :md="2" :lg="2">
                  <a class="btn-txt" @click="openProductModal(item)">{{getAddText(item.productLink)}}</a>
                </i-col>
              </Row>
            </FormItem>
          </div>
          <FormItem>
            <Button type="primary" icon="ios-add" @click="handleAdd">新增</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <!-- 移动端海报 -->
    <div class="tej-front-management-item">
      <h3 class="title">移动端</h3>
      <div>
        <p class="subtitle">轮播海报(注：尺寸 375px * 180px)</p>
        <Form label-position="right" :label-width="100">
          <div v-for="(item, index) in mobileFormList">
            <FormItem :label="getTitle(index+1)">
              <Row>
                <i-col :xs="24" :sm="24" :md="10" :lg="10">
                  <Input v-model="item.poster == '' ? item.poster : $IMG_URL + item.poster" placeholder="轮播图链接"
                         clearable/>
                </i-col>
                <i-col :xs="24" :sm="24" :md="2" :lg="2">
                  <Upload :action="actionUrl"
                          :show-upload-list="false"
                          :headers="fileHeaders"
                          :on-success="(value) => handleSuccess('mobile',item,index, value) "
                          :before-upload="(value) => handleBeforeUpload('mobile',value)"
                          style="display: inline-block;cursor: pointer"
                  >
                    <a class="btn-txt">上传</a>
                  </Upload>
                  <a :href="$IMG_URL +  item.poster" target="_blank">预览</a>
                  <span class="line">—</span>
                </i-col>
                <i-col :xs="24" :sm="24" :md="10" :lg="10">
                  <Input v-model="item.productLink == '' ? item.productLink : $IMG_URL + item.productLink" placeholder="商品链接" clearable/>
                </i-col>
                <i-col :xs="24" :sm="24" :md="2" :lg="2">
                  <a class="btn-txt" @click="openProductModal(item)">{{getAddText(item.productLink)}}</a>
                </i-col>
              </Row>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
    <!-- 添加商品弹窗 -->
    <Modal
      v-model="showModal"
      title="商品列表"
      :width="modalWidth"
      :footer-hide="true"
    >
      <div v-if="showModal">
        <FrontModal :show-loading="showLoading"
                    :columns-data="columnsData"
                    :table-data="tableData"
                    :page="page"
                    :id="posterId"
                    :item="formItem"
                    @front-page-callback="frontPageCallback"
                    @front-pageSize-callback="frontPageSizeCallback"
                    @front-keywords-callback="frontKeywordsCallback"
                    @add-product-callback="addProductCallback"
        >
        </FrontModal>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {getFrontList, postFrontProductList, putUpdateFront, postAddSmall} from '@/api/api'
  import FrontModal from './FrontModal'
  import {frontProductTable} from '@/api/tableData'
  import {checkImageWH} from '@/utils/utils'

  export default {
    name: 'FrontManagementPage',
    components: {FrontModal},
    data() {
      return {
        actionUrl: this.$axios.defaults.baseURL + '/fileResource/uploadimg',
        fileHeaders: {
          'token': sessionStorage.getItem('token'),
          'Access-Control-Allow-Origin': '*'
        },
        formItem: {},
        showModal: false,
        modalWidth: 60,
        page: {
          index: 1,
          size: 10,
          total: 10
        },
        showLoading: false,
        columnsData: [],
        tableData: [],
        keywords: '',
        posterId: null,
        productId: null,
        formList: [],    //pc端轮播海报
        smallFormList: [
//          {
//            sequenceNumber: 1,
//            poster: '',
//            productLink: '',
//          }
        ],  //小海报
        mobileFormList: [],  //移动端轮播海报
        smallIndex: 1,  //小海报默认添加的个数
        sequenceNumber: 1,
        type: {
          'pc': 0,
          'mobile': 1,
          'small': 2
        },
        addType: null
      }
    },
    computed: {
      getTitle() {
        return function (id) {
          return '轮播海报 ' + id
        }
      },
      getSmallTitle() {
        return function (id) {
          return '小海报 ' + id
        }
      },
      getAddText() {
        return function (productLink) {
          return productLink == '' ? '添加' : '替换'
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      handleBeforeUpload(type, file) {
        console.log('type!!!!!', type)
        this.addType = type
        let width, height
        switch (type) {
          case 'small':
            width = 970
            height = 380
            break
          case 'pc':
            width = 1920
            height = 380
            break
          default:
            width = 375
            height = 180
        }
        return checkImageWH(file, width, height)
      },
      handleAdd() {
//        this.smallIndex++
        console.log('this.smallFormList.length',this.smallFormList.length)
        this.smallIndex = this.smallFormList.length
        this.smallIndex ++
        console.log('smallIndex', this.smallIndex)
        this.smallFormList.push({
          sequenceNumber:  this.smallIndex,
          poster: '',
          productLink: ''
        })
      },
      handleSuccess(type,item, index, value) {
        console.log('新方法', item, index, value)
        this.addType = type
        item.poster = value.data[0].url
        this.posterId = item.id
        //保存 每一个formItem，以便于选择商品之后，每一个商品链接input的赋值
        this.formItem = item
      },
      addProductCallback(item, productId) {
        console.log('item 回调', item, productId)
        this.productId = productId
       // this.updateFront(this.posterLink, this.$IMG_URL + productId, productId)
        this.update(item, productId)
        this.showModal = false
        item.productLink = this.$IMG_URL + productId
      },
      update(item, productId){
        console.log('update',item, productId)
        console.log('this.addType!!!!',this.addType)
        if(this.addType === 'small'){
          this.addPoster(item.poster, productId, productId)
        }else {
          this.updateFront(this.posterLink, productId, productId)
        }
      },
      frontPageCallback(page) {
        this.page = page
        this.getModalList()
      },
      frontPageSizeCallback(page) {
        this.page = page
        this.getModalList()
      },
      frontKeywordsCallback(keywords) {
        this.keywords = keywords
        this.getModalList()
      },
      openProductModal(item) {
        this.posterId = item.id || item.sequenceNumber
        //截取字符串，只需要file/之后的文件路径 http://47.92.209.177/file/20190815/20190815143500040.jpg
        this.posterLink = item.poster.split("file/")[1]
        this.showModal = true
        this.columnsData = frontProductTable
        this.getModalList()
      },
      addPoster(poster, productLink, productId){
        console.log('addPoster',poster, productLink, productId)
        //添加小海报
        let params = {
          sequenceNumber: this.posterId,
          poster: poster,
          productLink: productLink,
          productId: productId,
          type: this.type.small
        }
        postAddSmall(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('添加小海报成功')
        }).catch(err => {
          this.$Message.error('添加小海报失败' + err)
        })
      },
      //TODO productLink 前台商城写完之后需要改路径
      updateFront(poster, productLink, productId) {
        console.log('updateFront',poster, productLink, productId)
        let params = {
          id: this.posterId,
          poster: poster,
          productLink: productLink,
          productId: productId
        }
        putUpdateFront(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('修改成功')
        }).catch(err => {
          this.$Message.error('修改前台管理信息失败' + err)
        })
      },
      getModalList() {
        let params = {
          id: this.posterId,
          product: {
            page: this.page.index,
            pageSize: this.page.size,
            keywords: this.keywords
          }
        }
        this.showLoading = true
        postFrontProductList(params).then(res => {
          this.showLoading = false
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.tableData = data.list
          this.page = {
            index: data.page,
            size: data.pageSize,
            total: data.total
          }
        }).catch(err => {
          this.showLoading = false
          this.$Message.error('获取前台管理商品列表失败' + err)
        })
      },
      getList() {
        getFrontList().then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          console.log('获取前台管理', res.data)
          let data = res.data.list
          this.formList = data.filter((i, v) => i.type == this.type.pc)
          let smallList = data.filter((i, v) => i.type == this.type.small)
          if(smallList.length == 0){
            console.log('初始')
            this.smallFormList = [
              {
                sequenceNumber: 1,
                poster: '',
                productLink: '',
              }
            ]
          }else {
            console.log('有值')
            this.smallFormList = data.filter((i, v) => i.type == this.type.small)
          }
          console.log('this.smallFormList',this.smallFormList.length)
          this.mobileFormList = data.filter((i, v) => i.type == this.type.mobile)
        }).catch(err => {
          this.$Message.error('获取前台管理列表失败')
        })
      }
    }
  }
</script>
<style scoped>
  .tej-front-management-item {
    padding: 20px 16px;
    margin-bottom: 20px;
    background: #fff;
  }

  .tej-front-management-item .title {
    padding-left: 10px;
    margin-bottom: 20px;
    border-left: 3px solid #2d8cf0;
  }

  .tej-front-management-item .btn-txt {
    display: inline-block;
    margin-left: 10px;
  }

  .tej-front-management-item .line {
    display: inline-block;
    margin-left: 10px;
    color: #dcdee2;
  }

  .tej-front-management-item .subtitle {
    padding-left: 15px;
    margin-bottom: 20px;
  }
</style>

