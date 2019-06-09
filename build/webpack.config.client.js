const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
// vue-loader 在新版里面做了改变，要在wepack 的配置plugins 里面加上VueLoaderPlugin
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === "development"

const defaultPluins = [
    new webpack.DefinePlugin({
        'procss.env': {
            NODE_ENV: isDev ? '"devolopment"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HtmlPlugin()
]

const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    
    // historyApiFallback: {
    //     index: '/ndex.html'
    // },
    open: true, // 运行npm run dev 自动打开浏览器
    hot: true  // 改组件代码，页面只重新渲染组件，不加载整个页面
}

let config

if (isDev) {
    // 开发环境
    config = merge(baseConfig, {
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
        plugins: defaultPluins.concat([
            new webpack.HotModuleReplacementPlugin() // hot: true 需要的插件
            // new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    // 正式环境 生产环境
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/, // vue 文件里使用stylus写css时，文件名后面别加$
                    use: ExtractPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'stylus-loader']
                    })
                }
            ]
        },
        plugins: defaultPluins.concat([
            new ExtractPlugin('styles.[hash:8].css')
        ]),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: "vendor",
                        chunks: "initial",
                        minChunks: 2
                    }
                }
            },
            runtimeChunk: true
        }
    })
}

module.exports = config
