module.exports = {
    '/api': {
        target: 'http://39.105.144.217:8089',	//测试
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
}