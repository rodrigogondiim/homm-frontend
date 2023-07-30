import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '',
        component: () => import('@/views/Main/index.vue'),
        children: []
    }]
});

export default router
