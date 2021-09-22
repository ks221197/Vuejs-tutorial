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
            component: () => import("../pages/post/index.vue"),
        },
        {
            path: '/post/create',
            name: 'create',
            component: () => import("../pages/post/create.vue"),
        },
        {
            path: '/post22/:id',
            name: 'detail2',
            component: () => import("../pages/post/dV1.vue"),
        },
        {
            path: '/post/:id',
            name: 'detail',
            component: () => import("../pages/post/detail.vue"),
        }
    ],
})