<template>
    <main>
        <h1>Autenticação</h1>
        <section id="content">
            <form action="">
                <input type="email" placeholder="Digite o seu email" v-model="login">
                <input type="password" placeholder="Digite sua senha" v-model="password">
                <input type="submit" :disabled="isDisabled" @click.prevent="sendAuth" :value="txtValue">
            </form>
        </section>
    </main>
</template>

<script>
    import axios from 'axios';
    import { useToast, POSITION } from "vue-toastification";

    export default {
        setup(){
            const toast = useToast();
            
            return { toast }

        },
        data(){
            return {
                login: '',
                password: '',
                isDisabled: false,
                txtValue: 'Entrar'
            }
        },
        methods: {
            validate(){
                if(!this.login || !this.password){
                    this.toast.clear();
                    this.toast.info('Informe os dados para acesso!', {
                        position: POSITION.BOTTOM_CENTER,
                        icon: true
                    });

                    return false;
                }
                
                return true;
            },
            async sendAuth(){
                if(!this.validate()){
                    return false;
                }

                this.isDisabled = true;
                this.txtValue = 'Aguarde...';

                this.toast.clear();
                try{
                    const { data } = await axios.post('http://127.0.0.1:8000/api/auth', {
                        email: this.login,
                        password: this.password
                    });

                    localStorage.setItem('-tknA', data.access_token);
                    this.$router.push('/');
                }catch( error ){
                    this.toast.error('Email e/ou senha incorretos!', {
                        position: POSITION.BOTTOM_CENTER,
                        icon: true
                    });
                }

                this.isDisabled = false;
                this.txtValue = 'Entrar';
            },
        }
    }

</script>

<style scoped>
main{
    width: 90%;
    margin: 2rem auto;
    color: #f2f2f2;
}

#content{
    width: 70%;
    margin: auto;
    display: flex;
    justify-content: center;
}

input[type=email], input[type=password]{
    padding: .8rem;
    margin-bottom: .8rem;
}

input[type=submit]{
    width: 80px;
    height: 35px;
}

form{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
}
</style>