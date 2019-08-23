<template>
  <div>
    <ComplaintContentItem v-for="(item, index) in data.list"
                          :key="index"
                          class="tej-complaint-item"
                          :info="item"

    ></ComplaintContentItem>
    <!--<div @click="handleLoadingMore">加载更多</div>-->
  </div>
</template>

<script>
  import ComplaintContentItem from './ComplaintContentItem'

  export default {
    name: 'ComplaintContent',
    components: {ComplaintContentItem},
    props: {
      data: Object
    },
    data() {
      return {
        list: []
      }
    },
    methods: {
      handleLoadingMore() {
        this.$emit('loading-more-callback')
      }
    }
  }
</script>

<style scoped>
  .tej-complaint-item {
    margin-bottom: 20px;
  }
</style>
