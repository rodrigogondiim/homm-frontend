<template>
    <main>
        <h1>Cadastro</h1>
        <section id="content">
            <form action="">
                <input type="text" placeholder="Nome" v-model="formData.name" />
                <input type="email" placeholder="E-mail" v-model="formData.email" />
                <input type="password" placeholder="Senha" v-model="formData.password" />
                <Button :disabled="onLoad" :load="onLoad" @click.prevent="checkInfos">Cadastrar</Button>
            </form>
        </section>
    </main>
</template>
<script>
import http from "@/services/axios";
import Button from "./Animations/Button.vue";
import { useToast, POSITION } from "vue-toastification";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, alpha } from '@vuelidate/validators'

export default {
    components: {
        Button
    },
    setup() {
        const toast = useToast();
        return { toast, v$: useVuelidate() };
    },
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: '',
            },
            onLoad: false,
        };
    },
    validations() {
        return {
            formData: {
                name: {
                    required,
                    alpha,
                    minLength: minLength(4)
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6)
                }
            }
        }
    },
    methods: {
        async checkInfos() {
            const checkFields = await this.v$.$validate();
            if (!checkFields) {
                this.toast.warning("Informe os dados para cadastro!", {
                    position: POSITION.BOTTOM_CENTER,
                    icon: true,
                });
                return false;
            }
            this.onLoad = true;
            await this.registerUser();
        },
        async registerUser() {
            try {
                await http().post(`/api/user`, {
                    ...this.formData
                });
                this.toast.clear();
                this.toast.success('Cadastrado com sucesso.', {
                    timeout: 1400,
                    onClose: () => {
                        this.$router.push({ name: "auth" });
                    }
                })
            } catch (error) {
                this.toast.clear();
                this.toast.error("Não foi possível cadastrar", {
                    position: POSITION.BOTTOM_CENTER,
                    icon: true,
                });
                this.onLoad = false;
            }
        }
    }
};
</script>
<style>
main {
    max-width: 900px;
    width: 100%;
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

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
}
</style>