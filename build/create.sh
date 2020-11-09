###
 # @Author: Yahui.Jiang
 # @Date: 2020-11-03 19:23:52
 # @LastEditors: Yahui.Jiang
 # @LastEditTime: 2020-11-03 19:23:57
 # @Description: 
### 
#!/usr/bin/env sh
set -e
echo "开始生成代码, 请输入名称？"
read NAME
read -p "请问代码 $NAME - 是否是组件 ? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "开始生成组件 $NAME ..."
  gulp --gulpfile ./build/build-create.js -n=$NAME -t=component
else
  echo "开始生成代码, 请输入分包名称？为主包则直接回车"
  read PACKAGE_NAME
  echo "开始生成页面 $NAME ..."
  gulp --gulpfile ./build/build-create.js -n=$NAME -t=page -p=$PACKAGE_NAME
fi
