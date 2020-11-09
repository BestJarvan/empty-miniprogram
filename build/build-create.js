/*
 * @Author: Yahui.Jiang
 * @Date: 2020-11-03 19:25:50
 * @LastEditors: Yahui.Jiang
 * @LastEditTime: 2020-11-04 11:00:49
 * @Description:
 */
const gulp = require('gulp')
const path = require('path')
const tap = require('gulp-tap')
const fs = require('fs')
const preprocess = require('gulp-preprocess')

exports.default = gulp.series(done => {
  const argv = process.argv
  const name = argv.find(item => item.indexOf('-n=') !== -1).split('=')[1]
  const isPage = argv.find(item => item.indexOf('-t=') !== -1).split('=')[1] === 'page'
  const packageName = (argv.find(item => item.indexOf('-p=') !== -1) || '-p=').split('=')[1]
  const str = path.resolve(__dirname, `../template/${isPage ? 'page' : 'component'}/**`)
  const stream = gulp.src(str)
  const resultPath = path.resolve(__dirname, `../src/${isPage ? packageName ? `${packageName}/pages` : 'pages' : 'components'}/${name}/`)

  if (fs.existsSync(`${resultPath}/index.wxml`)) {
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>> \n当前路径已存在名为${name}的${isPage ? '页面' : '组件'} \n>>>>>>>>>>>>>>>>>>>>>>>>>>`)

    done()
  } else {
    if (isPage) {
      const jsonPath = path.resolve(__dirname, '../src/app.json')
      gulp
        .src(jsonPath)
        .pipe(tap(file => {
          let content = JSON.parse(String(file.contents))
          content.pages.push(`pages/${name}/index`)
          file.contents = Buffer.from(JSON.stringify(content, undefined, '\t'))
        }))
        .pipe(gulp.dest(path.resolve(__dirname, '../src/')))
    }

    stream
      .pipe(preprocess({
        context: {
          CREATE_NAME: name
        }
      }))
      .pipe(gulp.dest(resultPath))

    done()
  }
})
