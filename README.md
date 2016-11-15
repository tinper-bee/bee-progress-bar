# bee-progress-bar
[![npm version](https://img.shields.io/npm/v/bee-progress-bar.svg)](https://www.npmjs.com/package/bee-progress-bar)
[![Build Status](https://img.shields.io/travis/tinper-bee/generator-tinper-bee/master.svg)](https://travis-ci.org/tinper-bee/bee-progress-bar)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/bee-progress-bar.svg)](https://david-dm.org/tinper-bee/bee-progress-bar#info=devDependencies)


记录进度或动态的显示进度变化

## 使用

使用单独的bee-progress-bar包
#### 组件引入
先进行下载bee-progress-bar包
```
npm install --save bee-progress-bar
```
组件调用
```js
import ProgressBar from 'bee-progress-bar';
React.render(
<ProgressBar now={10} />, document.getElementById('target'));
```
#### 样式引入
- 可以使用link引入dist目录下bee-pagination.css
```
<link rel="stylesheet" href="./node_modules/build/bee-progress-bar.css">
```
- 可以在js中import样式
```js
import "./node_modules/src/ProgressBar.scss"
//或是
import "./node_modules/build/bee-progress-bar.css"
```




## API
|参数|说明|类型|默认值|
|---|----|---|------|
|min|最小值|number|0|
|max|最大值|number|100|
|now|显示值|number |''|
|srOnly|label 只读不显示|bool|false|
|striped|条纹样式|bool|false|
|active|激活状态|bool|false|
|colors|颜色oneOf:danger,info,warning,success|string|''|


#### 开发调试

```sh
$ git clone https://github.com/tinper-bee/bee-progress-bar
$ cd bee-progress-bar
$ npm install
$ npm run dev
```
