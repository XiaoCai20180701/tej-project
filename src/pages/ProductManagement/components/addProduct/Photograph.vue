<template>
  <Card class="tej-bule-card">
    <div class="tej-product-box">
      <p>商品主图</p>
      <UploadFile :picture-num="pictureNumber" @main-callback="mainCallback"></UploadFile>
    </div>
    <div class="tej-product-box">
      <p>商品详情图</p>
      <EditorElem :catch-data="getEditorContent" ></EditorElem>
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
    data() {
      return {
        pictureNumber: 6,
        actionUrl: 'http://192.168.112.1:5354/fileResource/uploadimg',
        mainPicture:[],
        imgContent: ''
      }
    },
    methods: {
      mainCallback(data){
        this.mainPicture = data
        this.$emit('photograph-callback',{
          mainPicture: this.mainPicture,
          imgContent: this.imgContent
        })
      },
      getEditorContent(content){
        this.imgContent = content
        this.$emit('photograph-callback',{
          mainPicture: this.mainPicture,
          imgContent: this.imgContent
        })
      }
    }
  }
</script>

<style scoped>
</style>


