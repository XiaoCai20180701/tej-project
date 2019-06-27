<template>
  <div class="layout-header">
    我是头部
    <!--<i-button type="text" @click="toggleClick">-->
      <!--<Icon type="navicon" size="32"></Icon>-->
    <!--</i-button>-->
  </div>
</template>

<script>
  export default {
    name: 'headTop',
    data(){
      return {
      }
    },
    created(){
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style>
  .header_container{
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }
  .avator{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 37px;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
