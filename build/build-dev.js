/*
 * @Author: Yahui.Jiang
 * @Date: 2020-03-03 19:25:50
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-09 11:25:32
 * @Description:
 */
const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const eslint = require('gulp-eslint')
const del = require('del')
const babel = require('gulp-babel')
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const preprocess = require('gulp-preprocess')
const cssFile = '../src/**/*.scss'
const jsFile = '../src/**/*.js'
const jsonFile = '../src/**/*.json'
const imageFile = ['../src/images*/**', '../src/**/images/**']
const wxmlFile = '../src/**/*.wxml'
const packageJson = '../package.json'
const configJson = '../mini-package.json'
const config = require('../package.json')
const version = parseFloat(config.version.split('.').join(''))

function task_clean (done) {
  del.sync(['dist/**/*'])
  done()
}

function task_css () {
  return gulp
    .src(cssFile, { since: gulp.lastRun(task_css), allowEmpty: true })
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(
      rename(path => {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest('../dist/'))
}

function task_js () {
  return gulp
    .src(jsFile, { since: gulp.lastRun(task_js), allowEmpty: true })
    .pipe(eslint())
    .pipe(preprocess({
      context: {
        // 此处可接受来自调用命令的 NODE_ENV 参数
        NODE_ENV: process.env.NODE_ENV || 'ONLINE',
        NODE_VERSION: version
      }
    }))
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulp.dest('../dist/'))
}

function task_json () {
  return gulp.src(jsonFile, { since: gulp.lastRun(task_json), allowEmpty: true }).pipe(gulp.dest('../dist/'))
}

function task_wxml () {
  return gulp.src(wxmlFile, { since: gulp.lastRun(task_wxml), allowEmpty: true }).pipe(gulp.dest('../dist/'))
}

function task_image () {
  return gulp.src(imageFile, { since: gulp.lastRun(task_image), allowEmpty: true }).pipe(gulp.dest('../dist/'))
}

// 解决 npm 依赖的问题
function task_npm (done) {
  const dependencies = Object.keys(config.dependencies)

  const npmPath = path.resolve(__dirname, '../dist/miniprogram_npm')

  if (fs.existsSync(npmPath)) {
    shell.rm('-rf', npmPath)
  }
  const xbbConfig = JSON.parse(fs.readFileSync('../mini-package.json'))

  shell.mkdir('-p', npmPath)

  dependencies.forEach(name => {
    const dependependPath = path.resolve(__dirname, '../node_modules/' + name)

    let packageName = name
    if (name.indexOf('@') === 0) {
      const [orgName, libraryName] = name.split('/')
      packageName = libraryName

      const packagePath = path.resolve(__dirname, '../dist/miniprogram_npm/' + orgName)

      if (!fs.existsSync(packagePath)) {
        shell.mkdir('-p', packagePath)
      }
    }

    try {
      const dist = require(dependependPath + '/package.json').miniprogram

      const filePath = path.resolve(dependependPath + '/' + dist)

      const destPath = path.resolve(__dirname, '../dist/miniprogram_npm/' + name)

      if (xbbConfig.package && Array.isArray(xbbConfig.package)) {
        const packages = xbbConfig.package.find(item => item.name === packageName)
        if (packages) {
          const components = Array.from(new Set(packages.components))

          shell.mkdir('-p', destPath)

          components.forEach(component => {
            shell.cp('-Rf', filePath + '/' + component, destPath)
          })
        } else {
          shell.cp('-Rf', filePath, destPath)
        }
      } else {
        shell.cp('-Rf', filePath, destPath)
      }
    } catch (error) {
      throw error
    }
  })
  done()
}

function task_package_json () {
  return gulp.src(packageJson).pipe(gulp.dest('../dist/'))
}

function task_watch () {
  gulp.watch(cssFile, task_css)
  gulp.watch(jsFile, task_js)
  gulp.watch(jsonFile, task_json)
  gulp.watch(imageFile, task_image)
  gulp.watch(wxmlFile, task_wxml)
  gulp.watch(configJson, task_npm)
}

exports.default = gulp.series(
  task_clean,
  gulp.parallel(
    task_package_json,
    task_npm,
    task_css,
    task_js,
    task_json,
    task_wxml,
    task_image,
    task_watch
  )
)
