import Vue from 'vue'
import VueMaterial  from 'vue-material'
import VueRouter from 'vue-router'
import routes from './routes'
import 'material-design-icons/iconfont/material-icons.css'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial);
Vue.use(VueRouter)


const router = new VueRouter({
    routes,
    mode:'history'
})

new Vue({
    el:'#app',
    template:'<router-view></router-view>',
    router
});