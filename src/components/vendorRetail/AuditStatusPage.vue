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
      this.getAuditinfo()
    },
    methods: {
      getAuditinfo() {
        if(this.isVendor){
          console.log('厂商审核详情11111')
          postVendorInfo({
            vendorId: this.$route.query.vendorId
          }).then(res => {
            console.log('厂商审核详情',res)
            this.info = res.data
            this.retailInfo = res.data.retailInfo
          }).catch(err => {
            this.$Message.error('获取信息失败', err)
          })
        }else {
          console.log('零售商审核详情11111')
          postAuditInfo({
            retailId: this.$route.query.retailId
          })
            .then(res => {
              console.log('零售商审核详情',res)
              this.info = res.data
              this.retailInfo = res.data.retailInfo
            })
            .catch(err => {
              this.$Message.error('获取信息失败', err)
            })
        }
      },
     saveAudit(status, reason) {
        putSaveAudit({
          retailId: this.$route.query.retailId,
          isUsed: status,
          reason: reason
        })
          .then(res => {
            console.log('putSaveauditOk', res)
            if (status == 0) {
              //审核失败
              if (this.isVendor) {
                this.$Modal.warning({
                  title: '已拒绝该厂商的审核',
                  content: '厂商将受到审核失败的理由。',
                  onOk: ()=>{
                    this.$router.push({ name: 'NotPassPage'})
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
                });
              }

            } else {
              this.$Modal.success({
                title: this.isVendor?'厂商商标':'零售商商标',
                content: '审核成功',
                onOk: ()=> {
                  this.$router.push({ name: 'CheckedPage'})
                }
              })
            }

          })
          .catch(err => {
            this.$Message.error('获取信息失败', err)
          })
      }
    }
  }
</script>

<style scoped>
</style>
