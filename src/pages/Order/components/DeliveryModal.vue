<template>
  <Form :model="formLogistics" label-position="right" :label-width="100">
    <FormItem label="物流公司：">
      <!--<Input v-model="formLogistics.orderLogisticsName" @on-change="orderLogisticsNameChange"/>-->
      <Delivery @logistics-name-callback="logisticsNameCallback"></Delivery>
    </FormItem>
    <FormItem label="物流单号：">
      <Input v-model="formLogistics.orderLogisticsId" @on-change="orderLogisticsIdChange"/>
    </FormItem>
  </Form>
</template>

<script>
  import Delivery from '@/components/Delivery'
  import bus from '@/utils/bus'
  export default {
    name: 'DeliveryModal',
    components: {
      Delivery
    },
    data(){
      return {
        formLogistics: {
          orderLogisticsId: null,
          orderLogisticsName: ''
        }
      }
    },
    methods: {
      logisticsNameCallback(val){
        this.formLogistics.orderLogisticsName = val
        bus.$emit('formLogistics-callback',{
          orderLogisticsName: val,
          orderLogisticsId: this.formLogistics.orderLogisticsId
        })
      },
      orderLogisticsIdChange(e){
        this.formLogistics.orderLogisticsId = e.target.value
        bus.$emit('formLogistics-callback',{
          orderLogisticsName: this.formLogistics.orderLogisticsName,
          orderLogisticsId: e.target.value
        })
      },
    }
  }
</script>

<style scoped>

</style>

