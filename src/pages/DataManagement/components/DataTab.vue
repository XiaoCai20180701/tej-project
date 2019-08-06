<template>
  <Table :columns="columnsData" :data="tableData"></Table>
</template>

<script>
  export default {
    name: 'DataTab',
    props: {
      tableData: {
        type: Array
      },
      columnsData: {
        type: Array
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>

