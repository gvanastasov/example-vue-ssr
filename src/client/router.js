import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

import Home from './Home.vue';
import About from './About.vue';

export const createRouterSSR = function({ isServer }) {
    let history = isServer ? createMemoryHistory() : createWebHistory()
    
    const router = createRouter({
        history,
        routes: [
            {
                name: 'home',
                path: '/',
                component: Home
            },
            {
                name: 'about',
                path: '/about',
                component: About
            }
        ]
    })

    return router;
}