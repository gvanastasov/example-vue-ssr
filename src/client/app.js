import { createSSRApp } from "vue";
import App from './App.vue';

import { createSSRRouter } from './router'

export function createApp({ isServer }) {
    const router = createSSRRouter({ isServer });
    const app = createSSRApp(App).use(router);
    return { app, router }
}