/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-11 13:50:18
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-12 15:05:38
 * @Description: api
 */
import request from './request'

// 首页接口
export const getHomeData = data => {
  return request.get('xxxxxx', data)
}

// 登录接口
export const apiUserLogin = data => {
  return request.post('xxxxxx', data)
}
