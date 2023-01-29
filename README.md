# dst-admin-web


## 技术栈
react + ant-design

## 运行
```
npm install
npm start
```
浏览器输入 http://localhost:3000/

## 打包
```
npm run build
```

## 修改本地代理
修改 src/setupProxy.js 文件
```js
app.use(createProxyMiddleware('/api', {
    target: "http://localhost:8888",
    changeOrigin: true,
}))
```