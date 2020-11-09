/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-09 11:04:27
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-09 11:17:57
 * @Description: 格式化数据
 */
import * as utils from './is.js'

// 处理跳转参数为小程序需要参数
export const formatUrl = (params) => {
  if (!utils.isPlainObject(params)) return ''

  let str = ''

  const keys = Object.keys(params)

  for (let i = 0, len = keys.length; i < len; i++) {
    if (utils.isNull(params[keys[i]]) || utils.isUnd(params[keys[i]])) {
      continue
    }

    if (utils.isObject(params[keys[i]])) {
      str += `&${keys[i]}=${JSON.stringify(params[keys[i]])}`
    } else {
      str += `&${keys[i]}=${params[keys[i]]}`
    }
  }

  return str.length ? '?' + str.substr(1) : str
}

// 解析url参数拿到参数对象
export const parseUrl = (value) => {
  if (!value || value.indexOf('&') === -1) return {}

  const arr = value.split('&')

  const params = {}

  let i = 0

  while (i < arr.length) {
    if (arr[i].indexOf('=') !== -1) {
      const cur = arr[i].split('=')
      params[cur[0]] = cur[1]
    }
    i++
  }

  return params
}
