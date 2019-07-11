<template>
  <Card>
    <div class="tej-product-box">
      <p>商品尺码</p>
      <CheckboxGroup v-model="sizeCheckboxGroup">
        <span v-for="(item, index) in sizeList" :key="index">
          <Checkbox  :label="item.name"></Checkbox>
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
      <CheckboxGroup v-model="colorCheckboxGroup">
        <span v-for="(item, index) in colorList" :key="index">
          <Checkbox  :label="item.name"></Checkbox>
        </span>
        <div>
          <Checkbox>
            <slot>
              <Input v-model="colorValue" clearable placeholder="请输入新颜色" style="width: 100px" @on-change="getColorValue"/>
            </slot>
          </Checkbox>
          <b class="tej-add-txt" @click="addColor">新增</b>
        </div>
      </CheckboxGroup>
    </div>

  </Card>
</template>

<script>
  export default {
    name: 'Feature',
    data() {
      return {
        sizeValue:'',
        sizeList: [],
        sizeCheckboxGroup: [],
        colorValue:'',
        colorList: [],
        colorCheckboxGroup: []
      }
    },
    methods: {
      addColor(){
        //TODO 过滤不重复颜色
        this.colorList.push({name: this.colorValue,show: true})
        this.colorValue = ''
        console.log('colorList',this.colorList)
        this.colorList.map(item => {
          this.colorCheckboxGroup.push(item.name)
        })
      },
      getColorValue(e) {
        this.colorValue = e.target.value
        console.log('尺码 value',e.target.value)
      },
      addSize(){
        //TODO 过滤不重复尺码
        this.sizeList.push({name: this.sizeValue,show: true})
        this.sizeValue = ''
        console.log('sizeList',this.sizeList)
        this.sizeList.map(item => {
          this.sizeCheckboxGroup.push(item.name)
        })
      },
      getSizeValue(e) {
        this.sizeValue = e.target.value
        console.log('尺码 value',e.target.value)
      }
    }
  }
</script>

<style scoped>
</style>

