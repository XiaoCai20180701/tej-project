<template>
  <Cascader :data="data"
            v-model="cascader"
            change-on-select
            @on-change="onChange"
  ></Cascader>
</template>

<script>
  export default {
    name: 'TejCascader',
    props: {
      data: Array,
      cascaderModel: {
        type: Array,
        required: false
      }
    },
    data() {
      return {
        cascader: []
      }
    },
    computed: {

    },
    mounted(){
      console.log('cascaderModel',this.cascaderModel)
      this.cascader = this.cascaderModel
    },
    methods: {
      onChange(value, selectedData) {
        console.log('级联选择',value, selectedData)
        this.$emit('cascader-callback',value)
      }
    }
  }
</script>

<style scoped>

</style>

