<template>
  <div class="tej-add-logistics">
    <Card>
      <p class="tej-bule-card">运费模板设置</p>
      <Form :model="formLogistics" label-position="right" :label-width="100">
        <Row>
          <i-col span="8">
            <FormItem label="模板名称：">
              <Input v-model="formLogistics.title" @on-change="titleChange"/>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="8">
            <FormItem label="发货地：">
              <TejCascader :data="addressCascader"
                           @cascader-callback="cascaderCallback"
                           :cascader-model="formLogistics.cascaderModel"
              />
              <Input v-model="formLogistics.address" placeholder="详细地址" @on-change="addressChange" class="address"/>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="16">
            <FormItem label="运送方式：">
              <p>快递</p>
              <div class="tej-logistics-way">
                <RadioGroup v-model="type" @on-change="logisticsWayChange">
                  <Radio v-for="(item, index) in logisticsWay"
                         :label="item.id"
                         :key="index"
                  >
                    {{item.text}}
                  </Radio>
                </RadioGroup>
                <div class="txt">除特定地区外，其余地区的运费采用"默认运费"</div>
                <div v-if="showPiece(type)">
                  <!-- 按件计价 默认运费 -->
                  <div v-if="formLogistics.expressageInfoList.length>0">
                    <EditLogisticsPrice :type="type"
                                        @logistics-price-callback="logisticsPriceCallback"
                                        :data="formLogistics.expressageInfoList"
                                        @edit-logistics-price-callback="editLogisticsPriceCallback"
                    ></EditLogisticsPrice>
                  </div>
                </div>
                <div v-else>hjik</div>
              </div>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="8">
            <FormItem label="模板备注：">
              <Input v-model="formLogistics.remark" @on-change="remarkChange"/>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="8">
            <FormItem>
              <Button @click="handleCancel">取消</Button>
              <Button type="primary" @click="handleSave">保存</Button>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
  import TejCascader from '@/components/TejCascader'
  import {citysData} from '@/api/citysData'
  import Area from '@/components/Area'
  import {cancel} from '@/utils/utils'
  import {postAddExpressage, postExpressageDetail} from '@/api/api'
  import EditLogisticsPrice from './components/EditLogisticsPrice'

  export default {
    name: 'EditLogistics',
    components: {TejCascader, Area, EditLogisticsPrice},
    props: {},
    data() {
      return {
        addressCascader: [],
        cascaderModel: [],
        formLogistics: {
          title: '',
          address: '',
          way: '',
          remark: '',
          expressageInfoList: []
        },
        type: 0,   //默认是按件计价
        expressageCode: '',
        logisticsWay: [
          {
            id: 0,
            value: 'piece',
            text: '按件计价'
          },
          {
            id: 1,
            value: 'weight',
            text: '按重量计价'
          }
        ],
        AreaModal: false
      }
    },
    computed: {
      showPiece() {
        return function (id) {
          return id == 0 ? true : false
        }
      }
    },
    mounted() {
      this.addressCascader = citysData
      this.getDetail()
    },
    methods: {
      editLogisticsPriceCallback(){
        this.getDetail()
      },
      logisticsPriceCallback(data) {
        console.log('data!!!!!!!!', data)
        console.log('type!!!!!!!!', this.type)
        this.formLogistics.expressageInfoList = data
      },
      addressChange(e) {
        this.formLogistics.address = e.target.value
      },
      remarkChange(e) {
        this.formLogistics.remark = e.target.value
      },
      titleChange(e) {
        this.formLogistics.title = e.target.value
      },
      handleCancel() {
        cancel(this.$router)
      },
      handleSave() {
        let params = {
          vendorId: sessionStorage.getItem('vendorId'),
          title: this.formLogistics.title,
          sendPlace: this.sendPlace,
          address: this.formLogistics.address,
          expressageType: 0, //快递
          remark: this.formLogistics.remark,
          type: this.type,
          expressageInfoList: this.formLogistics.expressageInfoList
        }
        console.log('添加物流模板 参数', params)
        postAddExpressage(params).then(res => {
          if (res.code != 200) {
            this.$Message.error(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          this.$Message.success('添加物流模板成功')
          this.$router.push({name: 'LogisticsListPage'})
        }).catch(err => {
          this.$Message.error('添加物流模板失败', err)
        })
      },
      getDetail() {
        postExpressageDetail({id: this.$route.params.id}).then(res => {
          if (res.code != 200) {
            this.$Message.error(res.msg)
            if (res.code === 9998) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
            }
            return
          }
          let data = res.data
          console.log('jjj', res.data)
          console.log('1111111111',data.sendPlace.split(","))
          this.formLogistics = {
            title: data.title,
            address: data.address,
            remark: data.remark,
            cascaderModel: data.sendPlace.split(","),
            expressageInfoList: data.expressageInfoList
          }
          console.log('结果',this.formLogistics.expressageInfoList)
        }).catch(err => {
          this.$Message.error('获取物流模板信息失败', err)
        })
      },
      cascaderCallback(data) {
        console.log('发货地', data)
        this.sendPlace = data
      },
      logisticsWayChange(e) {
        console.log('val', e)
        this.type = e
      }
    }
  }
</script>


<style scoped>
  .tej-add-logistics .txt {
    float: right;
    color: #ccc;
  }

  .tej-add-logistics .address {
    margin-top: 20px;
  }

  .tej-add-logistics .tej-bule-card {
    padding-left: 15px;
  }

  .tej-logistics-way {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>


