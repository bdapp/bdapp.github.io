# React JS
---

### 1、初始化项目

```
    #安装react自动配置工具
    npm install -g create-react-app
    
    #创建my-app项目
    create-react-app my-app
    
    cd my-app
    #启动项目
    npm start 或 yarn start
    
    #编译项目
    npm run build 或yarn build
    
    #运行编译后的项目
    serve -s build

    #在已存在的项目中加入react环境
    npm init
    npm install --save react react-dom
    或
    yarn init
    yarn add react react-dom

```

---

### 2、react 问题汇总

[https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases)


---

### 3、Hello World

***显示页面：index.html***
```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <title>React App</title>
      </head>
      <body>

        <div id="root"></div>
    
      </body>
    </html>
```
***js入口：index.js***
```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import registerServiceWorker from './registerServiceWorker';
    
    ReactDOM.render(
        <h1>Hello World</h1>, 
        document.getElementById('root')
    );

    registerServiceWorker();

```





