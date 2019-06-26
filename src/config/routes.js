// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        // path: '/app/:id',
        path: '/app',
        // components: {
        //     default: Todo,
        //     a: Login
        // },
        // props: true,
        // props: {
        //     id: '123'
        // },
        // props: (route) => ({ id: route.query.b }),
        component: () => import('../views/todo/todo.vue'),
        name: 'app',
        meta: {
            title: 'this is app',
            description: 'aaabbb'
        }
        // children: [
        // // 嵌套路由
        // // 要在父组件 Todo 内加上 router-vie 标签，children才会显示
        // // 路径为 /app/test
        //     {
        //         path: 'test',
        //         component: Login
        //     }
        // ]
    },
    {
        path: '/login',
        component: () => import('../views/login/login.vue')
    }
]
