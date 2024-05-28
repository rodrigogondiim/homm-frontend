<template>
    <h1>Meus amigos</h1>
    <section id="friends">
        <div id="list_friends">
            <div class="friend" v-for="friend in friends" :key="friend.id">
                <img :src="friend.picture" alt="">
                <div class="friend_info">
                    <h6>{{ friend.name }}</h6>
                    <p>Última vez online ...</p>
                </div>
            </div>
        </div>
        <div id="chat">
            <p>Em desenvovimento...</p>
        </div>
    </section>
</template>
<script>
import http from "@/services/axios";
export default {
    name: "Friends",
    data() {
        return {
            friends: null
        }
    },
    async created() {
        await this.getFriends();
    },
    methods: {
        async getFriends() {
            this.friends = (await http().get(`/api/friends`)).data.data;
        }
    }
};
</script>

<style scoped>
h1 {
    margin: 0.9rem 0;
    text-align: left;
    color: white;
}


#friends {
    display: flex;
    flex-direction: row;
    height: 400px;
    background: #2c3e50;
}

.friend {
    width: auto;
    height: 40px;
    padding: 10px;
    display: flex;
    user-select: none;
    gap: 10px;
    cursor: pointer;
    transition: all 300ms;
    -webkit-transition: all 300ms;
}

.friend:hover {
    background: #9146ff;
}

.friend img {
    height: 40px;
}

.friend_info {
    display: flex;
    gap: 5px;
    flex-direction: column;
    text-align: left;
    color: white;
}

.friend_info h6 {
    font-size: 0.9em;
}

.friend_info p {
    font-size: 0.6em;
    letter-spacing: 1px;
}

#list_friends {
    max-width: 250px;
    min-width: 125px;
    width: 30%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #010101;
    overflow-y: scroll;
    scrollbar-width: none;
}

#chat {
    width: 70%;
    padding: 10px;
    color: white;
}
</style>
