<template>
    <header>
        <img class="svg" src="@/assets/img/notification.svg" alt="">
        <div class="logins">
            <a class="log_twitch" href="">
                <img src="">
                <p>Welcome Log-in with Twitch</p> 
            </a>
            <router-link class="log-default" to="auth" v-if="isNotPageAuth">Log-in with Homm</router-link>
            <router-link class="log-default" to="/" v-else><i class="fa-solid fa-chevron-left"></i>Voltar</router-link>
            <a href="" class="logout">X</a>
        </div>
    </header>
</template>
<script>
    export default {
        name: 'Header',
        computed: {
            isNotPageAuth(){
                return this.$route.path != '/auth'
            }
        }
    }
</script>
<style scoped>
    header{
        width: 90%;
        height: 70px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .svg{
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .log_twitch{
        display: none;
    }
    .logout{
        display: none;
    }
    .log-default{
        font-size: .8em;
        color: #fff;
        padding:1rem ;
        text-decoration: none;
        background: #9146FF;
    }
</style>