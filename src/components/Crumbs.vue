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
        console.log('list!!!!!!!!!!!!!',this.list)
        console.log('crumb route',this.$route.params)
        return this.list
      }
    },
    mounted(){
      console.log('crumbs props',this.list)
    },
    methods: {
      //厂家待审核 =》 审核页面
//      setCrumbConfig(){
//        if(this.$route.params.isVendor){
//
//        }
//      }
    }
  }
</script>

<style scoped>

</style>
