import { createSSRApp } from "vue";

export function createApp() {
    return createSSRApp({
        data() {
            return {
                count: 1
            }
        },
        template: `<div @click="count++">{{ count }}</div>`
    })
}