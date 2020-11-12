/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-11 14:51:43
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-12 14:59:30
 * @Description: 本地存储 上限10mb
 */
class Storage {
  set (key, data, expire) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data: { data, ms: new Date().getTime(), expire },
        success: resolve,
        fail: reject
      })
    })
  }
  get (key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success ({ data }) {
          if (data.expire && new Date().getTime() - data.ms > data.expire) {
            this.remove(key)
            reject(new Error('fail: no data'))
            return
          }
          resolve(data)
        },
        fail: reject
      })
    })
  }
  remove (key) {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key,
        success: resolve,
        fail: reject
      })
    })
  }
  clear () {
    return new Promise((resolve, reject) => {
      wx.clearStorage({
        success: resolve,
        fail: reject
      })
    })
  }
}

export default new Storage()
