<template>
  <div>
    <div v-for="(area, index) in areaObj" :key="index" class="tej-area-item">
      <AreaItem :area-item="area"
                :title="index"
                @allarea-check-callback="allareaCheckCallback"
      ></AreaItem>
    </div>
  </div>
</template>

<script>
  import {areaData} from '@/api/areaData'
  import bus from '@/utils/bus'
  import AreaItem from './AreaItem'

  export default {
    name: 'Area',
    components: { AreaItem },
    data() {
      return {
        areaObj: {},
        checkModel: [],
        list: []
      }
    },
    mounted() {
      this.areaObj = areaData
      this.allareaCheckCallback()
    },
    methods: {
      allareaCheckCallback(data){
        this.$emit('area-callback',data)
      }
    }
  }
</script>

<style scoped>
.tej-area-item {
  padding: 12px 0;
  border-bottom: 1px dashed #ddd;
}
</style>

