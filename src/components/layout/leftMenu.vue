<template>
  <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
    <div class="tej-logo">童e家后台管理系统</div>
    <sub-menu v-for="(item,index) in list" :key="index" :id="item.id" :title="item.name" :submenu="item"></sub-menu>
  </Menu>
</template>

<script>
  import SubMenu from './submenu'
  export default {
    name: 'leftMenu',
    components: {
      'sub-menu': SubMenu
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        list:[]
      }
    },
    created(){
    },
    mounted(){
      this.list = this.$store.state.menuList.menu_list
    },
    methods: {
    }
  }
</script>

<style>
  .tej-logo {
    color: #fff;
    font-size: 20px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #464c5b;
  }
</style>

