import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/styles/global.styl'
import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'

import createRouter from './config/router'
import createStore from './stores/store'

const root = document.createElement('div')
document.body.appendChild(root)

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 动态注册模块
store.registerModule('c', {
    state: {
      text: 3
    }
  })
// 解绑模块
store.unregisterModule('c')

// 相当于getters里的方法
// store.watch((state) => state.count + 1, (newCount) => {
//     console.log('new count watched:', newCount)
// })

// mutation被调用，记录监测之类用，多用于vuex插件
// store.subscribe((mutation, state) => {
//     console.log(mutation.type)
//     console.log(mutation.payload) // 参数
// })

// action被调用，记录监测之类用，多用于vuex插件
// store.subscribeAction((action, state) => {
//     console.log(action.type)
//     console.log(action.payload)
// })
  

// index.js 路由跳转前触发,执行完之后才会跳转
// router.beforeEach((to, from, next) => {
//     // 可做些验证，比如没登陆信息就不允许访问其他页面
//     // 直接跳回登陆页面
//     // next('/login')
//     next()
// })

// 跟beforeEach差不多用法
// router.beforeResolve((to, from, next) => {
//     next()
// })

// 路由跳转之后才触发
// router.beforeResolve((to, from) => {
// })

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount(root)
