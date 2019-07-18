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
          @on-ok="handleOk('month')"
        >
          <a href="javascript:void(0)" @click="handleClick('month')">
            月 /
          </a>
        </DatePicker>
        <DatePicker
          :open="isWeekShow"
          :value="weekValue"
          confirm
          type="month"
          @on-change="handleWeekChange"
          @on-clear="handleClear('week')"
          @on-ok="handleOk('week')"
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
          @on-ok="handleOk('date')"
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
      tag:String,
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
        page: {
          index: 1,
          size: 10,
          total: 50
        },
        options: {
          shortcuts: [{
            text: '日',
            value() {
              const end = new Date();
              const start = new Date();
              return [start, end];
            },
            onClick: (picker) => {
              // this.$Message.info('Click today');
            }
          },
            {
              text: '周',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              },
              onClick: (picker) => {
                // this.$Message.info('Click a week ago');
              }
            },
            {
              text: '月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              },
              onClick: (picker) => {
                // this.$Message.info('Click a week ago');
              }
            }
          ]
        }
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
      handleMonthChange (date) {
        this.monthValue = date
        console.log('monthValue', date)
        let index = date.lastIndexOf("\-")
        let str  = date .substring(index + 1, date.length)
        console.log('monthValue', str)
      },
      handleWeekChange (date) {
        this.weekValue = date
        console.log('weekValue', date)
      },
      handleDateChange (date) {
        this.dateValue = date
        console.log('dateValue', date)
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
      handleOk (name) {
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
      dateChange(objc,a) {
        console.log(objc,a);
        this.$emit('dateChange',this.$refs.dev.id,objc);
      }
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

