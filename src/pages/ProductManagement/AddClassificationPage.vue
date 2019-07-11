<template>
    <Row style="background:#eee;">
      <Col span="4">
        <Card>
          <p slot="title">已有分类</p>
          <Tree :data="list"></Tree>
        </Card>
      </Col>
      <Col span="14" offset="2">
        <Card>
          <p slot="title">新建分类</p>
          <Row>
            <Col span="8">
              <Card>
                <p slot="title">一级目录</p>
                <CheckboxGroup v-model="checkParentGroup">
                  <div v-for="(item, index) in parentList" :key="index">
                    <Checkbox :label="item.title"></Checkbox><b class="tej-delete-txt">删除</b>
                  </div>
                  <div>
                    <Checkbox>
                      <slot>
                        <Input v-model="newValue" clearable placeholder="请输入新分类" style="width: 160px" @on-change="getInputValue"/>
                      </slot>
                    </Checkbox>
                    <b class="tej-add-txt" @click="add">新增</b>
                  </div>
                </CheckboxGroup>
              </Card>
            </Col>
            <Col span="8" offset="2">
              <Card>
                <p slot="title">二级目录</p>
                <CheckboxGroup v-model="checkChildrenGroup">
                  <div v-for="(child, c) in childrenList" :key="c">
                    <Checkbox :label="child.title"></Checkbox><b class="tej-delete-txt">删除</b>
                  </div>
                </CheckboxGroup>
              </Card>
            </Col>
          </Row>
          <Row style="margin-top: 20px">
            <Col span="5" offset="10">
              <Button>取消</Button>
              <Button type="primary" @click="sumbit">确定</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
</template>

<script>
  import { getClassificationlist, editClassification } from '@/api/api'
  export default {
    name: 'AddClassificationPage',
    data() {
      return {
        list: [],
        parentList:[],
        checkParentGroup:[],
        childrenList:[],
        checkChildrenGroup: [],
        newValue: ''
      }
    },
    mounted() {
      this.getClassificationlist()
    },
    methods: {
      //提交
      sumbit(){
        let data = {"data": []}
        let params =
        editClassification(params).then(res => {
          this.$Message.success('成功新增商品分类')
        })
          .catch(err => {
            this.$Message.error('新增商品分类失败', err)
        })
      },
      getInputValue(event){
        this.newValue = event.target.value
      },
      //新增一级目录
      add(){
        this.parentList.push({title: this.newValue})
        this.newValue = ''
      },
      //获取已有分类、一级目录、二级目录
       getClassificationlist() {
        getClassificationlist('').then(res => {
          this.list = res.data.list
          this.list.map(item => {
            this.parentList.push({id: item.id,title: item.title})
            this.checkParentGroup.push(item.id)
            item.children.map(child => {
              this.childrenList.push({id: child.id, title: child.title})
              this.checkChildrenGroup.push(child.id)
            })
          })
          console.log('parentList',this.parentList)
        }).catch(err => {
          this.$Message.error('获取商品分类失败！',err)
        })
      }
    }
  }
</script>

<style scoped>
  .ivu-card-head {
    background: rgb(250,250,250) !important;
  }
  .ivu-card-body {
    min-height: 75vh;
  }
</style>
