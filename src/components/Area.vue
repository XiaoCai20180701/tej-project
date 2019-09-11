<template>
  <div style="padding: 10px 60px">
    {{areaObj}}
    <div v-for="(area, index) in areaObj" :key="index">
      <CheckboxGroup>
        <Checkbox :label="index">
          <span>{{index}}</span>
        </Checkbox>
        <span v-for="(item, c) in area" :key="c">
          <Checkbox :label="item.code">
            <span>{{item.text}}</span>
          </Checkbox>
        </span>
      </CheckboxGroup>
    </div>
  </div>
</template>

<script>
  import {areaData} from '@/api/areaData'

  export default {
    name: 'Area',
    data() {
      return {
        model: '',
        areaObj: {},
        areaArray: [],
        list: []
      }
    },
    mounted() {
      this.areaObj = areaData
//      this.getData()
//      this.getList()
    },
    methods: {
//      valueChange(val){
//        console.log('val',val)
//        this.$emit('logistics-name-callback',val)
//      },
//      openChange(){
//        //解决 下拉框 设置filterable功能，第二次进入后只有第一次选择的值
//        let query = this.$refs['selectRef'].$data.query
//        if (query) {
//          this.$refs['selectRef'].$data.query = ''
//        }
//      },
//      getData(){
//        this.objKeySort(this.deliveryObj)
//        console.log('!!!!!!!!!!!',this.objKeySort(this.deliveryObj))
//        this.changeToArray()
//      },
//      getList(){
//        console.log('DeliveryData',DeliveryData)
//      },
//      changeToArray(){
//        for (let i in this.objKeySort(this.deliveryObj)) {
//          let linshiObj = {};
//          linshiObj[i] = this.objKeySort(this.deliveryObj)[i];
//          this.deliveryArray.push({
//            char: i,
//            text: linshiObj[i]
//          });
//        }
//        this.list = this.formatList(this.deliveryArray,'char')
//        console.log('this.deliveryArray',this.deliveryArray)
//        console.log('this.list',this.list)
//      },
//      formatList(arr,keyword) {
//        let newArr1 = [];
//        let tempArr = [];
//        let k = 0;
//        let firstWord = arr[0][keyword].charAt(0);//获取第一个分类字母
//        arr.map((v) => {
//          if(firstWord == v[keyword].charAt(0)){
//            tempArr.push(v);
//            newArr1[k] = {
//              title:firstWord,
//              items:tempArr
//            }
//          }else{
//            //这里循环到这表示已经第二个字母了
//            firstWord = v[keyword].charAt(0);//设置第二字母
//            tempArr = [];//把之前的清除掉
//            tempArr.push(v);//添加第一个
//            newArr1[++k] = {//自增
//              title: firstWord,
//              items : tempArr
//            }
//          }
//        });
//        return newArr1;
//      },
//      objKeySort(arys) {
//        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
//        var newkey = Object.keys(arys).sort();
//        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
//        for(var i = 0; i < newkey.length; i++) { //遍历newkey数组
//          //向新创建的对象中按照排好的顺序依次增加键值对
//          newObj[newkey[i]] = arys[newkey[i]];
//        }
//        return newObj; //返回排好序的新对象
//      }
    }
  }
</script>

<style scoped>

</style>

