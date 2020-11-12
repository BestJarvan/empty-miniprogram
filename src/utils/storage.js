/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-11 14:51:43
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-12 14:50:40
 * @Description: 本地存储 上限10mb
 */

export const set = (key, data, expire) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data: { data, ms: new Date().getTime(), expire },
      success: resolve,
      fail: reject
    })
  })
}

export const get = (key) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success ({ data }) {
        if (data.expire && new Date().getTime() - data.ms > data.expire) {
          remove(key)
          reject(new Error('fail: no data'))
          return
        }
        resolve(data)
      },
      fail: reject
    })
  })
}

export const remove = (key) => {
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key,
      success: resolve,
      fail: reject
    })
  })
}

export const clear = () => {
  return new Promise((resolve, reject) => {
    wx.clearStorage({
      success: resolve,
      fail: reject
    })
  })
}
