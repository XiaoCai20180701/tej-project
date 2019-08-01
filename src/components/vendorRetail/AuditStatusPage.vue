<template>
  <div>
    <Audit :is-audit="isAudit"
           :is-vendor="isVendor"
           :info="info"
           :retail-info="retailInfo"
           @save-audit-callback="saveAudit"
    >
    </Audit>
  </div>
</template>

<script>
  import Audit from './Audit'
  import {
    postAuditInfo,
    putSaveAudit,
    putAuditIsUsed,
    postVendorInfo
  } from '@/api/api'
  export default {
    name: 'AuditStatusPage',
    components: {
      'Audit': Audit
    },
    data() {
      return {
        isAudit: this.$route.params.isAudit,  //0未审核 1已审核
        isVendor: this.$route.params.isVendor,
        info: {},
        retailInfo: {}
      }
    },
    watch:{
      $route(){
        this.isVendor = this.$route.params.isVendor
        this.isAudit = this.$route.params.isAudit
      },
//      isVendor() {
//        console.log("重新请求" + this.isVendor + "的数据")
//      }
    },
    mounted() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        //TODO 测试完成后，需要替换
//        this.isVendor ? this.getVendorInfo() : this.getAuditInfo()
        if(this.isVendor){
          console.log('厂商审核详情11111')
         this.getVendorInfo()
        }else {
          console.log('零售商审核详情11111')
          this.getAuditInfo()
        }
      },
      getVendorInfo(){
        postVendorInfo({
//          vendorId: this.$route.params.vendorId
          vendorId: this.$route.params.id
        }).then(res => {
          console.log('厂商审核详情',res)
          if(res.code != 200){
            this.$Message.warning(res.msg)
            return
          }
          this.info = res.data
          this.retailInfo = res.data.vendorInfo
        }).catch(err => {
          this.$Message.error('获取信息失败', err)
        })
      },
      getAuditInfo() {
        postAuditInfo({
//          retailId: this.$route.params.retailId
          retailId: this.$route.params.id
        })
          .then(res => {
            console.log('零售商审核详情',res)
            if(res.code != 200){
              this.$Message.warning(res.msg)
              return
            }
            this.info = res.data
            this.retailInfo = res.data.retailInfo
          })
          .catch(err => {
            this.$Message.error('获取信息失败', err)
          })
      },
     saveAudit(status, reason) {
//       let id = this.isVendor ? {vendorId: this.$route.params.vendorId} : {retailId: this.$route.params.retailId}
       let id = this.isVendor ? {vendorId: this.$route.params.id} : {retailId: this.$route.params.id}
       let params = {
         ...id,
         isUsed: status,
         reason: reason
       }
       this.save(status,params)
      },
      save(status,params){
        if(this.isVendor){
          putAuditIsUsed(params)
            .then(res => {
              console.log('厂家审核通过', res)
              if(res.code != 200){
                this.$Message.warning(res.msg)
                return
              }
              status == 0 ? this.fail() : this.success()
            })
            .catch(err => {
              this.$Message.error('审核失败', err)
            })
        }else {
          putSaveAudit(params)
            .then(res => {
              console.log('零售商审核通过', res)
              if(res.code != 200){
                this.$Message.warning(res.msg)
                return
              }
              status == 0 ? this.fail() : this.success()
            })
            .catch(err => {
              this.$Message.error('审核失败', err)
            })
        }
      },
      fail(){
        if (this.isVendor) {
          this.$Modal.warning({
            title: '已拒绝该厂商的审核',
            content: '厂商将受到审核失败的理由。',
            onOk: ()=>{
              this.$router.push({ name: 'NotPassVendorPage'})
            }
          })
        } else {
          this.$Modal.warning({
            title: '已拒绝该零售商的审核',
            content: '零售商将受到审核失败的理由。',
            onOk: ()=>{
              console.log('gikkkkkkkk')
              this.$router.push({ name: 'NotPassPage'})
            }
          })
        }
      },
      success(){
        if(this.isVendor) {
          this.$Modal.success({
            title: this.isVendor?'厂商商标':'零售商商标',
            content: '审核成功',
            onOk: ()=> {
              this.$router.push({ name: 'CheckedVendorPage'})
            }
          })
        }else {
          this.$Modal.success({
            title: this.isVendor?'厂商商标':'零售商商标',
            content: '审核成功',
            onOk: ()=> {
              this.$router.push({ name: 'CheckedPage'})
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>
