<template>
  <Card class="tej-account-card">
    <p slot="title">账户基本信息填写</p>
    <Form :label-width="75" class="tej-accout-form" ref="addUserForm">
      <FormItem label="姓名：" prop="userName">
        <Input v-model="formFilter.userName"
               placeholder="请输入账户姓名..."
               style="width: auto"
               @on-change="userNameChange"
        />
      </FormItem>
      <FormItem label="联系号码：" prop="mobile">
        <Input v-model="formFilter.mobile"
               placeholder="请输入联系号码..."
               style="width: auto"
               @on-change="mobileChange"
        />
      </FormItem>
      <FormItem label="备注：" prop="message">
        <Input v-model="formFilter.message"
               type="textarea"
               :rows="4"
               placeholder="备注信息..."
               style="width:auto"
               @on-change="messageChange"
        />
      </FormItem>
    </Form>
  </Card>
</template>

<script>
  import { putModifyPassword } from '@/api/api'
  export default {
    name: 'AccountAdd',
    data() {
      return {
        formFilter: {},
//        userName: '',
//        mobile:'',
//        message: ''
      }
    },
    methods: {
      callback(){
        this.$emit('add-callback',{
          userName: this.formFilter.userName,
          mobile: this.formFilter.mobile,
          message: this.formFilter.message
        })
      },
      userNameChange(e){
        this.formFilter.userName = e.target.value
        this.callback()
      },
      mobileChange(e){
        this.formFilter.mobile = e.target.value
        this.callback()
      },
      messageChange(e){
        this.formFilter.message = e.target.value
        this.callback()
      }

    }
  }
</script>

<style>
  .tej-accout-form {
    padding: 0 20px;
  }
</style>


