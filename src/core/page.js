/*
 * @Author: Yahui.Jiang
 * @Date: 2020-03-28 15:28:12
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-03 19:18:50
 * @Description:
 */
import { extend } from './utils'

function createPage (options) {
  const mixins = options.mixins || []

  mixins.forEach(mixin => {
    extend(options, mixin.createPageMixin())
  })

  delete options.mixins

  Page(options)
}

export default createPage
