<template>
    <div @click="count++">{{ count }}</div>
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