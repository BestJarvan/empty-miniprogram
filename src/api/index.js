/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-11 13:50:18
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-11 14:36:57
 * @Description: api
 */
import request from './request'

export const getHomeData = data => {
  return request.get('xxxxxx', data)
}