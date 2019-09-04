<template>
  <div>
    <Select v-model="model7">
      <OptionGroup label="Hot Cities">
        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </OptionGroup>
      <OptionGroup label="Other Cities">
        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </OptionGroup>
    </Select>
  </div>
</template>

<script>
  import { DeliveryData } from '@/api/deliveryData'
  export default {
    name: 'Delivery',
    data(){
      return {
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        cityList1: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          }
        ],
        cityList2: [
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        model7: '',
        deliveryObj: {},
        AList: [],
        deliveryArray: [],
        list:[]
      }
    },
    mounted(){
      this.deliveryObj = DeliveryData
      this.getData()
      this.getList()
    },
    methods: {
      getData(){
        this.objKeySort(this.deliveryObj)
        console.log('!!!!!!!!!!!',this.objKeySort(this.deliveryObj))
        this.changeToArray()
      },
      getList(){
        console.log('DeliveryData',DeliveryData)
      },
      changeToArray(){
        for (let i in this.objKeySort(this.deliveryObj)) {
          let linshiObj = {};
          linshiObj[i] = this.objKeySort(this.deliveryObj)[i];
          this.deliveryArray.push({
            char: i,
            text: linshiObj[i]
          });
        }
       this.list = this.formatList(this.deliveryArray,'char')
        console.log('this.deliveryArray',this.deliveryArray)
        console.log('this.list',this.list)
      },
      formatList(arr,keyword) {
        let newArr1 = [];
        let tempArr = [];
        let k = 0;
        let firstWord = arr[0][keyword].charAt(0);//获取第一个分类字母
        arr.map((v) => {
          if(firstWord == v[keyword].charAt(0)){
            tempArr.push(v);
            newArr1[k] = {
              title:firstWord,
              items:tempArr
            }
          }else{
            //这里循环到这表示已经第二个字母了
            firstWord = v[keyword].charAt(0);//设置第二字母
            tempArr = [];//把之前的清除掉
            tempArr.push(v);//添加第一个
            newArr1[++k] = {//自增
              title: firstWord,
              items : tempArr
            }
          }
        });
        return newArr1;
      },
      objKeySort(arys) {
        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newkey = Object.keys(arys).sort();
        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        for(var i = 0; i < newkey.length; i++) { //遍历newkey数组
          //向新创建的对象中按照排好的顺序依次增加键值对
          newObj[newkey[i]] = arys[newkey[i]];
        }
        return newObj; //返回排好序的新对象
      }
    }
  }
</script>

<style scoped>

</style>
