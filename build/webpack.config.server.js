const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const merge = require('webpack-merge')
// vue-loader 在新版里面做了改变，要在wepack 的配置plugins 里面加上VueLoaderPlugin
const baseConfig = require('./webpack.config.base')

const defaultPluins = [
    new webpack.DefinePlugin({
        'procss.env': {
            NODE_ENV: '"devolopment"'
        }
    }),
    new VueLoaderPlugin()
    // server 不需要
    // new HtmlPlugin({
    //     template: path.join(__dirname, 'template.html')
    // })
]

// server 不需要
// const devServer = {
//     port: 8080,
//     host: '0.0.0.0',
//     overlay: {
//         errors: true
//     },
//     open: true, // 运行npm run dev 自动打开浏览器
//     hot: true  // 改组件代码，页面只重新渲染组件，不加载整个页面
// }

let config

// 开发环境
config = merge(baseConfig, {
    // 因为打包的环境是node里
    target: 'node',
    // server 需要一个单独的入口文件
    entry: path.join(__dirname, '../src/server-entry.js'),
    // 使用 source-map有个webpack的插件，可调试错误
    devtool: 'source-map',
    // 服务端运行的
    output: {
        // 指定打包代码的模块方式
        libraryTarget: 'commonjs2',
        // 打包后的文件
        filename: 'server-entry.js',
        // 输出目录
        path: path.join(__dirname, '../server-build')
    },
    // 打包时会把依赖打到同一个js文件里，这个node里不去打包dependencies里的依赖
    externals: Object.keys(require('../package.json').dependencies),
    module: {
        rules: [
            {
                test: /\.styl/, // vue 文件里使用stylus写css时，文件名后面别加$
                use: ['style-loader', 'css-loader', 'stylus-loader']
            }
        ]
    },
    devServer,
    // import Vue from 'vue'
    resolve: {
        alias: {
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: defaultPluins.concat([
        new webpack.HotModuleReplacementPlugin() // hot: true 需要的插件
        // new webpack.NoEmitOnErrorsPlugin()
    ])
})

module.exports = config
