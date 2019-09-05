<template>
  <div style="background: white; height:600px; padding: 15px;">
    <p class="title_top">优惠劵基本信息</p>
    <div>
      <Form :model="formInline" :label-width="120">
        <FormItem label="优惠劵名称:">
          <Input type="text"
                 v-model="formInline.couponName"
                 placeholder="请输入优惠名称"
                 @on-change="couponNameChange"
                 v-if="!isDetail"/>
          <p v-else>{{couponInfo.couponName}}</p>
        </FormItem>
        <FormItem label="优惠折扣:">
          <Input type="text"
                 v-model="formInline.couponThreshold"
                 placeholder="满"
                 @on-change="couponThresholdChange"
                 v-if="!isDetail"/>
          <span v-else>
            <span>满</span><span style="color: orangered;">{{couponInfo.couponThreshold}}元</span>
            <span>减</span><span style="color: orangered;">{{couponInfo.couponPrice}}元</span>
          </span>
        </FormItem>
        <FormItem style="width: 100%">
          <Input type="text"
                 v-model="formInline.couponPrice"
                 placeholder="减"
                 @on-change="couponPriceChange"
                 v-if="!isDetail"
          />
        </FormItem>
        <FormItem label="发放数量:" >
          <Input type="text"
                 v-model="formInline.number"
                 placeholder="请输入发放张数"
                 @on-change="numberChange"
                 v-if="!isDetail"
          />
          <p>{{couponInfo.number}}张</p>
        </FormItem>
        <FormItem label="领取数量:" v-if="isDetail">
          <p>{{couponInfo.receiveNum}}张</p>
        </FormItem>
        <FormItem label="已使用数量：" v-if="isDetail">
          <p>{{couponInfo.useNum}}张</p>
        </FormItem>
        <FormItem >
          <!-- <p style = "border-bottom: 2px dashed #333333;">1</p> -->
        </FormItem>
        <FormItem label="使用期限:" >
          <DatePicker type="date"
                      placeholder=" 请选择初始时间"
                      v-model="formInline.startTime"
                      @on-change="handleStartTimeChange"
                      v-if="!isDetail"
          ></DatePicker>
          <span v-else>
             <p><span>{{couponInfo.startTime}}</span> - <span>{{couponInfo.endTime}}</span></p>
          </span>
        </FormItem>
        <FormItem >
          <DatePicker type="date"
                      placeholder="请选择终止时间"
                      v-model="formInline.endTime"
                      @on-change="handleEndTimeChange"
                      v-if="!isDetail"
          ></DatePicker>
        </FormItem>
        <FormItem label="优惠劵状态:" v-if="isDetail">
          <p :style="getStatusStyle(couponInfo.status)">
            {{couponInfo.status}}
          </p>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CouponInfo',
    props: {
      isDetail: Boolean,
      couponInfo: {
        type: Object,
        required: false,
        default: function () {
          return { }
        }
      }
    },
    data(){
      return {
        status: 1,
        formInline: {
          couponName: '',
          couponThreshold: '',
          couponPrice: '',
          number: '',
          startTime: '',
          endTime: ''
        },
      }
    },
    computed: {
      getStatusStyle(){
        return function(val){
          let checked = val === '已到期'
          return checked ? 'color:red': 'color:#00A73C'
        }
      }
    },
    methods: {
      callback(){
        this.$emit('coupon-info-callback',{
          couponName: this.formInline.couponName,
          couponThreshold: this.formInline.couponThreshold,
          couponPrice: this.formInline.couponPrice,
          number: this.formInline.number,
          startTime: this.formInline.startTime,
          endTime: this.formInline.endTime
        })
      },
      numberChange(e){
        this.formInline.number = e.target.value
        this.callback()
      },
      couponNameChange(e){
        this.formInline.couponName = e.target.value
        this.callback()
      },
      couponThresholdChange(e){
        this.formInline.couponThreshold = e.target.value
        this.callback()
      },
      couponPriceChange(e){
        this.formInline.couponPrice = e.target.value
        this.callback()
      },
      handleStartTimeChange(date) {
        this.formInline.startTime = date
        this.callback()
        console.log('startTime', date, this.formInline.startTime)
      },
      handleEndTimeChange(date) {
        this.formInline.endTime = date
        this.callback()
        console.log('endTime', date, this.formInline.endTime)
      },
      confirmAction() {
        if (this.formInline.startTime !== '' && this.formInline.endTime == '') {
          this.$Message.warning("请选择结束时间");
          return
        }
        if (this.formInline.endTime !== '' && this.formInline.startTime == '') {
          this.$Message.warning("请选择开始时间");
          return
        }
        let startTime = this.$Moment(this.formInline.startTime).valueOf();
        let endTime = this.$Moment(this.formInline.endTime).valueOf();
        if (startTime > endTime) {
          this.$Message.warning("开始时间不能大于结束时间");
          return
        }

      }
    }
  }
</script>

<style scoped>
  .title_top {
    /*  border-left: 2.5px solid #1890FF;
  padding-left: 5px; */
    font-size: 15px;
    display: inline-block;
    line-height: 32px;
    height: 32px;
  }

  .title_top:before {
    content: "";
    border-left: 2.5px solid #1890FF;
    padding-left: 5px;
  }
</style>

