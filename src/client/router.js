import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue';
import About from './pages/About.vue';

export const createSSRRouter = function({ isServer }) {
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