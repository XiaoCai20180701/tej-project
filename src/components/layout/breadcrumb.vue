<template>
  <div class="layout-breadcrumb">
    <Breadcrumb>
      <Breadcrumb-item href="#">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
      <!--<Breadcrumb-item>某应用</Breadcrumb-item>-->
    </Breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumb',
    data(){
      return {
        breadcrumbList: []
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
</style>
