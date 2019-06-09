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
    new VueLoaderPlugin(),
    new HtmlPlugin({
        template: path.join(__dirname, 'template.html')
    })
]

const devServer = {
    port: 8080,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    open: true, // 运行npm run dev 自动打开浏览器
    hot: true  // 改组件代码，页面只重新渲染组件，不加载整个页面
}

let config

// 开发环境
config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    devtool: '#cheap-module-eval-source-map',
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
