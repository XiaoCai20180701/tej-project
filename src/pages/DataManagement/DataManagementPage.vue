<template>
  <div>
    <StationData :all-data="allData"
                 @date-callback="dateCallback"
                 v-if="show"
    >
    </StationData>
    <DataTab></DataTab>
  </div>
</template>

<script>
  import DataTab from './components/DataTab'
  import StationData from './components/StationData'
  import {
    dataStatus,
    stationStatus,
    userType
  } from '@/api/tableData'
  import {getStationdata, postRanklist, getRankAllList} from '@/api/api'

  export default {
    name: 'DataManagementPage',
    components: {
      'DataTab': DataTab,
      'StationData': StationData
    },
    data() {
      return {
        allData: [],
        stationInfo: {},
      }
    },
    computed: {
      show(){
        let checked = sessionStorage.getItem('userType') == userType.platform
        return checked ? true : false
      }
    },
    mounted() {
      this.getInit()
    },
    methods: {
      dateCallback(data){
        data.status = stationStatus.find(val => val.name == data.status).status
        this.getStation(data)
      },
      getStation(params) {
        console.log('params',params)
        let name = stationStatus.find(val => val.status == params.status).name
        console.log('anme',name)
        getStationdata(params).then(res => {
            if (res.code != 200) {
              this.$Message.warning(res.msg)
              if(res.code === 9998){
                sessionStorage.clear()
                this.$router.push({path: '/login'})
              }
              return
            }
            let data = res.data
            this.allData.map(item => {
              console.log('item---------',item)
              if(item.name == name){
                item.data = data.number
              }
            })
          })
          .catch(err => {
            this.$Message.error('获取全站数据失败', err)
          })
      },
      getInit() {
        getRankAllList().then(res => {
          if (res.code != 200) {
            this.$Message.warning(res.msg)
            if(res.code === 9998){
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          this.stationInfo = data.stationInfo
          this.productTrafficList = data.productTrafficList
          this.vendorSalesList = data.vendorSalesList
          this.cooperationList = data.cooperationList
          this.productSalesList = data.productSalesList
          this.vendorTrafficList = data.vendorTrafficList
          this.getInitStation(data.stationInfo)
        }).catch(err => {
          this.$Message.error('排行榜请求失败' + err)
        })
      },
      getInitStation(data) {
        this.allData = [
          {
            title: '全站访问量',
            name: 'stationTraffic',
            data: data.stationTraffic,
            icon: 'icon-fangwenliang',
            txt: '次',
            show: {
              date: false,
              month: false,
              week: false
            }
          },
          {
            title: '全站销售量',
            name: 'stationSales',
            data: data.stationSales,
            icon: 'icon-datubiao',
            txt: '件',
            show: {
              date: false,
              month: false,
              week: false
            }
          },
          {
            title: '全站销售额',
            name: 'stationPrice',
            data: data.stationPrice,
            icon: 'icon-xiaoshoue',
            txt: '元',
            show: {
              date: false,
              month: false,
              week: false
            }
          },
        ]
      },
    }
  }
</script>

<style scoped>
  .tej-data-tabs {
    min-height: 56vh;
    padding: 18px;
    margin: 20px 0;
    background: #fff;
  }

</style>

