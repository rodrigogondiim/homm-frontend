<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap");

* {
  margin: 0;
  padding: 0;
}

*::-webkit-scrollbar {
  width: 6px;
}

#app {
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

html {
  -webkit-tap-highlight-color: transparent;
}

body {
  background: #101010;
  height: 100vh;
}
</style>
