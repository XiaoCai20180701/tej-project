<template>
  <div class="tej-front-management">
    <!-- PC端海报 -->
    <div class="tej-front-management-item">
      <h3 class="title">PC端</h3>
      <Form :model="pcForm" label-position="right" :label-width="100">
        <FormItem label="轮播海报01">
          <Row>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="pcForm.poster1" placeholder="轮播图链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <Upload :action="actionUrl"
                      :show-upload-list="false"
                      :headers="fileHeaders"
                      :on-success="handlePosterOneSuccess"
                      style="display: inline-block;cursor: pointer"
              >
                <a class="btn-txt">上传</a>
              </Upload>
              <a :href="pcForm.poster1" target="_blank">预览</a>
              <span class="line">—</span>
            </i-col>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="pcForm.product1" placeholder="商品链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <a class="btn-txt" @click="openProduct(pcForm.id1,pcForm.poster1)">添加</a>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="轮播海报02">
          <Row>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="pcForm.poster2" placeholder="轮播图链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <Upload :action="actionUrl"
                      :show-upload-list="false"
                      :headers="fileHeaders"
                      :on-success="handlePosterTwoSuccess"
                      style="display: inline-block;cursor: pointer"
              >
                <a class="btn-txt">上传</a>
              </Upload>
              <a :href="pcForm.poster2" target="_blank">预览</a>
              <span class="line">—</span>
            </i-col>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="pcForm.product2" placeholder="商品链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <a class="btn-txt" @click="openProduct(pcForm.id2,pcForm.poster2)">添加</a>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="轮播海报03">
          <Row>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="pcForm.poster3" placeholder="轮播图链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <Upload :action="actionUrl"
                      :show-upload-list="false"
                      :headers="fileHeaders"
                      :on-success="handlePosterThreeSuccess"
                      style="display: inline-block;cursor: pointer"
              >
                <a class="btn-txt">上传</a>
              </Upload>
              <a :href="pcForm.poster3" target="_blank">预览</a>
              <span class="line">—</span>
            </i-col>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="pcForm.product3" placeholder="商品链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <a class="btn-txt" @click="openProduct(pcForm.id3,pcForm.poster3)">添加</a>
            </i-col>
          </Row>
        </FormItem>
      </Form>
    </div>
    <!-- 移动端海报 -->
    <div class="tej-front-management-item">
      <h3 class="title">移动端</h3>
      <Form :model="mobileForm" label-position="right" :label-width="100">
        <FormItem label="轮播海报01">
          <Row>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="mobileForm.poster1" placeholder="轮播图链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <Upload :action="actionUrl"
                      :show-upload-list="false"
                      :headers="fileHeaders"
                      :on-success="handleMPosterOneSuccess"
                      style="display: inline-block;cursor: pointer"
              >
                <a class="btn-txt">上传</a>
              </Upload>
              <a :href="mobileForm.poster1" target="_blank">预览</a>
              <span class="line">—</span>
            </i-col>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="mobileForm.product1" placeholder="商品链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <a class="btn-txt" @click="openProduct(mobileForm.id1,mobileForm.poster1)">添加</a>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="轮播海报02">
          <Row>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="mobileForm.poster2" placeholder="轮播图链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <Upload :action="actionUrl"
                      :show-upload-list="false"
                      :headers="fileHeaders"
                      :on-success="handleMPosterTwoSuccess"
                      style="display: inline-block;cursor: pointer"
              >
                <a class="btn-txt">上传</a>
              </Upload>
              <a :href="mobileForm.poster2" target="_blank">预览</a>
              <span class="line">—</span>
            </i-col>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="mobileForm.product2" placeholder="商品链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <a class="btn-txt" @click="openProduct(mobileForm.id2,mobileForm.poster2)">添加</a>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="轮播海报03">
          <Row>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="mobileForm.poster3" placeholder="轮播图链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <Upload :action="actionUrl"
                      :show-upload-list="false"
                      :headers="fileHeaders"
                      :on-success="handleMPosterThreeSuccess"
                      style="display: inline-block;cursor: pointer"
              >
                <a class="btn-txt">上传</a>
              </Upload>
              <a :href="mobileForm.poster3" target="_blank">预览</a>
              <span class="line">—</span>
            </i-col>
            <i-col :xs="24" :sm="24" :md="10" :lg="10">
              <Input v-model="mobileForm.product3" placeholder="商品链接" clearable/>
            </i-col>
            <i-col :xs="24" :sm="24" :md="2" :lg="2">
              <a class="btn-txt" @click="openProduct(mobileForm.id3,mobileForm.poster3)">添加</a>
            </i-col>
          </Row>
        </FormItem>
      </Form>
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
  import { getFrontList, postFrontProductList, putUpdateFront } from '@/api/api'
  import FrontModal from './FrontModal'
  import { frontProductTable } from '@/api/tableData'

  export default {
    name: 'FrontManagementPage',
    components: { FrontModal },
    data() {
      return {
        actionUrl: this.$axios.defaults.baseURL + '/fileResource/uploadimg',
        fileHeaders: {
          'token': sessionStorage.getItem('token'),
          'Access-Control-Allow-Origin': '*'
        },
        pcForm: {
          poster1: '',
          poster2: '',
          poster3: '',
          product1: '',
          product2: '',
          product3: '',
          id1: null,
          id2: null,
          id3: null
        },
        mobileForm: {
          poster1: '',
          poster2: '',
          poster3: '',
          product1: '',
          product2: '',
          product3: '',
          id1: null,
          id2: null,
          id3: null
        },
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
        posterLink: ''
      }
    },
    mounted(){
      this.getList()
    },
    methods: {
      addProductCallback(productId){
        this.productId = productId
        this.updateFront(this.posterLink,this.$IMG_URL + productId,productId)
        this.showModal = false
        this.getProductLink(productId)
      },
      getProductLink(productId){
        switch (this.posterId){
          case 1:
            this.pcForm.product1 = this.$IMG_URL + productId
            break
          case 2:
            this.pcForm.product2 = this.$IMG_URL + productId
            break
          case 3:
            this.pcForm.product3 = this.$IMG_URL + productId
            break
          case 4:
            this.mobileForm.product1 = this.$IMG_URL + productId
            break
          case 5:
            this.mobileForm.product2 = this.$IMG_URL + productId
            break
          case 6:
            this.mobileForm.product3 = this.$IMG_URL + productId
            break
        }
      },
      frontPageCallback(page){
        this.page = page
        this.getModalList()
      },
      frontPageSizeCallback(page){
        this.page = page
        this.getModalList()
      },
      frontKeywordsCallback(keywords){
        this.keywords = keywords
        this.getModalList()
      },
      openProduct(id,posterLink){
        this.posterId = id
        //截取字符串，只需要file/之后的文件路径 http://47.92.209.177/file/20190815/20190815143500040.jpg
        this.posterLink = posterLink.split("file/")[1]
        this.showModal = true
        this.columnsData = frontProductTable
        this.getModalList()
      },
      handlePosterOneSuccess(res, file) {
        let url = file.response.data[0].url
        this.pcForm.poster1 = this.$IMG_URL + url
        this.posterId = this.pcForm.id1
        this.updateFront(this.$IMG_URL + url,this.$IMG_URL + this.productId,this.productId)
      },
      handlePosterTwoSuccess(res, file) {
        let url = file.response.data[0].url
        this.pcForm.poster2 = this.$IMG_URL + url
        this.posterId = this.pcForm.id2
        this.updateFront(this.$IMG_URL + url,this.$IMG_URL + this.productId,this.productId)
      },
      handlePosterThreeSuccess(res, file) {
        let url = file.response.data[0].url
        this.pcForm.poster3 = this.$IMG_URL + url
        this.posterId = this.pcForm.id3
        this.updateFront(this.$IMG_URL + url,this.$IMG_URL + this.productId,this.productId)
      },
      handleMPosterOneSuccess(res, file) {
        let url = file.response.data[0].url
        this.mobileForm.poster1 = this.$IMG_URL + url
        this.posterId = this.mobileForm.id1
        this.updateFront(this.$IMG_URL + url,this.$IMG_URL + this.productId,this.productId)
      },
      handleMPosterTwoSuccess(res, file) {
        let url = file.response.data[0].url
        this.mobileForm.poster2 = this.$IMG_URL + url
        this.posterId = this.mobileForm.id2
        this.updateFront(this.$IMG_URL + url,this.$IMG_URL + this.productId,this.productId)
      },
      handleMPosterThreeSuccess(res, file) {
        let url = file.response.data[0].url
        this.mobileForm.poster3 = this.$IMG_URL + url
        this.posterId = this.mobileForm.id3
        this.updateFront(this.$IMG_URL + url,this.$IMG_URL + this.productId,this.productId)
      },
      //TODO productLink 前台商城写完之后需要改路径
      updateFront(poster,productLink, productId){
        let params = {
          id: this.posterId,
          poster: poster,
          productLink: productLink,
          productId: productId
        }
        putUpdateFront(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if(res.code === 9998){
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
      getModalList(){
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
            if(res.code === 9998){
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
      getList(){
        getFrontList().then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          console.log('获取前台管理',res.data)
          let data = res.data.list
          this.pcForm ={
            poster1: this.$IMG_URL + data[0].poster,
            poster2: this.$IMG_URL + data[1].poster,
            poster3: this.$IMG_URL + data[2].poster,
            product1: data[0].link,
            product2: data[1].link,
            product3: data[2].link,
            id1: data[0].id,
            id2: data[1].id,
            id3: data[2].id
          }
          this.mobileForm= {
            poster1: this.$IMG_URL + data[3].poster,
            poster2: this.$IMG_URL + data[4].poster,
            poster3: this.$IMG_URL + data[5].poster,
            product1: data[3].link,
            product2: data[4].link,
            product3: data[5].link,
            id1: data[3].id,
            id2: data[4].id,
            id3: data[5].id
          }
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
</style>

