<template>
  <section>
    <Spinner class="spinner" v-if="!loadProfile" />
    <div class="profile" v-if="loadProfile">
      <img :src="profile.picture" alt="" />
      <div class="infos">
        <h1>@{{ profile.name }}</h1>
        <p v-if="profile.slogan">{{ profile.slogan }}</p>
        <div class="btns">
          <Request :profile="profile" />
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
import Request from "@/components/Dashboard/Buttons/Request.vue";
import http from "@/services/axios";

export default {
  components: {
    Spinner,
    Request,
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
            ? this.$router.go({ name: "index" })
            : '';
        });
    }
  },
  watch: {
    async "$route.params"(newProfile) {
      if (newProfile.name) {
        this.profile = [];
        await this.getProfile();
      }
    }
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
  max-width: 900px;
  height: 150px;
  margin: auto;
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

.profile button {}

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
</style>
