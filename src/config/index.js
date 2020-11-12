/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-09 10:46:01
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-12 15:00:27
 * @Description:
 */
const BASE_REQUEST_URL = {
  /* eslint-disable */

	// @if NODE_ENV = 'TEST'
	requestUrl: 'https://test1.com',
	// @endif

  // @if NODE_ENV = 'ONLINE'
	requestUrl: 'https://online1.com',
	// @endif
}

const BASE_IP = '/* @echo NODE_IP */'
export const BASE_URL = BASE_IP ? BASE_IP : BASE_REQUEST_URL.requestUrl

// 后端code码
export const SUCCESS = 200
export const EXPIRE_LOGIN = 300

// 版本号
export const version = '/* @echo NODE_VERSION */'

// tab列表
export const TAB_PAGE = [
  'index'
]
