import Vue from "vue";
import Router from "vue-router";
import Add from "../pages/add.vue"
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import("../components/HelloWorld")
        },
        {
            path: '/add',
            name: 'Add user',
            component: Add
        },
        {
            path: '/edit',
            name: 'Edit user',
            component: () => import("../pages/edit.vue")
        },
    ],
})