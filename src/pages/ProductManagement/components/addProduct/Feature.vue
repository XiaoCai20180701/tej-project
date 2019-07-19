<template>
  <Card>
    <div class="tej-product-box">
      <p>商品尺码</p>
      <CheckboxGroup v-model="sizeCheckboxGroup" @on-change="sizeChange">
        <span v-for="(item, index) in sizeList" :key="index">
          <Checkbox  :label="item.sizeName">
            <Tag type="border" closable @on-close="deleteSize" :name="index">{{item.sizeName}}</Tag>
          </Checkbox>
        </span>
        <div>
          <Checkbox>
            <slot>
              <Input v-model="sizeValue" clearable placeholder="请输入新尺码" style="width: 100px" @on-change="getSizeValue"/>
            </slot>
          </Checkbox>
          <b class="tej-add-txt" @click="addSize">新增</b>
        </div>
      </CheckboxGroup>
    </div>
    <div class="tej-product-box">
      <p>商品颜色</p>
      <CheckboxGroup v-model="colorCheckboxGroup" @on-change="colorChange">
        <span v-for="(item, index) in colorList" :key="index">
          <Checkbox  :label="item.colorName">
            <Tag type="border" closable @on-close="deleteColor" :name="index">{{item.colorName}}</Tag>
          </Checkbox>
        </span>
        <div>
          <Checkbox>
            <slot>
              <Input v-model="colorValue" clearable placeholder="请输入新颜色" style="width: 100px" @on-change="getColorValue"/>
            </slot>
          </Checkbox>
          <b class="tej-add-txt" @click="addColorClick">新增</b>
        </div>
      </CheckboxGroup>
    </div>

  </Card>
</template>

<script>
  import {addSize, addColor, getColorList} from '@/api/api'
  export default {
    name: 'Feature',
    props: {
      feature: Object,
      required: false
    },
    data() {
      return {
        sizeValue:'',
        sizeList: [],
        sizeCheckboxGroup: [],
        colorValue:'',
        colorList: [],
        colorCheckboxGroup: [],
        sizeIndex: 0,
        colorIndex: 0
      }
    },
    mounted(){
      console.log('feature props', this.feature)
      this.getDefaultColorList()
      let checked = this.$route.params.isEdit
      if (checked) {
        this.editInitData()
      }
    },
    methods: {
      editInitData(){
        this.sizeList = this.feature.sizeList
        this.colorList = this.feature.colorList
        //TODO 遍历循环查找方式可优化
        this.sizeList.map(item => {
          if(item.sizeIsShow == 1){
            this.sizeCheckboxGroup.push(item.sizeName)
          }
        })
        this.colorList.map(item => {
          if(item.colorIsShow == 1){
            this.colorCheckboxGroup.push(item.colorName)
          }
        })
      },
      callback(){
        this.$emit('feature-callback',{
          colorList: this.colorList,
          sizeList: this.sizeList
        })
      },
      deleteSize(event,name){
        this.sizeList =this.sizeList.filter(item => {
          return item.sizeIndex != name
        })
       this.callback()
      },
      deleteColor(event,name){
        this.colorList =this.colorList.filter(item => {
          return item.colorIndex != name
        })
        this.callback()
      },
      colorChange(data){
        this.colorList.map(item => {
          if(data.indexOf(item.colorName) == -1){
            item.colorIsShow = 0
          }else {
            item.colorIsShow = 1
          }
        })
        this.callback()
      },
      sizeChange(data){
        this.sizeList.map(item => {
          if(data.indexOf(item.sizeName) == -1){
            item.sizeIsShow = 0
          }else {
            item.sizeIsShow = 1
          }
        })
        this.callback()
      },
      getColorValue(e) {
        this.colorValue = e.target.value
      },
      getSizeValue(e) {
        this.sizeValue = e.target.value
      },
      addColorClick(){
        //TODO 过滤不重复颜色，若重复给提示
        this.colorList.push({
          colorIndex: this.colorIndex++,
          colorName: this.colorValue,
          colorIsShow: 1
        })
        this.callback()
        this.colorValue = ''
        let list = []
        this.colorList.map(item => {
          list.push(item.colorName)
        })
        this.colorCheckboxGroup = [...new Set(list)]   //数组去重,但为什么新增的时候会出现重复，这个问题还不明白？
      },
      addSize(){
        //TODO 过滤不重复尺码，若重复给提示
        this.sizeList.push({
          sizeIndex: this.sizeIndex++,
          sizeName: this.sizeValue,
          sizeIsShow: 1
        })
        this.callback()
        this.sizeValue = ''
        let list = []
        this.sizeList.map(item => {
          list.push(item.sizeName)
        })
        this.sizeCheckboxGroup = [...new Set(list)]
      },
      getDefaultColorList(){
        getColorList('').then(res => {
           this.colorList = res.data.colorList
          let list = []
          this.colorList.map(item => {
            list.push(item.colorName)
          })
           this.colorCheckboxGroup = [...new Set(list)]
        }).catch(err =>{
          this.$Message.error('获取颜色列表失败', err)
        })
      },
      postAddSize(){
        addSize().catch(err => {
          this.$Message.error('新增尺寸失败', err)
        })
      },
      postAddColor(productColor) {
        addColor({productColor: productColor})
          .then(res => {
            console.log('新增商品颜色 请求',res.data.colorId)
            return res.data.colorId
          })
          .catch(err => {
          this.$Message.error('新增颜色失败', err)
        })
      }
    }
  }
</script>

<style scoped>
</style>

