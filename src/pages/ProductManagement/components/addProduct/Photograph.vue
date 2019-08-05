<template>
  <Card class="tej-bule-card">
    <div class="tej-product-box">
      <p>商品主图</p>
      <UploadFile :picture-num="pictureNumber"
                  @main-callback="mainCallback"
                  :upload-list-props="mainPictureProps"
      ></UploadFile>
    </div>
    <div class="tej-product-box">
      <p>商品详情图</p>
      <EditorElem :catch-data="getEditorContent"
                  :editor-data="imgContentProps"
      ></EditorElem>
    </div>
  </Card>
</template>

<script>
  import UploadFile from '@/components/UploadFile'
  import EditorElem from '@/components/EditorElem'
  export default {
    name: 'Photograph',
    components: {
      'UploadFile': UploadFile,
      'EditorElem': EditorElem
    },
    props: {
      mainPictureProps: {
        type: Array,
        required: false
      },
      imgContentProps: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        pictureNumber: 6,
        actionUrl: 'http://192.168.112.1:5354/fileResource/uploadimg',
        mainPictureDom:[],
        imgContent: ''
      }
    },
    mounted(){
      console.log('mainPictureProps',this.mainPictureProps)
    },
    methods: {
      mainCallback(name,url){
        console.log('mainCallbackmainCallback',name,url)
        this.mainPictureDom.push({
          name: name,
          url: url
        })
        this.$emit('photograph-callback',{
          mainPicture: this.mainPictureDom,
          imgContent: this.imgContent
        })
      },
      getEditorContent(content){
        console.log('content!!!!!!!!',content)
        this.imgContent = content
        this.$emit('photograph-callback',{
          mainPicture: this.mainPictureDom,
          imgContent: this.imgContent
        })
      }
    }
  }
</script>

<style scoped>
</style>


