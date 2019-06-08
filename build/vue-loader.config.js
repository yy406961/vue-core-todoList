// const docsLoader = require('./doc-loader')

module.exports = (isDev) => {
    return {
        preserveWhitepace: true,
        extractCSS: !isDev,
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true
        }
        // loaders: {
        //     'docs': docsLoader
        // }
        // hotReload: false // 根据环境变量生成
    }
}