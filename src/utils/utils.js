import { Message } from 'iview'

/**
 *  返回上一步，取消按钮操作
 *  @param router: 路由
 * */
export const cancel = (router)=> {
  if (window.history.length <= 1) {
    router.push({
      path: '/'
    })
    return false
  } else {
    console.log('this.$router',router)
    router.go(-1)
  }
}

/**
 *  检查图片上传时的宽高
 *  @param file: 文件  width: 图片的宽  height:图片的高
 * */
export const checkImageWH = (file, width, height) =>  {
  return new Promise(function (resolve, reject) {
    let filereader = new FileReader()
    filereader.onload = e => {
      let src = e.target.result
      const image = new Image()
      image.onload = function () {
        if (width && this.width != width && height && this.height != height) {
          Message.error({
            content: '请上传【 ' + width + ' * ' + height + ' 】的图片'
          })
          console.log('111111111')
          reject()
        } else {
          resolve()
        }
      }
      image.onerror = reject
      image.src = src
    }
    filereader.readAsDataURL(file)
  })
}
