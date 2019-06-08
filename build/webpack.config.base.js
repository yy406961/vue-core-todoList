const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const creatvueLoaderOption = require('./vue-loader.config')

const config = {
    target: 'web',
    entry: path.join(__dirname, '../src/index.js'),
    mode: 'production',
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            // 写代码时eslint自动检查
            // {
            //     test: /\.(vue|js|jsx)$/,
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/,
            //     enforce: 'pre'
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: creatvueLoaderOption(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
                // 不能处理.vue文件里<style>的部分，还要添加vue-style-loader来处理 npm i vue-style-loader
            },
            // 在开发环境这么用，放到下面了
            // {
            //     test: /\.styl/, // vue 文件里使用stylus写css时，文件名后面别加$
            //     use: ['style-loader', 'css-loader', 'stylus-loader']
            // },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'resources/[path][name]-[hash:8].[ext]'
                    }
                }]
            }
        ]
    }
}

module.exports = config