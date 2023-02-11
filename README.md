# lot

更轻松地构建面向客户的 IoT 应用程序

![1-1](src/assets/2.png)

# 在线体验

[https://tsuyoii.github.io/x6_scada_HMI/](https://tsuyoii.github.io/x6_scada_HMI/)

# 查看历史

![1-2](src/assets/githistory.png)

# 下载使用

#### 注意 ⚠️：目前还在开发中，暂未能实现传入数据或自定义等功能，预计下一版本实现，敬请期待

```
npm install lot_scada
```

```
import XScadas from 'lot_scada/dist';
import 'lot_scada/dist/assets/css/main.css';

<XScadas />
```

# 发布

## 发布 npm

```
修改package.json中的
    "main": "./dist/index.js",
    "files": [
        "dist"
    ],
与"scripts"同级

```

修改版本号//version:0.0.8，修改 name 为 lot_scada（任意名字都行）
yarn build
npm publish

<!-- 注意发布时不要包含node_modules,否则会因为多个react版本而报错 -->

<!-- 发布npm包之前可以先调试一下 -->

#### 小技巧————调试 npm 包

```
yarn build
npm pack
将生成的压缩包解压生成 package,package 中的内容即为将要发布到 npm 上的包的内容
可以将 package 改名为 lot_scada
然后拷贝到父项目的 node_modules 中即可引用
```

## 发布 yalc

```
修改package.json中的
    "main": "./dist/index.js",
    "files": [
        "dist",
        "src"
    ],
    删除"main": "./dist/index.js",
    修改"version":    // "version": "0.0.7",
```

修改 name 为 x6_scada_yalc（其实改成什么名字都行，与父项目中对应即可）
yarn build
yalc push
父项目中如果报错 rootDir 有问题，需要把父项目中 tsconfig.json 的 rootDir 注释掉，另，yalc 调试时父项目中需要安装@antv/x6-react-shape ^1.6.1 版本

# 父项目中使用实例

```
/*
 yalc调试版 => 在项目中修改package.json中的name为x6_scada_yalc, 第一次yalc publish, 第n次yalc push, 父项目中第一次引入时需要用yalc add x6_scada_yalc(与上面publish的包名对应，上线之前记得remove包)
 *
 */

import * as React from 'react';
import XScadas from 'x6_scada_yalc/src/app'; //ok

export const ScadaView = () => {
  return (
    <XScadas />
  );
};

// dist版本，但是每次要子项目build之后修改才会生效，这里不用dist版本了
// import App from 'lot_scada_yalc/dist'; //ok
// import 'lot_scada_yalc/dist/assets/css/main.css';
//export const ScadaView = () => {
//  return (
//    <App />
//  );
//};

```

```
//npm 版
import * as React from 'react';
/* ok */
import XScadas from 'lot_scada/dist';
import 'lot_scada/dist/assets/css/main.css';

export const ScadaView = () => {
  return (
    <XScadas />
  );
};

```

```
// 试验过程，参考即可
// import { useState, useEffect } from 'react';
import * as React from 'react';
// import { XScada } from 'lot_scada/dist/index';
// import * as XScada from 'lot_scada';

// import XScada from 'lot_scada_yalc/src/lib/index';//报错

// import XScadas from 'lot_scada_yalc/src/app'; //ok
// import App from 'lot_scada_yalc/src/app'; //ok
// import App from 'lot_scada_yalc/dist'; //ok

/* ok */
import XScadas from 'lot_scada/dist';
import 'lot_scada/dist/assets/css/main.css';

export const ScadaView = () => {
  // const [scada, setScada] = React.useState(x6_scada.x6_scada.XScada);
  React.useEffect(() => {
    console.log('123', XScadas);
  }, []);
  return (
    // <x6_scada.XScada />
    <XScadas />
  );
};

```

# 更新

- v0.0.3

  - 右键菜单
    - 置顶
    - 置底
    - 上移一层
    - 下移一层
    - 组合
    - 取消组合
  - 取色器组件
  - 流动动效

- v0.0.6

  - 顶部菜单栏
    - 保存成 json 文件
    - 导入 json 文件
    - 撤销
    - 重做
    - 样式刷
    - 放大缩小
    - 自适应
    - 居中
    - 锁定
    - 预览

- v0.0.7

  - 新增图表节点 📈
  - 插件可传入 data 数据和保存数据的方法 onSave, 也可以不传

  ```
    <XScadas data={data} onSave={(jsonData)=>{console.log(jsonData)}}/>
  ```

- v0.0.8

  - 修复点击画布上某些节点(如图表节点时，进入设置项报错 bug)

- v0.0.9

  - 修复初始节点数据无法展示 bug(如图表节点 => 自定义节点保存 toJSON 有问题，目前已修复)

# 关于报错

1. 无法正常拖入节点或报错 findDOMNode is deprecated in StrictMode.

- 解答：将 index.tsx 中的这两行严格模式删掉
  (⚠️ 注：删除严格模式并非好的做法，但目前暂未找到更好的方法，下一版尽量更新)
  ![1-3](src/assets/error1.png)
- 参考：https://blog.csdn.net/qq_40314318/article/details/105209873

2. 报错 Invalid hook call

```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons: 1. You might have mismatching versions of React and the renderer (such as React DOM) 2. You might be breaking the Rules of Hooks 3. You might have more than one copy of React in the same app
```

- 解答：查看 lot_scada 包下是否有自己的 node_modules，有的话删除 node_modules 并重启项目即可
