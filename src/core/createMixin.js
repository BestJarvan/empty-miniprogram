/*
 * @Author: Yahui.Jiang
 * @Date: 2020-03-20 16:59:27
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-03 19:19:37
 * @Description:
 */
import { deepMerge, extend } from './utils'

export function createMixin (options) {
  const mixin = {
    component: null,
    page: null
  }
  const mixins = options.mixins || []

  mixins.forEach(mixin => {
    extend(options, mixin.createPageMixin())
  })

  function createComponentMixin () {
    if (mixin.component) return mixin.component
    mixin.component = Behavior(options)
    return mixin.component
  }

  function createPageMixin () {
    if (mixin.page) return mixin.page
    const result = deepMerge(options)
    if (result.methods) {
      Object.keys(result.methods).forEach(method => {
        result[method] = result.methods[method]
      })
    }
    delete result.methods
    mixin.page = result
    return mixin.page
  }
  return {
    createComponentMixin,
    createPageMixin
  }
}
