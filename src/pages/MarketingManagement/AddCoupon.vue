<template>
  <div>
    <Row :gutter="15">
      <Col span="6">
      <div style="background: white; height:600px; padding: 15px;">
        <p class="title_top">优惠劵基本信息</p>
        <div>
          <Form :model="formInline" :label-width="120">
            <FormItem label="优惠劵名称:" style="width: 100%">
              <Input type="text" v-model="formInline.name" placeholder="请输入优惠名称">
              </Input>
            </FormItem>
            <FormItem label="优惠折扣:" style="width: 100%">
              <Input type="text" v-model="formInline.full" placeholder="满">
              </Input>
            </FormItem>
            <FormItem style="width: 100%">
              <Input type="text" v-model="formInline.cut" placeholder="减">
              </Input>
            </FormItem>
            <FormItem label="发放数量:" style="width: 100%">
              <Input type="text" v-model="formInline.num" placeholder="请输入发放张数">
              </Input>
            </FormItem>
            <FormItem style="border-bottom: 1.5px dashed #999999; width: 100%;">
              <!-- <p style = "border-bottom: 2px dashed #333333;">1</p> -->
            </FormItem>
            <FormItem label="使用期限:" style="width: 100%">
              <DatePicker type="date" placeholder=" 请选择初始时间" v-model="formInline.startTime" @on-change="handleStartTimeChange"></DatePicker>
            </FormItem>
            <FormItem style="width: 100%">
              <DatePicker type="date" placeholder="请选择终止时间" v-model="formInline.endTime" @on-change="handleEndTimeChange"></DatePicker>
            </FormItem>
            <FormItem label="优惠劵状态:" style="width: 100%">
              <p v-if="status == 1" style="color: #00A73C;">未到期</p>
              <p v-else style="color: red;">已过期</p>
            </FormItem>
          </Form>
        </div>
      </div>
      </Col>
      <Col span="18">
      <div style="background: white; min-height:600px; padding: 15px;">
        <div style="margin-bottom: 10px;">
          <span class="title_top">可用优惠商品</span>
          <Button icon="md-add" style="float: right;display: inline-block;" type="primary" @click="modal = true"> 添加商品</Button>
          <Modal class ="tej-modal" v-model="modal" :closable="false" :mask-closable="false" width = 80vw>
            <div v-if = "modal == true">
              <AddCouponProduct style = "padding: 10px;min-height: 500px;max-height: 800px;overflow: auto;" ></AddCouponProduct>
            </div>
            <div slot="footer" style="text-align: center;padding: 20px;">
              <Button class="b_style" @click="modalCancel">取消</Button>
              <Button class="b_style" style="color: white; background: #409EFF;margin-left: 25px;" @click="modalOk">确认
              </Button>
            </div>
          </Modal>
        </div>
        <Table border :columns="columns" :data="data" style="width: 100%;">
        </Table>
      </div>
      <div style="margin-top: 20px;background: white;height: 60px;padding: 15px;">
        <div style="width: 180px; height: 35px;margin: 0 auto;">
          <Button class="b_style" @click ="cancel" > 取消</Button>
          <Button class="b_style" style="color: white; background: #409EFF;margin-right: 0px; float: right;"
                  @click="success"> 确认
          </button>
        </div>
      </div>

      </Col>
    </Row>
  </div>
</template>

<script>
  import AddCouponProduct from './AddCouponProduct'
  export default {
    name: "AddCoupon",
    components:{
      AddCouponProduct
    },
    data() {
      return {
        modal: false,
        status: 1,
        formInline: {
          name: '',
          full: '',
          cut: '',
          num: '',
          startTime: '',
          endTime: ''
        },
        columns: [{
            title: '编号',
            key: 'number'
          },
          {
            title: '商品名称',
            key: 'productName'
          },
          {
            title: '商品库存',
            key: 'stock'
          },
          {
            title: '活动期间销量(销量)',
            key: 'sales'
          },
          {
            title: '使用次数(次)',
            key: 'useNumber'
          }
        ],
        data: [
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20
          },
          {
            number: 'ZJTZ01111101',
            productName: '长袖',
            stock: 9000,
            sales: 2000,
            useNumber: 20
          }
        ],

      }
    },
    mounted() {

    },
    methods: {
      cancel() {
        if (window.history.length <= 1) {
          this.$router.push({
            path: '/'
          })
          return false
        } else {
          this.$router.go(-1)
        }
      },
      success(){
        this.cancel()
      },
     modalOk() {
       this.modal = false
     },
     modalCancel() {
       console.log('cancel')
       this.modal = false
     },
      handleStartTimeChange(date) {
        this.formInline.startTime = date
        console.log('startTime', date, this.formInline.startTime)
      },
      handleEndTimeChange(date) {
        this.formInline.endTime = date
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
          return;
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
