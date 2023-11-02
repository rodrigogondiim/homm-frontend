<template>
    <HeaderUser/>
    <router-view></router-view>
</template>

<script>
    import HeaderUser from '@/components/Dashboard/HeaderUser.vue';
    export default {
        components: {
            HeaderUser
        }
    }
</script>

<style>
</style>