<template>
  <Timeline>
    <TimelineItem v-for="(item, index) in list" :key="index" :color="color(index)">
      <p class="time">{{item.ftime}}</p>
      <p class="content">{{item.context}}</p>
    </TimelineItem>
  </Timeline>
</template>

<script>
  export default {
    name: 'TejTimeline',
    props: {
      list: Array
    },
    data() {
      return {

      }
    },
    computed: {
      color(){
        return function (index) {
          return index == 0 ? 'green': 'blue'
        }
      }
    }
  }
</script>

<style scoped>

</style>
