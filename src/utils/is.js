/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-09 11:10:56
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-09 11:16:52
 * @Description: 工具类
 */

const toString = Object.prototype.toString

export const isPlainObject = (value) => {
  return toString.call(value) === '[object Object]'
}

export function isArray (value) {
  return typeof value !== 'undefined' && value instanceof Array
}

export function isObject (value) {
  return value !== null && typeof value === 'object'
}

export function isNum (value) {
  return typeof value === 'number'
}

export function isFunc (value) {
  return typeof value === 'function'
}

export function isUnd (value) {
  return typeof value === 'undefined'
}

export function isNull (value) {
  return value === null
}
