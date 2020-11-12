/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-12 15:00:46
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-12 15:17:55
 * @Description: 统一登录方法
 */
import { apiUserLogin } from '../api/index'
import { toast } from '../utils/toast'
const app = getApp()

export const confirmLogin = (cb) => {
  if (typeof cb !== 'function') {
    throw new Error('callback must be function')
  }
  if (app.globalData.user && app.globalData.user.token && app.globalData.user.openid) {
    cb(app.globalData.user)
  } else {
    wx.login({
      success ({ code }) {
        apiUserLogin({ code }).then(({ data }) => {
          app.globalData.user = data
          console.log('用户的openid=====', data.openid)
          cb(data)
        }).catch(err => {
          toast(err)
        })
      },
      fail (err) {
        console.log(err)
      }
    })
  }
}
