<template>
  <Header/>
  <router-view></router-view>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
*{margin:0;padding:0;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
body{
  background: #101010;
}
</style>
