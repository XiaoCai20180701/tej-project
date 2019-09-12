<template>
  <Card class="tej-bule-card">
    <div class="tej-product-box">
      <p><span class="symbol">*</span>商品主图</p>
      <UploadFile :picture-num="pictureNumber"
                  @main-callback="mainCallback"
                  :upload-list-props="mainPictureProps"
                  :disabled="disabled"
      ></UploadFile>
    </div>
    <div class="tej-product-box">
      <p><span class="symbol">*</span>商品详情图</p>
      <EditorElem :catch-data="getEditorContent"
                  :editor-data="imgContentProps"
                  :disabled="disabled"
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
      },
      disabled: {
        type: Boolean,
        required: false
      }
    },
    data() {
      return {
        pictureNumber: 6,
        mainPictureDom: [],
        imgContent: ''
      }
    },
    mounted() {
      console.log('mainPictureProps', this.mainPictureProps)
      let checked = this.$route.params.isEdit
      if (checked) {
        this.mainPictureProps.map(item => {
          item.url = this.$IMG_URL + item.url
        })
      }
    },
    methods: {
      mainCallback(name, url) {
        console.log('mainCallbackmainCallback', name, url)
        this.mainPictureDom.push({
          name: name,
          url: url
        })
        this.$emit('photograph-callback', {
          mainPicture: this.mainPictureDom,
          imgContent: this.imgContent
        })
      },
      getEditorContent(content) {
        console.log('content!!!!!!!!', content)
        this.imgContent = content
        this.$emit('photograph-callback', {
          mainPicture: this.mainPictureDom,
          imgContent: this.imgContent
        })
      }
    }
  }
</script>

<style scoped>
  .tej-editor-input {
    z-index: 9999;
    position: relative;
    top: 60px;
    left: 15px;
    border: 0;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
  }
</style>


