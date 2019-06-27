<template>
    <Submenu :name="title">
      <template slot="title">
        <Icon type="ios-navigate"></Icon>
        {{title}}
      </template>
      <MenuItem v-for="(sub,m) in submenu.submenu_list" :name="id + '-' + m" :key="id + '-' + m">
        {{sub.name}}
      </MenuItem>
    </Submenu>
</template>

<script>
  export default {
    name: 'submenu',
    props: {
      id: String,
      title: String,
      submenu: Object
    },
    data(){
      return {
      }
    }
  }
</script>

<style>

</style>


