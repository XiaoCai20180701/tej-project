<template>
  <Row :gutter="20" style="margin-top: 10px;">
    <Col :xs="24" :sm="10" :md="12" :lg="8" v-for="(item, index) in allData" :key="index">
    <div class="tej-data-station">
      <div class="tej-data-content">
        <p class="content">
          {{item.data | 1000}}
          <span>{{item.txt}}</span>
        </p>
        <div class="icon">
          <i :class="[iconClass, item.icon]"></i>
          <p class="title">{{item.title}}</p>
        </div>
      </div>
      <div class="tej-data-date">
        <DatePicker
          :open="item.show.date"
          v-model="dateValue"
          confirm
          type="date"
          @on-change="handleDateChange"
          @on-clear="handleClear(item,'date')"
          @on-ok="handleOk(item, 'date')"
        >
          <a href="javascript:void(0)" @click="handleClick(item, 'date')" :class="{ active: item.show.date}">
            日
          </a>
        </DatePicker>
        <DatePicker
          :open="item.show.week"
          :value="weekValue"
          confirm
          type="date"
          @on-change="handleWeekChange"
          @on-clear="handleClear(item,'week')"
          @on-ok="handleOk(item,'week')"
        >
          <a href="javascript:void(0)" @click="handleClick(item, 'week')" :class="{ active: item.show.week}">
            周
          </a>
        </DatePicker>
        <DatePicker
          :open="item.show.month"
          :value="monthValue"
          confirm
          type="month"
          @on-change="handleMonthChange"
          @on-clear="handleClear(item,'month')"
          @on-ok="handleOk(item,'month')"
        >
          <a href="javascript:void(0)" @click="handleClick(item,'month')" :class="{ active: item.show.month}">
            月
          </a>
        </DatePicker>
      </div>
    </div>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: 'StationData',
    props: {
      allData: {
        type: Array
      },
    },
    data() {
      return {
        iconClass: 'iconfont',
        monthValue: '',
        weekValue: '',
        dateValue: '',
        weekendTime: 6, //周六是一周的最后一天
        startTime: null,
        endTime: null,
      }
    },
    methods: {
      callback(status){
        this.$emit('date-callback',{
          startTime: this.startTime,
          endTime: this.endTime,
          status: status
        })
      },
      handleClick(item, name){
        switch (name){
          case 'month':
            item.show = {
              date: false,
              week: false,
              month: !item.show.month
            }
            break
          case 'week':
            item.show = {
              date: false,
              week: !item.show.week,
              month: false
            }
            break
          case 'date':
            item.show = {
              date: !item.show.date,
              week: false,
              month: false
            }
            break
        }
      },
      handleOk (item, name) {
        console.log('okkkkkk',item)
        if(this.startTime == '' || this.endTime == ''){
          this.$Message.error('请选择时间')
          return
        }
        switch (name){
          case 'month':
            item.show.month = false
            break
          case 'week':
            item.show.week = false
            break
          case 'date':
            item.show.date = false
            break
        }
        this.callback(item.name)
      },
      handleMonthChange (date) {
        this.monthValue = date
        this.startTime = date + '-01'
        this.endTime = date + '-31'
        console.log('月', this.startTime,this.endTime)
      },
      handleWeekChange (date) {
        //TODO 样式可优化
        this.weekValue = date
        this.getWeek(date)
      },
      handleDateChange (date) {
        this.dateValue = date
        this.startTime = date
        this.endTime = date
        console.log('日', this.startTime,this.endTime)
      },
      getWeek(checkedDate){
        let day =  new Date(checkedDate).getDay()  //选中的日期是这周的第几天
        let stepSunday = - day
        if(day == 0) {
          stepSunday = - this.weekendTime
        }
        let stepMonday = this.weekendTime - day
        let time = this.$Moment(checkedDate).valueOf()
        let monday = new Date(time +stepSunday *24*3600*1000 )
        let sunday = new Date(time +stepMonday *24*3600*1000 )
        this.startTime = this.$Moment(monday).format('YYYY-MM-DD')
        this.endTime = this.$Moment(sunday).format('YYYY-MM-DD')
        console.log('周', this.startTime,this.endTime)
      },
      handleClear (item,name) {
        switch (name){
          case 'month':
            item.show.month = false
            break
          case 'week':
            item.show.week = false
            break
          case 'date':
            item.show.date = false
            break
        }
      },
    }
  }
</script>

<style scoped>
  .tej-data-station {

    padding: 30px 60px;
    /*background: white;*/
    background: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 33%, rgba(240, 240, 240, 1) 44%, rgba(252, 252, 252, 1) 53%, rgba(255, 255, 255, 1) 59%, rgba(255, 255, 255, 1) 100%);
  }

  .tej-data-station .title {
    color: #02b5f7;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
  }

  .tej-data-content {
    display: flex;
  }

  .tej-data-station .icon {
    flex: 1;
    text-align: right;
  }

  .tej-data-station .content {
    flex: 2;
    color: #02b5f7;
    font-size: 32px;
    padding-top: 0px;
    height: 68px;
    text-align: right;
  }

  .tej-data-station .content span {
    display: block;
    font-size: 15px;
  }

  .tej-data-station .icon i {
    font-size: 60px;
    color: #02b5f7;
  }

  .tej-data-date {
    color: #02b5f7;
    cursor: pointer;
  }
  .tej-data-date span + span {
    display: inline-block;
    margin-left: 10px;
  }

  .tej-data-date .active {
    color: red;
    border-bottom: 2px solid red;
  }
</style>


