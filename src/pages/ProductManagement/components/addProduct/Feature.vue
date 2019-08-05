<template>
  <Card class="tej-bule-card">
    <div class="tej-product-box">
      <p>商品尺码</p>
      <CheckboxGroup v-model="sizeCheckboxGroup" @on-change="sizeChange">
        <span v-for="(item, index) in sizeList" :key="index" class="item">
          <Checkbox :label="item.sizeName">
            <span class="tej-size-name">{{item.sizeName}}</span>
          </Checkbox>
          <small @click="deleteSize(item.id)" class="tej-close-size ivu-icon"></small>
        </span>
        <div class="item">
          <Checkbox>
            <slot>
              <Input v-model="sizeValue" clearable placeholder="请输入新尺码" style="width: 100px" @on-change="getSizeValue"
                     size="small"/>
            </slot>
          </Checkbox>
          <b class="tej-add-txt" @click="addSize">新增</b>
        </div>
      </CheckboxGroup>
    </div>
    <div class="tej-product-box">
      <p>商品颜色</p>
      <CheckboxGroup v-model="colorCheckboxGroup" @on-change="colorChange">
        <span v-for="(item, index) in colorList" :key="index" class="item">
          <Checkbox :label="item.colorName">
             <span class="tej-color-name">{{item.colorName}}</span>
          </Checkbox>
            <small @click="deleteColor(item.colorId)" class="tej-close-color ivu-icon"></small>
        </span>
        <div class="item">
          <Checkbox>
            <slot>
              <Input v-model="colorValue" clearable placeholder="请输入新颜色" style="width: 100px" @on-change="getColorValue"
                     size="small"/>
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
      feature: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        sizeValue: '',
        sizeList: [],
        sizeCheckboxGroup: [],
        colorValue: '',
        colorList: [],
        colorCheckboxGroup: [],
        sizeIndex: 0,
        colorIndex: 0
      }
    },
    mounted() {
      console.log('feature props', this.feature)
      this.getDefaultColorList()
      let checked = this.$route.params.isEdit
      if (checked) {
        this.editInitData()
      }
    },
    methods: {
      editInitData() {
        this.sizeList = this.feature.sizeList
        this.colorList = this.feature.colorList
        //TODO 遍历循环查找方式可优化
        this.sizeList.map(item => {
          if (item.sizeIsShow == 1) {
            this.sizeCheckboxGroup.push(item.sizeName)
          }
        })
        this.colorList.map(item => {
          if (item.colorIsShow == 1) {
            this.colorCheckboxGroup.push(item.colorName)
          }
        })
      },
      callback() {
        this.$emit('feature-callback', {
          colorList: this.colorList,
          sizeList: this.sizeList
        })
      },
      deleteSize(index) {
        this.sizeList = this.sizeList.filter(item => {
          return item.id != index
        })
        this.callback()
      },
      deleteColor(name) {
        this.colorList = this.colorList.filter(item => {
          return item.colorId != name
        })
        this.callback()
      },
      colorChange(data) {
        this.colorList.map(item => {
          if (data.indexOf(item.colorName) == -1) {
            item.colorIsShow = 0
          } else {
            item.colorIsShow = 1
          }
        })
        this.callback()
      },
      sizeChange(data) {
        this.sizeList.map(item => {
          if (data.indexOf(item.sizeName) == -1) {
            item.sizeIsShow = 0
          } else {
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
      addColorClick() {
        if(this.colorValue == ''){
          this.$Message.error('新增颜色不能为空')
          return
        }
        let checked = this.colorList.filter(item => item.colorName == this.colorValue).length > 0
        if(checked){
          this.$Message.error('与已有颜色重复')
          this.colorValue = ''
          return
        }
        this.colorList.push({
          colorId: this.colorIndex++,
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
      addSize() {
        if (this.sizeValue == '') {
          this.$Message.error('新增尺码不能为空')
          return
        }
        let checked = this.sizeList.filter(item => item.sizeName == this.sizeValue).length > 0
        if (checked) {
          this.$Message.error('与已有尺码重复')
          this.sizeValue = ''
          return
        }
        this.sizeList.push({
          id: this.sizeIndex++,
          sizeName: this.sizeValue,
          sizeIsShow: 1
        })
        this.$emit('feature-callback', {
          colorList: this.colorList,
          sizeList: this.sizeList,
          typeChildId: this.feature.typeChildId,
        })
        this.sizeValue = ''
        let list = []
        this.sizeList.map(item => {
          list.push(item.sizeName)
        })
        this.sizeCheckboxGroup = [...new Set(list)]
      },
      getDefaultColorList() {
        getColorList('').then(res => {
          this.colorList = res.data.colorList
          let list = []
          this.colorList.map(item => {
            list.push(item.colorName)
          })
          this.colorCheckboxGroup = [...new Set(list)]
        }).catch(err => {
          this.$Message.error('获取颜色列表失败', err)
        })
      },
      postAddSize() {
        addSize().catch(err => {
          this.$Message.error('新增尺寸失败', err)
        })
      },
      postAddColor(productColor) {
        addColor({productColor: productColor})
          .then(res => {
            console.log('新增商品颜色 请求', res.data.colorId)
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
  .tej-product-box .item {
    display: inline-block;
    margin: 6px 10px;
  }
  .tej-product-box .ivu-checkbox-wrapper {
    margin-right: 0;
  }
  .tej-product-box .item:last-child {
    display: block;
  }
  .tej-size-name,.tej-color-name {
    padding: 5px 10px;
    margin-right: 0;
    border: 1px solid #ddd;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .tej-close-size,.tej-close-color {
    border: 1px solid #ddd;
    padding: 2px;
    margin-left: -5px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    font-size: 20px;
    cursor: pointer;
  }
  .tej-close-size:after, .tej-close-color:after {
    content: '\F178'
  }

</style>

