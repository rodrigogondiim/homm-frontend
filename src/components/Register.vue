<template>
    <main>
        <h1>Cadastro</h1>
        <section id="content">
            <form action="">
                <input type="text" placeholder="Nome" v-model="name" />
                <input type="email" placeholder="E-mail" v-model="email" />
                <input type="password" placeholder="Senha" v-model="password" />
                <input type="submit" @click.prevent="checkInfos" value="Cadastrar" />
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
            name: null,
            email: null,
            password: null,
        };
    },
    methods: {
        async checkInfos() {
            if (!this.email || !this.password || !this.name) {
                this.toast.clear();
                this.toast.warning("Informe os dados para cadastro!", {
                    position: POSITION.BOTTOM_CENTER,
                    icon: true,
                });
                return false;
            }
            await this.registerUser();
        },
        async registerUser() {
            try {
                await http().post(`/api/user`, {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                this.toast.clear();
                this.toast.success('Cadastrado com sucesso.\nAguarde...', {
                    timeout: 1200,
                    onClose: () => {
                        this.$router.push({ name: "auth" });
                    }
                })
            } catch (error) {
                this.toast.clear();
                this.toast.error("Dados incorretos!", {
                    position: POSITION.BOTTOM_CENTER,
                    icon: true,
                });
            }
        },
    }
};
</script>
<style>
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

input[type="text"],
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