<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .tej-product-box {
    margin-bottom: 20px;
  }
  .tej-product-box p {
    margin-bottom: 5px;
  }
  .tej-delete-txt {
    float: right;
    margin-left: 20px;
    font-weight: normal;
    color: #ef2a2a;
    opacity: 0.65;
  }
  .tej-add-txt,.tej-edit-txt {
    float: right;
    font-weight: normal;
    color: #1890ff;
  }
  .tej-delete-txt:hover,.tej-add-txt:hover,.tej-edit-txt:hover {
    cursor: pointer;
  }
  .tej-main {
    /*padding: 15px;*/
    /*background: #fff;*/
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  .clearfix {
    zoom: 1;
  }
  .clearfix:after {
    display: block;
    content: '';
    clear: both;
  }
  .tej-page-box {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }

  .tej-page {
    flex: 1;
    text-align: right;
    align-self: center;
  }
  .ivu-radio-inner, .ivu-radio-inner:after {
    border-radius: 0 !important;
  }
</style>
