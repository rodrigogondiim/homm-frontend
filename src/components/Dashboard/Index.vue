<template>
  <main>
    <Search @obs="search" />
    <section>
      <div class="profiles" v-if="search_user">
        <div class="box">
          <div @click="toUser(user.name)" class="profile" v-for="user in users" :key="user.id">
            <img :src="user.picture" alt="" />
            <div class="profile-infos">
              <h3>@{{ user.name }}</h3>
              <h6></h6>
            </div>
          </div>
        </div>
      </div>
      <Friends></Friends>
    </section>
  </main>
</template>
<script>
import Search from "@/components/Dashboard/Search/Index.vue";
import Friends from "@/components/Dashboard/Friends.vue";
import http from "@/services/axios";
export default {
  components: {
    Search,
    Friends
  },
  data() {
    return {
      search_user: "",
      users: [],
    };
  },
  methods: {
    async search($value) {
      this.search_user = $value;

      if (!this.search_user) return false;

      const { data } = await http().get(`/api/user`, {
        params: { search: this.search_user },
      });
      this.users = data;
    },
    toUser(userId) {
      this.$router.push({
        name: "profile",
        params: { name: userId },
      });
    },
  },
};
</script>
<style scoped>
h1 {
  margin: 0.9rem 0;
  text-align: left;
}

main {
  max-width: 900px;
  width: 90%;
  height: auto;
  margin: auto;
}

a {
  text-decoration: none;
}

section {
  position: relative;
}

.profiles {
  max-width: 300px;
  width: 70%;
  height: fit-content;
  display: flex;
  background: #2c3e50;
  box-sizing: border-box;
  position: absolute;
  z-index: 8;
}

.box {
  width: 100%;
  box-sizing: border-box;
  max-height: 300px;
  overflow-y: scroll;
}

.profile {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 3px;
  box-sizing: border-box;
  cursor: pointer;
}

.profile:nth-child(2n) {
  margin: 5px 0;
}

.profile h3 {
  font-size: 1em;
}

.profile h6 {
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: 3px;
  color: #f2f2f2;
  opacity: 0.3;
}

.profile :where(h3, h6) {
  color: #fff;
  text-align: left;
}

.profile img {
  max-width: 45px;
  height: 45px;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.profile:hover {
  opacity: 0.8;
}

.profile-infos {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
