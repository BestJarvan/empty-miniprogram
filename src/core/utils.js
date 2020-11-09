/*
 * @Author: Yahui.Jiang
 * @Date: 2020-01-15 14:31:20
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-09 10:30:24
 * @Description:
 */
const toString = Object.prototype.toString

export function isFun (value) {
  return typeof value === 'function'
}

export function isPlainObject (value) {
  return toString.call(value) === '[object Object]'
}

export function extend (to, from) {
  if (!from) return to

  Object.keys(from).forEach(key => {
    if (!to[key]) {
      to[key] = from[key]
      return
    }
    // 两者都是函数，合并函数
    if (isFun(from[key]) && isFun(to[key])) {
      const formFun = from[key]
      const toFun = to[key]
      to[key] = function (...args) {
        formFun.apply(this, args)
        toFun.apply(this, args)
      }
      return
    }

    // 两者都是对象
    if (isPlainObject(from[key]) && isPlainObject(to[key])) {
      to[key] = extend(to[key], from[key])
      return
    }

    // 两者都是数组
    if (Array.isArray(from[key]) && Array.isArray(to[key])) {
      to[key] = [...to[key], ...from[key]]
      return
    }

    // 其他数据类型
    to[key] = from[key]
  })
  return to
}

export function deepMerge (...args) {
  const result = Object.create(null)

  args.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]

        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
