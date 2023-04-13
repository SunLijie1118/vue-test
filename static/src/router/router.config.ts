import type { RouteRecordRaw } from 'vue-router';

export const firstRoutes: Array<RouteRecordRaw> = [
    {
        meta:{
            id: 1
        },
        name:'首页',
        path:'/dashboard',
        component:() => import('@/views/dashboard/dashboard.vue')
    },
    {
        meta:{
            id: 2
        },
        name:'沸点',
        path:'/pins',
        component:()=>import('@/views/pins.vue')
    },
    {
        meta:{
            id: 3
        },
        name:'课程',
        path:'/course',
        component:()=>import('@/views/course.vue')
    },
    {
        meta:{
            id: 4
        },
        name:'直播',
        path:'/live',
        component:()=>import('@/views/live.vue')
    },
    {
        meta:{
            id: 5
        },
        name:'活动',
        path:'/events',
        component:()=>import('@/views/events.vue')
    },
    {
        meta:{
            id: 6
        },
        name:'竞赛',
        path:'/challenge',
        component:()=>import('@/views/challenge.vue')
    },
    {
        meta:{
            id: 7
        },
        name:'商城',
        path:'/goods',
        component:()=>import('@/views/goods.vue')
    },
    {
        meta:{
            id: 8
        },
        name:'APP',
        path:'/app',
        component:()=>import('@/views/appSource.vue')
    },
    {
        meta:{
            id: 9
        },
        name:'插件',
        path:'/extension',
        component:()=>import('@/views/extension.vue')
    }
];