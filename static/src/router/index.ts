import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import {firstRoutes} from './router.config';

const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        redirect:'dashboard'
    },
    ...firstRoutes,
    {
        meta:{
            id: 404
        },
        path:'/404',
        name:'not-found',
        component:()=>import('@/components/notFound.vue')
    },
    {
        path:'/:pathMatch(.*)*',
        redirect: {
            name:'not-found'
        },
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});

export default router;
