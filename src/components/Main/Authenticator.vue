<template>
    <main>
        <h1>Autenticação</h1>
        <section id="content">
            <form action="">
                <input type="text" placeholder="Digite o seu usuário" name="login">
                <input type="password" placeholder="Digite sua senha" name="password">
                <input type="submit" @click.prevent="sendAuth" value="Entrar">
            </form>
        </section>
    </main>
</template>

<script>

    export default {
        methods: {
            sendAuth(){
                console.log('aq')
            }
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

input[type=text], input[type=password]{
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