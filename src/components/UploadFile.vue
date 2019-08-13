<template>
  <div>
  <div class="demo-upload-list" v-for="item in uploadList">
    <template v-if="item.status === 'finished'">
      <img :src="item.url">
      <p>{{item.name}}</p>
      <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </template>
    <template v-else>
      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
    </template>
  </div>
  <Upload
    ref="upload"
    :show-upload-list="false"
    :default-file-list="defaultList"
    :on-success="handleSuccess"
    :format="['jpg','jpeg','png']"
    :max-size="2048"
    :headers="fileHeaders"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload"
    multiple
    :action="actionUrl"
    :data = "uploadData"
    style="display: inline-block"
  >
    <div class="tej-upload-txt" ref="uploadTxt" v-if="!disabled">
      <Icon type="md-add" size="20"></Icon>
      <div>上传主图</div>
      <small>注：800x800</small>
    </div>
  </Upload>
  <Modal title="查看原图" v-model="visible">
    <img :src="imgUrl" v-if="visible" style="width: 100%">
  </Modal>
  </div>
</template>
<script>
  export default {
    props: {
      pictureNum: Number,
      uploadListProps: {
        type: Array,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        actionUrl: this.$axios.defaults.baseURL + '/fileResource/uploadimg',
        fileHeaders: {
          'token': localStorage.getItem('token'),
          'Access-Control-Allow-Origin': '*'
        },
        defaultList: [],
        imgUrl: '',
        visible: false,
        uploadList: [],
        list: [],
        uploadData: {
          isEditor: 0
        }
      }
    },
    methods: {
      handleView (url) {
        this.imgUrl = url[0];
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        let url = file.response.data[0].url
        file.url= 'http://47.92.209.177/file/' + url
        file.name = file.response.data[0].name
        this.$emit('main-callback',file.name,url)
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '【' + file.name + ' 】文件格式不正确, 请选择 jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超过文件大小限制',
          desc:'【' +  file.name + '】文件太大, 最多不超多2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < this.pictureNum;
        if (!check) {
          this.$Notice.warning({
            title: `最多可以上传${this.pictureNum}张图片`
          });
        }
        return check;
      }
    },
    created(){
      let checked = this.$route.params.isEdit
      if (checked) {
        this.defaultList = this.uploadListProps
        console.log('defaultList',this.defaultList)
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>
<style>
  .demo-upload-list{
    display: inline-block;
    width: 104px;
    height: 104px;
    text-align: center;
    line-height: 104px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 20px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .tej-upload-txt {
    border: 1px dashed #ccc;
    width: 104px;
    height: 104px;
    padding: 22px 0;
    border-radius: 5px;
    text-align: center;
  }
  .tej-upload-txt small {
    color: #9c9c9c;
  }
</style>
