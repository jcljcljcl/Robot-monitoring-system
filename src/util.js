
//防抖函数
//防抖方法
function debounce(fn, ms = 500) {
    let timeoutId
    return function () {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }
export default debounce