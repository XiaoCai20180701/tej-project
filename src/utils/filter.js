const filter = {
  '1000': function (val) {
    if (typeof (val) === 'number') {
    //  return (val).toFixed(2).replace(/(\d)(?=(\d{3}))/g, '$1,')
      return (val.toString().indexOf ('.') !== -1) ? val.toLocaleString() : val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
  },
  'money': function (val) {
    let value = Number(val)
    return value.toFixed(2)
  }
}
export default filter
