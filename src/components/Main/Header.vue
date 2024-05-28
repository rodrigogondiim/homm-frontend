<template>
  <header>
    <div class="logins">
      <router-link class="log-default" to="auth" v-if="isNotPageAuth">
        Fazer Login
      </router-link>
      <router-link class="log-default" to="/" v-else>
        <i class="fa-solid fa-chevron-left"></i>Voltar
      </router-link>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  computed: {
    isNotPageAuth() {
      return this.$route.path != "/auth";
    },
  },
};
</script>
<style scoped>
header {
  max-width: 1000px;
  width: 90%;
  height: 70px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logins {
  display: flex;
}

.log-default {
  font-size: 0.8em;
  color: #fff;
  padding: 1rem;
  text-decoration: none;
  background: #9146ff;
  border-radius: 3px;
}

.log-default i {
  font-weight: bold;
  margin-right: 7px;
}
</style>
