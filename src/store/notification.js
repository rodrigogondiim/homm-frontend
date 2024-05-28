import http from "@/services/axios";
import checkToken from "@/services/checkToken";

export default {
  namespaced: true,
  state: {
    receivedNotification: false,
    list_friends_pendency: [],
  },
  mutations: {
    view(state, payload) {
      state.receivedNotification = payload;
    },
    friendsPendency(state, payload) {
      state.list_friends_pendency = payload;
    },
  },
  actions: {
    async setAsPreview(state, payload) {
      checkToken(true);
      await http()
        .patch(`/api/user/notified`, {
          view: payload,
        })
        .then(() => state.commit("view", payload))
        .catch((error) => {
          if (error.response.status === 401)
            checkToken(true);
        });
    },

    async listFriendsPendency(state) {
      checkToken(true);
      await http()
        .get(`/api/friends/pendent`)
        .then((resolve) => state.commit("friendsPendency", resolve.data))
        .catch((error) => {
          if (error.response.status === 401)
            checkToken(true);
        });
    },
    hasViewed(state, payload) {
      state.commit("view", payload);
    },
  },
  getters: {
    getListFriendsPendency(state) {
      return state.list_friends_pendency;
    },
    receivedNotification(state) {
      return state.receivedNotification;
    },
  },
};
