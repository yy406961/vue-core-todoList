import Router from 'vue-router'

import routes from './routes'

export default () => {
    return new Router({
        routes,
        linkActiveClass: 'active',
        scrollBehavior (to, from, savedPosition) {
            // 页面进行路由跳转时，页面是否滚动
            // to 去到的路由
            // from 从哪去的路由
            // savedPosition 如果到过这个路由，自动保存之前滚动到的位置
            if (savedPosition) {
            return savedPosition
            } else {
            return { x: 0, y: 0 }
            }
        }
        // mode: 'history' // 去掉8000后面的 # 有问题，不知道咋整
    })
}
