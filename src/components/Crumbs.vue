<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem v-for="(item, index) in crumbList"
                      :key="index"
                      :to="item.to"
      >
        {{item.title}}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'Crumbs',
    props: {
      list: Array
    },
    data() {
      return {
      }
    },
    computed: {
      crumbList(){
        return this.list
      }
    }
  }
</script>

<style scoped>

</style>
