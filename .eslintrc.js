/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-09 09:58:32
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-09 09:58:36
 * @Description: 
 */

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard'
  ],
  plugins: [
    'prettier'
  ],
  globals: {
    Component: true,
    getCurrentPage: true,
    wx: true,
    getCurrentPages: true,
    Page: true,
    getApp: true,
    App: true,
    Behavior: true
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
