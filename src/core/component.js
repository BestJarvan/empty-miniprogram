/*
 * @Author: Yahui.Jiang
 * @Date: 2020-03-20 16:59:27
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-09 10:49:52
 * @Description:
 */
function createComponent (options) {
  const behaviors = []

  if (Array.isArray(options.mixins)) {
    options.mixins.forEach(mixin => {
      behaviors.push(mixin.createComponentMixin())
    })
  }

  // component使用原生behaviors
  options.behaviors = behaviors

  delete options.mixins

  Component(options)
}

export default createComponent
