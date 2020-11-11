/*
 * @Author: Yahui.Jiang
 * @Date: 2020-01-15 14:31:20
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-11 14:35:57
 * @Description:
 */
import { createPage } from '../../core/index'
import { getHomeData } from '../../api/index'
import jumpMixin from '../../mixins/jumpMixin'

createPage({
  mixins: [jumpMixin],
  data: {},
  onLoad () {},
  onShow () {},
  clickIndex () {
    getHomeData().then(res => {
      console.log(res)
    })
    // this._push('/pages/store/index', { id: 1 })
  },
  onHide () {},
  onUnload () {}
})
