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


### 4、const 定义元素(JSX)


```
    const element = <h1>Hello, world</h1>;
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
```


***App.js***
```
    import React, { Component } from 'react';
    
    // string const
    const hello = <h1>Hello, world</h1>;
    const user = {
        firstName: 'Harper',
        lastName: 'Perez'
    };
    
    //name function
    function formatName(user) {
        return user.firstName + ' ' + user.lastName;
    }
    
    class App extends Component {
      render() {
        return (
            <h1>
                Hello, {formatName(user)}
            </h1>
        );
      }
    }
    
    export default App;
```



### 5、更新元素


元素加载后不可更改，只能用新元素去替换

```
    function tick() {
      const element = (
        <div>
          <h1>Hello, world!</h1>
          <h2>
            It is{' '}
            {new Date().toLocaleTimeString()}.
          </h2>
        </div>
      );
      ReactDOM.render(
        element,
        document.getElementById('root')
      );
    }
    
    setInterval(tick, 1000);
```

