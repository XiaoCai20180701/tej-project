<template>
  <Card>
    <div class="tej-product-box">
      <p>商品主图</p>
      <UploadFile :picture-num="pictureNumber" :action-url="actionUrl"></UploadFile>
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
        actionUrl: '//jsonplaceholder.typicode.com/posts/',
      }
    },
    methods: {
      getEditorContent(content){
        console.log('获取富文本编辑器中的内容',content)
      }
    }
  }
</script>

<style scoped>

</style>


