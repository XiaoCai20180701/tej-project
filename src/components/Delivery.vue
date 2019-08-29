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
        model7: ''
      }
    },
    mounted(){
      this.getList()
    },
    methods: {
      getList(){
        console.log('DeliveryData',DeliveryData)
      }
    }
  }
</script>

<style scoped>

</style>
