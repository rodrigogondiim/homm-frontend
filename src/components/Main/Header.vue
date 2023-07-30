<template>
    <header>
        <img class="svg" src="@/assets/img/notification.svg" alt="">
        <div class="logins">
            <a class="log_twitch" href="">
                <img src="">
                <p>Welcome Log-in with Twitch</p> 
            </a>
            <router-link class="log-default" to="auth">Log-in with Homm</router-link>
            <a href="" class="logout">X</a>
        </div>
    </header>
</template>
<script>
    export default {
        name: 'Header'
    }
</script>
<style scoped>
    header{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-around;
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
        background: #9146FF;
    }
</style>