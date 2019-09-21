<template>
  <div>
    <div slot="title" class="header clearfix">
      <div class="left"><span class="name">{{item.title}}</span><span>发货地：{{item.sendPlace}}</span></div>
      <div class="right">
            <span>
              <Icon type="md-checkbox"  :style="iconColor" @click="editIsDefaultClick(item)"/>默认运费模板</span>
        <a @click="editClick(item.id)">修改</a> |
        <Poptip
          confirm
          transfer
          title="你确定要删除该运费模板吗?"
          @on-ok="okDelete(item.id)"
          @on-cancel="cancelDelete">
          <a>删除</a>
        </Poptip>
      </div>
    </div>
    <div>
      <div class="content clearfix">
        <p class="left">运送方式</p>
        <div class="right"><b class="w60">运送到</b><b class="w20">费率</b></div>
      </div>
      <div class="content clearfix">
        <p class="left">快递(按件)</p>
        <div class="right">
          <p v-for="(item, index) in item.expressageInfoList" :key="index">
            <span class="w60">{{item.place}}</span>
            <span class="w20">
                  {{item.defaultNum}}件以内{{item.defaultPrice | money}}元；
                  每增加{{item.changeNum}}件，增加运费{{item.changePrice | money }}元
                </span>
          </p>
        </div>
      </div>
      <div class="content clearfix">
        <p class="left">备注</p>
        <div class="right">
          <span class="w60">{{item.remark}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {deleteExpressage, putUpdateExpressage} from '@/api/api'
  export default {
    name: 'LogisticsCardItem',
    props: {
      item: Object
    },
    data(){
      return {
        iconColor: "color: #000",
        checkColor: false,
        deleteType: {
          'in': 1,   //删除物流单个运费的模板
          'out': 0   //删除物流模板
        }
      }
    },
    methods: {
      editIsDefaultClick(id){
        this.edit(id)
      },
      editClick(id){
        this.$router.push({
          name: 'EditLogistics',
          params: { id: id}
        })
      },
      handleIsDefault(isDefault){
        isDefault = !isDefault
        this.iconColor = isDefault == 0 ? "color: #000" : "color: #1890FF"
      },
      edit(item){
        this.handleIsDefault(item.isDefault)
        let params = {
          vendorId: sessionStorage.getItem('vendorId'),
          id: item.id
        }
        putUpdateExpressage(params).then(res => {
          if (res.code != 200) {
            this.$Message.error(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('修改成功')
          item.isDefault = 1
          this.getList()
        }).catch(err => {
          this.$Message.error('修改失败',err)
        })
      },
      okDelete(id) {
        //确定删除
        deleteExpressage({
          id: id,
          type: this.deleteType.out
        }).then(res => {
          if (res.code != 200) {
            this.$Message.error(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('删除物流模板成功')
          this.$emit('logistics-carditem-callback')
        }).catch(err => {
          this.$Message.error('删除物流模板失败', err)
        })
      },
      cancelDelete() {
        //取消删除
      },
    }
  }
</script>

<style scoped>
  .tej-logistics-item .name {
    display: inline-block;
    margin-right: 40px;
    font-size: 15px;
  }

  .tej-logistics-item .w60 {
    display: inline-block;
    width: 60%;
  }

  .tej-logistics-item .w20 {
    display: inline-block;
    width: 30%;
  }

  .tej-logistics-item .content {
    margin-bottom: 15px;
  }

  .tej-logistics-item .content .left {
    float: left;
    margin-right: 40px;
  }

  .tej-logistics-item .content .right {
    margin-left: 110px;
  }

  .tej-logistics-item .header .left {
    float: left;
  }

  .tej-logistics-item .header .right {
    float: right;
  }
</style>
