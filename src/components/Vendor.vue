<template>
  <Select v-model="vendor"
          @on-change="vendorChange"
          :disabled="disabled">
    <OptionGroup
          v-for="(item, index) in vendorList"
          :key="index"
          :label="item.area">
        <Option v-for="(child, c) in item.children" :value="child.vendorId" :key="child.vendorId">{{ child.vendorName}} ({{child.vendorId}})</Option>
    </OptionGroup>
  </Select>
</template>

<script>
  export default {
    name: 'Vendor',
    props: {
      vendorList: Array,
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data(){
      return {
        vendor: null
      }
    },
    methods: {
      vendorChange(val) {
        this.$emit('vendor-change-callback', val)
      }
    }
  }
</script>

<style scoped>

</style>
