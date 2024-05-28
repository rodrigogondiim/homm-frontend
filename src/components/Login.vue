<template>
  <main>
    <h1>Faça o login</h1>
    <section id="content">
      <form>
        <input type="email" placeholder="Digite o seu email" v-model="formData.email" />
        <input type="password" placeholder="Digite sua senha" v-model="formData.password" />
        <Button :load="onLoad" :disabled="onLoad" @click.prevent="checkInfos">Entrar</Button>
      </form>
    </section>
  </main>
</template>

<script>
import http from "@/services/axios";
import Button from "./Animations/Button.vue";
import { useToast, POSITION } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  components: {
    Button,
  },
  setup() {
    const toast = useToast();
    return { toast, v$: useVuelidate() };
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      onLoad: false,
    };
  },
  validations() {
    return {
      formData: {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
        },
      },
    };
  },
  methods: {
    async checkInfos() {
      const checkFields = await this.v$.$validate();
      if (!checkFields) {
        this.toast.clear();
        this.toast.warning("Informe os dados para acesso!", {
          position: POSITION.BOTTOM_CENTER,
          icon: true,
        });
        return false;
      }
      this.onLoad = true;
      return await this.login();
    },
    async login() {
      try {
        const { data } = await http().post(`/api/auth`, {
          ...this.formData,
        });
        localStorage.setItem("-tknA", data.access_token);
        this.toast.success("Login feito com sucesso!", {
          position: POSITION.BOTTOM_CENTER,
          icon: true,
          timeout: 1700,
          onClose: () => {
            this.$router.push({ name: "dash" });
          },
        });
      } catch (error) {
        this.onLoad = false;
        this.toast.error("Email e/ou senha incorretos!", {
          position: POSITION.BOTTOM_CENTER,
          icon: true,
        });
      }
    },
  },
};
</script>

<style scoped>
main {
  max-width: 900px;
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

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}
</style>
