const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {

    app.use(createProxyMiddleware('/dst', {
        target: "https://dst.liuyh.com/",
        changeOrigin: true,
        pathRewrite: {
            '^/dst': ''
        },
    }))
    app.use(createProxyMiddleware('/api', {
        // target: "http://1.12.223.51:8888/",
        target: "http://localhost:8888",
        changeOrigin: true,
        // pathRewrite: {
        //     '^/dst': ''
        // },
    }))
    app.use(createProxyMiddleware('/version', {
        target: "http://ver.tugos.cn",
        changeOrigin: true,
        pathRewrite: {
            '^/version': ''
        },
    }))
}