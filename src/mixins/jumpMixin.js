/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-09 10:43:44
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-09 14:00:38
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
      const arr = url.split('/').slice(1)
      if (TAB_PAGE.includes(arr[1])) {
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
      if (!url) return
      if (params) {
        url += formatUrl(params)
      }
      wx.redirectTo({
        url
      })
    },
    _launch (url, params) {
      if (!url) return
      if (params) {
        url += formatUrl(params)
      }
      wx.reLaunch({
        url
      })
    },
    _back (delta = 1) {
      wx.navigateBack({
        delta
      })
    }
  }
})
