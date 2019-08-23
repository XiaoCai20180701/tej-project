<template>
  <div class="tej-complaint-card">
    <Card >
      <div slot="title">
        <Tag :color="tagColor(info.type)">{{getTagName(info.type)}}</Tag>
        标题：{{info.title}}
      </div>
      <div slot="extra">
      <span v-if="info.status === status.processed">
        <Tag color="success">已解决</Tag>
        <a @click.prevent="look(info.id)" class="look">查看解决报告</a>
      </span>
        <a @click.prevent="solve(info.id)" v-if="info.status === status.unprocessed">点击确认解决</a>
      </div>
      <div> {{info.content}}</div>
      <div class="tej-complaint-imglist">
        <img v-for="(img, index) in info.imgList"
             :key="index"
             :src="baseUrl + img.url"
             class="tej-img-80"
             @click="viewImg(img)"
        />
      </div>
    </Card>
    <div class="tej-complaint-card-footer">
      <span>投诉人：{{info.contacts}}</span>
      <span>投诉电话：{{info.mobile}}</span>
      <span>{{info.creatTime}}</span>
    </div>
  </div>
</template>

<script>
  import {complainStatus, complainType} from '@/api/tableData'
  import  bus from '@/utils/bus'
  export default {
    name: 'ComplaintContentItem',
    props: {
      info: Object,
    },
    data() {
      return {
        baseUrl: this.$IMG_URL,
        status: complainStatus,
      }
    },
    computed:{
      tagColor(){
        return function (type) {
          switch (type) {
            case complainType.platform:
              return 'magenta'
            break
            case complainType.product:
              return 'blue'
            break
            default:
              return 'orange'
          }
        }
      },
      getTagName(){
        return function (type) {
          switch (type) {
            case complainType.platform:
              return '平台问题'
              break
            case complainType.product:
              return '商品问题'
              break
            default:
              return '服务投诉'
          }
        }
      }
    },
    methods: {
      solve(id) {
        bus.$emit('solve-callback',id)
      },
      look(id) {
        bus.$emit('look-callback',id)
      },
      viewImg(imgurl) {
        this.$Modal.info({
          render: (h) => {
            return h('img', {
                domProps: {
                  src: this.$IMG_URL + imgurl.url,
                  width: 375
                }
              }
            )
          }
        })
      }
    }
  }
</script>

<style>
  .tej-complaint-imglist {
    margin-top: 15px;
  }

  .tej-complaint-imglist img {
    cursor: pointer;
  }

  .tej-img-80 {
    width: 80px;
    height: 80px;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
  }

  .tej-complaint-card .ivu-card-head {
    padding-top: 10px;
    padding-bottom: 10px;
    background: #f3f7f9 !important;
  }
  .tej-complaint-card .ivu-card-bordered {
    border-bottom: none;
  }
  .tej-complaint-card .ivu-card{
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .tej-complaint-card-footer {
    padding: 10px 16px;
    background: #f3f7f9;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid #e8eaec;
  }
  .tej-complaint-card-footer span + span {
    display: inline-block;
    margin-left: 20px;
  }
  .tej-complaint-card-footer span:last-child {
    float: right;
  }
  .tej-complaint-form {
    width: 80%;
    margin: 0 auto;
  }
</style>

