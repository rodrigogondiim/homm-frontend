import http from "@/services/axios";
import checkToken from "@/services/checkToken";

export default {
  namespaced: true,
  state: {
    user: {},
    isLogged: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isLogged = true;
    },
  },
  actions: {
    async userLogged(state) {
      checkToken(true);
      await http()
        .get(`/api/auth/me`)
        .then((resolve) => state.commit("setUser", resolve.data))
        .catch((error) => {
          if (error?.response.status === 401) this.$router.go({ name: "auth" });
        });
    },
  },
  getters: {
    getUserLogged(state) {
      return state.user;
    },
    isLogged(state) {
      return state.isLogged;
    },
  },
};
