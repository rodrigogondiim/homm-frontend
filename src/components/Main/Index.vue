<template>
  <main>
    <h1>Faça seu cadastro e conecte com seus amigos</h1>
    <router-link to="register">Junte-se a nós</router-link>
  </main>
</template>

<script></script>

<style scoped>
main {
  width: 90%;
  margin: 2rem auto;
  color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

a {
  background: #9146ff;
  border-radius: 5px;
  font-size: 1.5em;
  width: 200px;
  height: 60px;
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  padding: 1.2rem 1.5rem;
  font-size: 1.4em;
  background: #332e2e;
}
</style>
