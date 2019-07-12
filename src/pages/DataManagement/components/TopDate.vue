<template>
  <div style="margin-bottom: 20px">
    <div style="height: 40px; background: white;">
      <span class="spanHeadClass">{{listName}}</span>
      <span  style="margin-right: 0px;float: right;height: 40px;" :id= tag ref ="dev">
			<DatePicker type="daterange" :options="options" @on-change="dateChange" placeholder="Select date"
                  style="width: 200px;margin-top: 3.5px;margin-right:5px;" ></DatePicker>
		</span>
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
      dateChange(objc,a) {
        console.log(objc,a);
        this.$emit('dateChange',this.$refs.dev.id,objc);
      }
    }


  }
</script>

<style scoped>
  .spanHeadClass {
    color: #000000;
    font-size: 14px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    margin-left: 10px;
  }
</style>

