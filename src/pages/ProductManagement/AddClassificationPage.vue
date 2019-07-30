<template>
  <Row :gutter="18" style="background:#eee;">
    <Col :xs="24" :sm="24" :md="5" :lg="5">
      <Card class="tej-card-tree">
        <p slot="title">已有分类</p>
        <Tree :data="list"></Tree>
      </Card>
    </Col>
    <Col :xs="24" :sm="24" :md="19" :lg="19">
      <Card class="tej-add-classification">
        <p slot="title">新建分类</p>
        <Row>
          <Col span="8">
          <Card>
            <p slot="title">一级目录</p>
            <RadioGroup v-model="checkParent" @on-change="parentChange">
              <div v-for="(item, index) in parentList" :key="index" class="item">
                <Radio :label="item.id" @click="">{{item.title}}</Radio>
                <b class="tej-delete-txt" @click="deleteFun(item)">删除</b>
              </div>
              <div class="item">
                <Radio>
                  <slot>
                    <Input v-model="newValue"
                           clearable
                           placeholder="请输入新分类"
                           style="width: 160px"
                           @on-change="getInputValue"
                           size="small"
                    />
                  </slot>
                </Radio>
                <b class="tej-add-txt" @click="addParent">新增</b>
              </div>
            </RadioGroup>
          </Card>
          </Col>
          <Col span="8" offset="2">
          <Card>
            <p slot="title">二级目录</p>
            <RadioGroup v-model="checkChildren">
              <div v-for="(child, c) in childrenList" :key="c" class="item">
                <Radio :label="child.title"></Radio>
                <b class="tej-delete-txt" @click="deleteFun(child)">删除</b>
              </div>
              <div class="item">
                <Radio>
                  <slot>
                    <Input v-model="newChildrenValue"
                           clearable
                           placeholder="请输入新分类"
                           style="width: 160px"
                           @on-change="getInputChildrenValue"
                           size="small"
                    />
                  </slot>
                </Radio>
                <b class="tej-add-txt" @click="addChildren">新增</b>
              </div>
            </RadioGroup>
          </Card>
          </Col>
        </Row>
        <div class="tej-cancel-btngroup">
          <Button @click="cancel">取消</Button>
        </div>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import {getClassificationlist, editClassification, addParentType, deleteType} from '@/api/api'

  export default {
    name: 'AddClassificationPage',
    data() {
      return {
        list: [],
        parentList: [],
        childrenList: [],
        newValue: '',
        newChildrenValue: '',
        checkParent: 1,
        checkChildren: 9,
        typeParentId: null
      }
    },
    mounted() {
      this.getClassificationlist()
    },
    methods: {
      cancel(){
        this.$router.push({
          name: 'ProductManagementPage'
        })
      },
      parentChange(e) {
        this.parentList.find((item) => {
          this.childrenList = item.children
          return item.id == e
        })
      },
      getInputValue(event) {
        this.newValue = event.target.value
      },
      getInputChildrenValue(event) {
        this.newChildrenValue = event.target.value
      },
      //删除目录
      deleteFun(item) {
        let content = '当您在删除「' + item.title + '」时，将同时删除「' + item.title + '」中的所有二级目录，请您确认是否执行此操作'
        //删除一级目录设置提示
        if (item.children) {
          this.$Modal.confirm({
            title: '删除目录',
            content: content,
            onOk: () => {
              this.deleteTypeFun(item.id)
              this.$Message.success('删除成功')
            },
            onCancel: () => {
              this.$Message.info('取消删除')
            }
          })
        } else {
          //直接删除二级目录
          this.deleteTypeFun(item.id)
          this.$Message.success('删除成功')
        }
      },
      deleteTypeFun(id) {
        deleteType(id).then(res => {
          this.getClassificationlist()
        })
          .catch(err => {
            this.$Message.error('删除目录失败', err)
          })
      },
      //新增目录
      addParent() {
        this.isParent = true
        this.newValue === '' ? this.$Message.error('一级分类名称不能为空') : this.add(this.isParent)
      },
      addChildren() {
        this.isParent = false
        this.newChildrenValue === '' ? this.$Message.error('二级分类名称不能为空') : this.add(this.isParent)
      },
      add(isParent) {
        addParentType({
          typeParentName: isParent ? this.newValue : this.newChildrenValue,
          typeParentId: isParent ? '' : this.typeParentId
        })
          .then(res => {
            console.log('新增目录', res)
            //  this.parentList.push({title: this.newValue})
            if (isParent) {
              this.list.push({title: this.newValue})
              this.typeParentId = res.data.id
              this.newValue = ''
            } else {
              this.childrenList.push({title: this.newChildrenValue})
              this.newChildrenValue = ''
            }
          })
          .catch(err => {
            this.$Message.error('新增失败', err)
          })
      },
      //获取已有分类、一级目录、二级目录
      getClassificationlist() {
        getClassificationlist('').then(res => {
          let data = res.data
          this.list = data.list
          this.parentList = data.list
          data.list.find((item, index) => {
            this.childrenList = item.children
            this.checkParent = item.id
            return index == 0
          })
        }).catch(err => {
          this.$Message.error('获取商品分类失败！', err)
        })
      }
    }
  }
</script>

<style>
  .tej-card-tree .ivu-card-head,.tej-add-classification  .ivu-card-head{
    background:  #f3f7f9 !important;
  }

  .tej-card-tree {
    min-height: 80vh;
  }

  .tej-add-classification {
    min-height: 80vh;
  }

  .tej-add-classification .item {
    margin: 5px 0;
  }

  .ivu-radio-inner, .ivu-radio-inner:after {
    border-radius: 0 !important;
  }

  .tej-cancel-btngroup {
    position: absolute;
    bottom: 20px;
    left: 35%;
    text-align: center;
  }
</style>
