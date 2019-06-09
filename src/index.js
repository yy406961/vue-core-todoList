import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/styles/global.styl'
import './assets/styles/test.css'
import './assets/images/loginBg.png'
import './assets/styles/test-stylus.styl'

import createRouter from './config/router'

const root = document.createElement('div')
document.body.appendChild(root)

Vue.use(VueRouter)

const router = createRouter()

new Vue({
    router,
    render: (h) => h(App)
}).$mount(root)
