<template>
    <div id="app">
        <div id="cover"></div>
        <!-- <Header></Header> -->
        <!-- <p>{{ counter }} {{ fullName }}</p>
        <p>{{ textA }}</p> -->
        <router-link to="/app">app</router-link> |
        <router-link to="/login">login</router-link> |
        <span @click="clicka">点击a</span> |
        <span @click="click">点击a/b</span>

        <router-view></router-view>
        <!-- <transition name="fade">
            <router-view />
        </transition> -->
        <!-- <router-view name="a"/> -->
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import Todo from './views/todo/todo.vue'
import { setInterval } from 'timers'
import { 
    mapState, 
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            text: 'abcaaaa'
        }
    },
    mounted () {
        // console.log(this.$router.options.routes)
        let i = 1
        // dispatch专用来触发actions的
        // this.$store.dispatch('updateCountAsync', {
        //     num: 5,
        //     time: 2000
        // })
        this.updateCountAsync({
            num: 5,
            time: 2000
        })
        this['a/updateText']('123')
        // setInterval(() => {
        //     this.$store.commit('updateCount', i++)
        // }, 1000)
    },
    computed: {
        ...mapState({
            counter: (state) => state.count,
            textA: (state) => state.a.text
        }),
        ...mapGetters({ fullName: 'fullName'})
        // count () {
        //     return this.$store.state.count
        // },
        // fullName () {
        //     return this.$store.getters.fullName
        // }
    },
    methods: {
        ...mapMutations(['updateCount', 'a/updateText']),
        ...mapActions(['updateCountAsync']),
        clicka() {
            let path = '/aaa/a'
            this.$router.addRoutes([
                {
                    path: path,
                    name: 'aaa',
                    component: () => import('./views/login/login.vue')
                }
            ])
            this.$router.push({
                path:  path
            })
            console.log(this.$router.options.routes)
        },
        click() {
            let path = '/aaa/a/b'
            this.$router.addRoutes([
                {
                    path: path,
                    name: 'aaa',
                    component: () => import('./views/login/login.vue')
                }
            ])
            this.$router.push({
                path:  path
            })
            console.log(this.$router.options.routes)
        }
    },
    components: {
        Header,
        Footer,
        Todo
    }
}
</script>

<style lang="stylus" scoped>
#app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover {
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    // background-color rgba(255,255,255,.1)
    // opacity .9
    z-index -1
}
#loading {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(255,255,255,.3)
    z-index 99
    display flex
    align-items center
    justify-content center
}
</style>
