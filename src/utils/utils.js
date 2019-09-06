
//返回上一步，取消按钮操作
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
