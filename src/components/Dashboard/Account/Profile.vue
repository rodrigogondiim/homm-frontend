<template>
  <section>
    <Spinner class="spinner" v-if="!loadProfile" />
    <div class="profile" v-if="loadProfile">
      <img :src="profile.picture" alt="" />
      <div class="infos">
        <h1>@{{ profile.name }}</h1>
        <p v-if="profile.slogan">{{ profile.slogan }}</p>
        <div class="btns">
          <template v-if="profile.it_is_my_friend">
            <h3>Vocês são amigos!</h3>
          </template>
          <template v-else>
            <template v-if="!profile.have_solicitation">
              <button
                v-if="profile.was_my_solicitation"
                class="request_pendent"
                title="Você enviou um pedido de amizade"
              >
                <i class="fa-solid fa-user-check"></i>
              </button>
              <button
                v-else
                class="request_ok"
                title="Adicionar como amigo"
                @click="requestFriend"
              >
                <i class="fa-solid fa-user-plus"></i>
              </button>
            </template>
            <template v-else>
              <button class="confirm">
                <i class="fa-solid fa-circle-check"></i> Aceitar
              </button>
              <button class="close">
                <i class="fa-solid fa-circle-xmark"></i> Recusar
              </button>
            </template>
          </template>
        </div>
        <div class="birthday">
          <span>🎉20/05/2000</span>
        </div>
      </div>
    </div>
    <div class="timeline">
      <h1>Este usuário ainda não fez nenhuma postagem</h1>
    </div>
  </section>
</template>
<script>
import Spinner from "@/components/Animations/Spinner.vue";
import http from "@/services/axios";

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      profile: [],
    };
  },
  mounted() {
    this.getProfile();
  },
  computed: {
    loadProfile() {
      return Object.keys(this.profile).length;
    },
  },
  methods: {
    async getProfile() {
      await http()
        .get(`/api/user/${this.$route.params.name}`)
        .then((response) => (this.profile = response.data))
        .catch((err) => {
          err.response.status === 401
            ? this.$router.push({ name: "auth" })
            : console.log(err);
        });
    },
    async requestFriend() {
      await http()
        .post(`/api/friends/${this.profile.id}`)
        .then(() => (this.profile.was_my_solicitation = true))
        .catch((err) => {
          err.response.status === 401
            ? this.$router.push({ name: "auth" })
            : console.log(err);
        });
    },
  },
  watch: {
    async "$route.params"(newProfile) {
      if (newProfile.name) {
        this.profile = [];
        await this.getProfile();
      }
    },
  },
};
</script>

<style scoped>
section {
  margin: auto;
}
.spinner {
  margin: 10px auto;
}
.profile {
  height: 150px;
  display: flex;
  background: #2c3e50;
  gap: 10px;
  color: #f4f4f4;
  text-align: left;
}
.profile img {
  aspect-ratio: 1/1;
}
.profile .infos {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 5px 0;
}

.profile .infos h1 {
  font-size: 1.1em;
}

.profile .infos p {
  letter-spacing: 1px;
}

.profile button {
}
.profile .btns {
  display: flex;
  gap: 10px;
}
.birthday {
  margin-top: 10px;
  font-size: 0.7em;
}
.timeline {
  margin-top: 30px;
  font-size: 0.8em;
}
.request_ok,
.request_pendent {
  margin-top: 10px;
  border-radius: 50%;
  appearance: none;
  padding: 5px;
  outline: none;
  border: none;
}
.request_pendent {
  background: #9146ff;
  color: #f2f2f2;
  cursor: auto;
}
.request_ok {
  cursor: pointer;
  color: #9146ff;
  background: #f2f2f2;
}

.confirm,
.close {
  border-radius: 3px;
  border: none;
  outline: hidden;
  background: transparent;
  padding: 3px;
  box-sizing: border-box;
}

.confirm {
  color: green;
  margin-right: 10px;
}
.close {
  color: red;
}
.confirm:hover,
.close:hover {
  background: #fff;
  cursor: pointer;
}
</style>
