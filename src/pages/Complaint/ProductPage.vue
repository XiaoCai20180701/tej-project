<template>
  <div class="tej-complaint-panel">
    <Tabs value="name1" :animated="false" @on-click="tabClick">
      <TabPane label="全部投诉" name="name1">
        <ComplaintContent :data="data" ></ComplaintContent>
      </TabPane>
      <TabPane label="未处理投诉" name="name2">
        <ComplaintContent :data="data" ></ComplaintContent>
      </TabPane>
      <TabPane label="已处理投诉" name="name3">
        <ComplaintContent :data="data"></ComplaintContent>
      </TabPane>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Tabs>
    <Modal v-model="showModal"
           title="投诉反馈提交表单"
           width="600"
           :footer-hide="showFooter"
           @on-ok="ok"
    >
      <Form :model="complaintForm" label-position="right" :label-width="100" class="tej-complaint-form">
        <FormItem label="标题：">
          <Input v-model="complaintForm.solveTitle" placeholder="请输入反馈标题"/>
        </FormItem>
        <FormItem label="内容：">
          <Input v-model="complaintForm.solveContent" type="textarea" :rows="6" placeholder="请输入反馈内容"/>
        </FormItem>
        <FormItem label="图片上传：">
          <span v-if="showModal">
              <UploadFile :picture-num="pictureNum"
                          :note="note"
                          :is-default="showDefaultImg"
                          :disabled = "disabled"
                          @main-callback="mainCallback"
              ></UploadFile>
            </span>
        </FormItem>
        <FormItem label="解决时间： " v-if="complaintForm.endTime">
          <label>{{complaintForm.endTime}}</label>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import { postComplainList, postComplainSolveList, postUpdateComplain } from '@/api/api'
  import { complainStatus, complainType } from '@/api/tableData'
  import ComplaintContent from './components/ComplaintContent'
  import  bus from '@/utils/bus'
  import UploadFile from '@/components/UploadFile'

  export default {
    name: 'ProductPage',
    components: {
      ComplaintContent,
      UploadFile
    },
    data(){
      return {
        spinShow: false,
        page: {
          index: 1,
          size: 20
        },
        data: {},
        complainStatus: complainStatus,
        showModal: false,
        complaintForm: {
          solveTitle: '',
          solveContent: '',
          imgList: [],
          endTime: null
        },
        pictureNum: 5,
        note: '',
        uploadListProps: [],
        showDefaultImg: true,
        showFooter: true,
        disabled: false,
        complainId:null,
        status: null //投诉状态
      }
    },
    mounted(){
      this.getList()
      this.lookCallback()
      this.solveCallback()
    },
    methods: {
      mainCallback(name, url){
        this.complaintForm.imgList.push({
          name: name,
          url: url
        })
      },
      ok() {
        console.log('点击ok')
        this.updateComplain()
        this.getList()
      },
      //点击确认解决
      solveCallback() {
        bus.$on('solve-callback', (id) => {
          console.log('解决!!!', id)
          this.showModal = true
          this.showFooter = false
          this.disabled = false
          this.complainId = id
          this.complaintForm = {
            solveTitle: '',
            solveContent: '',
            imgList: []
          }
        })
      },
      //查看解决报告
      lookCallback() {
        bus.$on('look-callback', (id) => {
          console.log('id!!!', id)
          this.showModal = true
          this.showFooter = true
          this.disabled = true
          this.getSolveInfo(id)
        })
      },
      getSolveInfo(id){
        postComplainSolveList({ complainId: id}).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let info = res.data
          this.complaintForm = {
            solveTitle: info.title,
            solveContent: info.content,
            imgList: info.imgList,
            endTime: info.endTime
          }
          console.log('info',this.complaintForm.imgList)
        }).catch(err => {
          this.$Message.error('获取投诉解决信息失败')
        })
      },
      updateComplain(){
        let params = {
          complainId: this.complainId,
          solveTitle: this.complaintForm.solveTitle,
          solveContent: this.complaintForm.solveContent,
          imgList: this.complaintForm.imgList
        }
        postUpdateComplain(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }

        }).catch(err => {
          this.$Message.error('修改投诉状态失败' + err)
        })
      },
      tabClick(name) {
        console.log('tab name', name)
        switch (name) {
          case 'name1':
            this.status = null
            this.getList()
            break
          case 'name2':
            this.status = complainStatus.unprocessed
            this.getList()
            break
          case 'name3':
            this.status = complainStatus.processed
            this.getList()
        }
      },
      getList(){
        this.spinShow = true
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          complainType: complainType.product,
          complainStatus: this.status
        }
        postComplainList(params).then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.spinShow = false
          this.data = res.data
        }).catch(err => {
          this.$Message.error('获取商品问题失败')
          this.spinShow = false
        })
      }
    }
  }
</script>
<style>
  .tej-complaint-panel {
    padding: 10px 18px;
    background: #fff;
  }
  .tej-complaint-panel .look {
    display: inline-block;
    margin-left: 15px;
  }
</style>
