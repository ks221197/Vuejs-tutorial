import Vue from "vue";
import Router from "vue-router";
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import("../pages/login.vue")
        },
        {
            path: '/post',
            name: 'post',
            component: () => import("../pages/post/index.vue")
        },
    ],
})