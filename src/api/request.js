/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-11 13:48:51
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-12 15:02:55
 * @Description: wx.request模块
 */
import { BASE_URL, SUCCESS, EXPIRE_LOGIN, version } from '../config/index'
import login from '../utils/login'

const app = getApp()

class Request {
  get (url, data) {
    return this.request({ url, method: 'GET', data })
  }

  post (url, data) {
    return this.request({ url, method: 'POST', data })
  }
  // put delete等请求 如有需要再添加

  // 处理头部 参数
  getHeaders (upload) {
    const headers = {
      version
    }

    if (app.globalData.user && app.globalData.user.token) {
      headers['token'] = app.globalData.user.token
    }

    if (upload) {
      headers['Conetent-Type'] = 'multipart/form-data'
    }
    return headers
  }

  request (options) {
    options.header = this.getHeaders(options.upload)

    return this.interceptRequest(options)
  }

  // 请求拦截器
  interceptRequest (options) {
    if (options.upload) {
      return this.uploadRequest(options)
    }
    return new Promise((resolve, reject) => {
      wx.request({
        // url: 'https://api.apiopen.top/getWangYiNews', // 网易新闻测试连接
        url: BASE_URL + options.url,
        header: options.header,
        method: options.method,
        data: options.data || {},
        timeout: 6000,
        success ({ data = {} }) {
          if (data.code === SUCCESS) {
            resolve(data)
          } else if (data.code === EXPIRE_LOGIN) {
            login(() => {
              wx.showToast({
                title: 'login success, Please try again',
                icon: 'none'
              })
            })
          } else {
            reject(data)
          }
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }

  // 上传文件
  uploadRequest (options) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: options.url,
        filePath: options.path,
        header: options.header,
        name: 'file',
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}

export default new Request()
