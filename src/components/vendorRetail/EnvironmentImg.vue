<template>
  <div class="environment-imglist">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in imgList" :key="index">
        <div>
          <img :src="baseUrl + item.path" class="img" />
          <p class="title">{{item.name}}</p>
        </div>
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'EnvironmentImg',
    props: {
      imgList: Array
    },
    data() {
      return {
        baseUrl: this.$IMG_URL,
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          scrollbar: {
            el: '.swiper-scrollbar'
          }
        },
        imgArray:[
          'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
          'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
          'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
          'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
          'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
          'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg'
        ]
      }
    }
  }
</script>

<style>
  .swiper-slide {
    width: 80%;
  }
  .environment-imglist {
    height: 178px;
    padding: 10px 10px 0;
    background: #fff;
  }
  .environment-imglist .title {
    margin-top: 10px;
    text-align: center;
  }
  .environment-imglist .img {
    max-width: 100%;
  }
  .environment-imglist .swiper-container {
    height: 100%;
  }
  .environment-imglist .swiper-scrollbar-drag {
    background: #2d8cf0 !important;
  }
</style>
