<template>
    <div>this is login page
        <p @click="aa">path: {{ path }}</p>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            path: ''
        }
    },
    mounted () {
    },
    watch: {
        $route(val) {
            console.log(val)
            this.path = val.path
        }
    },
    methods: {
        aa () {
            console.log(this.$router.options.routes)
        }
    }
}
</script>

<style>

</style>

