<template>
  <main>
    <h1>Homm</h1>
    <section id="content">
      <form action="">
        <input type="email" placeholder="Digite o seu email" v-model="email" />
        <input
          type="password"
          placeholder="Digite sua senha"
          v-model="password"
        />
        <input
          type="submit"
          :disabled="isDisabled"
          @click.prevent="sendAuth"
          value="Entrar"
        />
      </form>
    </section>
  </main>
</template>

<script>
import http from "@/services/axios";
import { useToast, POSITION } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      email: "",
      password: "",
      isDisabled: false,
    };
  },
  methods: {
    validate() {
      if (!this.email || !this.password) {
        this.toast.clear();
        this.toast.info("Informe os dados para acesso!", {
          position: POSITION.BOTTOM_CENTER,
          icon: true,
        });

        return false;
      }

      this.isDisabled = true;
      this.toast.info("Aguarde...", {
        position: POSITION.BOTTOM_CENTER,
        icon: true,
      });
      this.toast.clear();

      return true;
    },
    async sendAuth() {
      if (!this.validate()) return false;

      try {
        const { data } = await http().post(`/api/auth`, {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("-tknA", data.access_token);
        this.toast.success("Login concedido com sucesso!", {
          position: POSITION.BOTTOM_CENTER,
          icon: true,
          timeout: 1700,
        });
        this.$router.push({ name: "dash" });
      } catch (error) {
        this.toast.error("Email e/ou senha incorretos!", {
          position: POSITION.BOTTOM_CENTER,
          icon: true,
        });
      }

      this.isDisabled = false;
    },
  },
};
</script>

<style scoped>
main {
  width: 90%;
  margin: 2rem auto;
  color: #f2f2f2;
}

#content {
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: center;
}

input[type="email"],
input[type="password"] {
  padding: 0.8rem;
  margin-bottom: 0.8rem;
}

input[type="submit"] {
  width: 80px;
  height: 35px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}
</style>
