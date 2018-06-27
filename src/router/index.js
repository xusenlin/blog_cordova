import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['~/views/layout/App.vue'], resolve),
            meta: {
                title: '首页',
                keepAlive: true
            },
            children: [
                {
                    path: '/',
                    name: 'home',
                    meta: {
                        title: '文章',
                        keepAlive: true
                    },
                    component: resolve => require(['~/views/home/Article.vue'], resolve),
                },
                {
                    path: '/notes',
                    name: 'notes',
                    meta: {
                        title: '笔记',
                        keepAlive: true
                    },
                    component: resolve => require(['~/views/collection/Notes.vue'], resolve),
                },
                {
                    path: '/me',
                    name: 'me',
                    meta: {
                        title: '我的',
                        keepAlive: true
                    },
                    component: resolve => require(['~/views/me/Index.vue'], resolve),
                },
            ]
        },
        {
            path: '/note-edit',
            name: 'note-edit',
            meta: {
                title: '笔记编辑',
                keepAlive: false
            },
            components: {
                blank: resolve => require(['~/views/collection/Edit.vue'], resolve),
            }
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: '后台登录',
                keepAlive: false
            },
            components: {
                blank: resolve => require(['~/views/login/Login.vue'], resolve),
            }
        },

    ]
})


