import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            component: () => import('@/views/Main/index.vue'),
            children: [
                { path: '', component: () => import('@/components/Main/Index.vue') },
                { path: 'auth', component: () => import('@/components/Main/Authenticator.vue') }
            ]
        },
        
    ]
});

export default router
