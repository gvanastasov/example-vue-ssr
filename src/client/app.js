import { createSSRApp } from "vue";
import App from './App.vue';

import { createRouterSSR } from './router'

export function createApp({ isServer }) {
    const router = createRouterSSR({ isServer });
    const app = createSSRApp(App).use(router);
    return { app, router }
}