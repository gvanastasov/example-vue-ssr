<template>
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="text-align: center; max-width: 400px;">
            <h1>Vue SSR Application</h1>
            <p>a dummy application that renders on the server and rehydrates on the client. Try the reactivity with the buttons bellow, to increase and decrease the counter value. You can also inspect the source of the page, where you should see the SSR result. Further down the page, you can also try out routing, which is handled both on the server but as well on the client.</p>
            
            <section>
                <h2>Reactivity</h2>
                <p>Counter: {{ count }}</p>
                <button @click="count++">Increase</button>
                <button @click="count--">Decrease</button>
            </section>

            <section>
                <h2>Routing</h2>
                <div style="margin-bottom: 10px;">
                    <router-link :to="{ name: 'home' }" style="margin-right:10px">Home</router-link>
                    <router-link :to="{ name: 'about' }">About</router-link>
                </div>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            count: 1
        }
    },
}
</script>