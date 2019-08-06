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
          :open="isDateShow"
          :value="dateValue"
          confirm
          type="date"
          @on-change="onChange"
        >
          <a href="javascript:void(0)" @click="handleClick('date')">
            日
          </a>
        </DatePicker>
        <!--<DatePicker-->
          <!--:open="isWeekShow"-->
          <!--:value="weekValue"-->
          <!--confirm-->
          <!--type="date"-->
          <!--@on-change="handleWeekChange"-->
          <!--@on-ok="handleOk('week',startDate,endDate)"-->
        <!--&gt;-->
          <!--<a href="javascript:void(0)" @click="handleClick('week')">-->
            <!--周-->
          <!--</a>-->
        <!--</DatePicker>-->
        <!--<DatePicker-->
          <!--:open="isMonthShow"-->
          <!--:value="monthValue"-->
          <!--confirm-->
          <!--type="month"-->
          <!--@on-change="handleMonthChange"-->
          <!--@on-clear="handleClear('month')"-->
          <!--@on-ok="handleOk('month',startDate,endDate)"-->
        <!--&gt;-->
          <!--<a href="javascript:void(0)" @click="handleClick('month')">-->
            <!--月-->
          <!--</a>-->
        <!--</DatePicker>-->
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
        isMonthShow: false,
        isDateShow: false,
        isWeekShow: false,
        monthValue: '',
        weekValue: '',
        dateValue: '',
        weekEndDate: 6, //周六是一周的最后一天
        startDate: null,
        endDate: null,
      }
    },
    method: {
      handleClick(name){
        switch (name){
          case 'month':
            this.isMonthShow = !this.isMonthShow
            break
          case 'week':
            this.isWeekShow = !this.isWeekShow
            break
          case 'date':
            this.isDateShow = !this.isDateShow
            break
        }
      },
      handleOk (name,startDate,endDate) {
        switch (name){
          case 'month':
            this.isMonthShow = false

            break
          case 'week':
            this.isWeekShow = false
            break
          case 'date':
            this.isDateShow = false
            break
        }
        this.$emit('date-change',startDate,endDate)
      },
      handleMonthChange (date) {
        this.monthValue = date
        this.startDate = date
        this.endDate = date
      },
      handleWeekChange (date) {
        //TODO 样式可优化
        this.weekValue = date
        this.getWeek(date)
      },
      handleDateChange (date) {
        this.dateValue = date
        this.startDate = date
        this.endDate = date
      },
      getWeek(checkedDate){
        let day =  new Date(checkedDate).getDay()  //选中的日期是这周的第几天
        let stepSunday = - day
        if(day == 0) {
          stepSunday = - this.weekEndDate
        }
        let stepMonday = this.weekEndDate - day
        let time = this.$Moment(checkedDate).valueOf()
        let monday = new Date(time +stepSunday *24*3600*1000 )
        let sunday = new Date(time +stepMonday *24*3600*1000 )
        this.startDate = this.$Moment(monday).format('YYYY-MM-DD')
        this.endDate = this.$Moment(sunday).format('YYYY-MM-DD')
      },
      handleClear (name) {
        switch (name){
          case 'month':
            this.isMonthShow = false
            break
          case 'week':
            this.isWeekShow = false
            break
          case 'date':
            this.isDateShow = false
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
</style>


