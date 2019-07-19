<template>
  <div style="margin-bottom: 20px">
    <div class="tej-top-date-title">
      <p class="tej-top-date-txt">{{listName}}</p>
      <p  class="tej-top-date" :id= tag ref ="dev">
        <DatePicker
          :open="isMonthShow"
          :value="monthValue"
          confirm
          type="month"
          @on-change="handleMonthChange"
          @on-clear="handleClear('month')"
          @on-ok="handleOk('month',startDate,endDate)"
        >
          <a href="javascript:void(0)" @click="handleClick('month')">
            月 /
          </a>
        </DatePicker>
        <DatePicker
          :open="isWeekShow"
          :value="weekValue"
          confirm
          type="date"
          @on-change="handleWeekChange"
          @on-ok="handleOk('week',startDate,endDate)"
        >
          <a href="javascript:void(0)" @click="handleClick('week')">
            周 /
          </a>
        </DatePicker>
        <DatePicker
          :open="isDateShow"
          :value="dateValue"
          confirm
          type="date"
          @on-change="handleDateChange"
          @on-clear="handleClear('date')"
          @on-ok="handleOk('date',startDate,endDate)"
        >
          <a href="javascript:void(0)" @click="handleClick('date')">
            日
          </a>
        </DatePicker>
		</p>
    </div>
    <Table  :columns="columnsData" :data="tableData" v-if="tableData.length > 0"></Table>
  </div>
</template>

<script>
  export default{
    name:'TopDateList',
    props:{
      listName:String,
      columnsData: Array,
      tableData: Array
    },
    data(){
      return{
        isMonthShow: false,
        isDateShow: false,
        isWeekShow: false,
        monthValue: '',
        weekValue: '',
        dateValue: '',
        weekEndDate: 6, //周六是一周的最后一天
        startDate: null,
        endDate: null,
        page: {
          index: 1,
          size: 10,
          total: 50
        },
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{
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
        this.startDate = date + '-01 00:00:00'
        this.endDate = date + '-31 23:59:59'
      },
      handleWeekChange (date) {
        //TODO 样式可优化
        this.weekValue = date
        this.getWeek(date)
      },
      handleDateChange (date) {
        this.dateValue = date
        this.startDate = date + '00:00:00'
        this.endDate = date + '23:59:59'
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
        this.startDate = this.$Moment(monday).format('YYYY-MM-DD HH:mm:ss')
        this.endDate = this.$Moment(sunday).format('YYYY-MM-DD HH:mm:ss')
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
  .tej-top-date-title {
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #fff;
  }
  .tej-top-date-txt {
    flex: 5;
    margin-left: 15px;
    font-size: 14px;
  }
  .tej-top-date {
    flex: 1;
  }
  .tej-top-date .active {
    color: red
  }
  .tej-top-date:hover {
    cursor: pointer;
  }

</style>

