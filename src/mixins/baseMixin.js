/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-09 10:43:44
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-09 11:05:36
 * @Description:
 */
import { createMixin } from '../core/index'
import { formatUrl } from '../utils/format'
import { TAB_PAGE } from '../config/index'

export const jumpMixin = createMixin({
  methods: {
    // 普通跳转
    _push (url, params) {
      if (!url) return
      let arr = url.split('/').slice(1)
      if (TAB_PAGE.indexOf(arr[1]) === -1) {
        if (params) {
          url += formatUrl(params)
        }
        wx.navigateTo({
          url
        })
      } else {
        wx.switchTab({
          url
        })
      }
    },
    _redirect (url, params) {
    },
    _back (delta = 1) {
      wx.navigateBack({
        delta
      })
    }
  }
})
