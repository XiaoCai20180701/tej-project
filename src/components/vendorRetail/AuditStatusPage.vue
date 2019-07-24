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
    putSaveAudit
  } from '@/api/api'
  export default {
    name: 'AuditStatusPage',
    components: {
      'Audit': Audit
    },
    data() {
      return {
        isAudit: 0,  //0不通过 1通过
        isVendor: this.$route.params.isVendor,
        info: {},
        retailInfo: {}
      }
    },
    mounted() {
      this.getAuditinfo()
    },
    methods: {
      getAuditinfo() {
        let params
        if(this.$route.params.isVendor){
          params = { vendorId: this.$route.query.vendorId}
        }else {
          params = { retailId: this.$route.query.retailId}
        }
        console.log('params !!!!',params)
        postAuditInfo(params)
          .then(res => {
            console.log('postAuditinfoOk', res)
            this.info = res.data
            this.retailInfo = res.data.retailInfo
          })
          .catch(err => {
            this.$Message.error('获取信息失败', err)
          })
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
