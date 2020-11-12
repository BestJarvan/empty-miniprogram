/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-12 15:09:13
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-12 15:16:53
 * @Description: toast封装
 */
export const successToast = (text) => {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export const toast = (text) => {
  wx.showToast({
    title: text,
    icon: 'none'
  })
}

export const loading = (text) => {
  wx.showToast({
    title: text,
    icon: 'loading',
    mask: true,
    duration: 100000
  })
}

export const hide = () => {
  wx.hideToast()
}
