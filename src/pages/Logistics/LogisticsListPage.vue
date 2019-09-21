<template>
  <div class="tej-logistics">
    <div v-if="expressageList.length == 0">暂无数据，请先<a @click="add">创建物流模板</a></div>
    <div v-else>
      <div>
        <Button type="primary" @click="add">
          <Icon type="ios-add"/>
          新增物流模板
        </Button>
        <small>最多可添加20个运费模板</small>
      </div>
      <div class="tej-logistics-list">
        <Card class="tej-logistics-item" v-for="(item, index) in expressageList" :key="index">
          <LogisticsCardItem :item="item"
                             @logistics-carditem-callback="logisticsCardItemCallback"
          ></LogisticsCardItem>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  import {postExpressageList} from '@/api/api'
  import LogisticsCardItem from './components/LogisticsCardItem'

  export default {
    name: 'LogisticsListPage',
    components: { LogisticsCardItem },
    props: {},
    data() {
      return {
        expressageList: [],
        page: {
          index: 1,
          size: 10
        }
      }
    },
    computed: {
    },
    mounted() {
      this.getList()
    },
    methods: {
      logisticsCardItemCallback(){
        this.getList()
      },
      add() {
        this.$router.push({
          name: 'AddLogistics'
        })
      },
      getList() {
        let params = {
          page: this.page.index,
          pageSize: this.page.size,
          vendorId: sessionStorage.getItem('vendorId')
        }
        postExpressageList(params).then(res => {
          if (res.code != 200) {
            this.$Message.error(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.expressageList = res.data.list
          this.page = {
            index: res.data.page,
            size: res.data.pageSize
          }
        }).catch(err => {
          this.$Message.error('获取物流模板列表失败', err)
        })
      }
    }
  }
</script>

<style scoped>
  .tej-logistics {
    padding: 15px;
    background: #fff;
  }

  .tej-logistics-list {
    margin-top: 15px;
  }

  .tej-logistics-item {
    margin-bottom: 15px;
  }

</style>
