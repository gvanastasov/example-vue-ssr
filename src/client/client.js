import { createApp } from "./app.js";

const { app, router } = createApp({ isServer: false })

router.isReady().then(() => {
    app.mount('#app');
})