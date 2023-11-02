<template>
  <header>
    <Spinner v-if="!isLogged" />
    <template v-if="isLogged">
      <Notification
        :userMe="getUserLogged.id"
        :view="getUserLogged.view_notification"
      />
      <div class="logins">
        <span class="log_twitch" href="">
          <img width="30" height="30" :src="getUserLogged.picture" />
          <p :title="getUserLogged.name">{{ getUserLogged.name }}</p>
        </span>
        <a href="" class="logout">X</a>
      </div>
    </template>
  </header>
</template>
<script>
import Echo from "laravel-echo";
import http from "@/services/axios";
import Notification from "@/components/Dashboard/Notification.vue";
import Spinner from "@/components/Animations/Spinner.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    Notification,
    Spinner,
  },
  created() {
    this.userLogged();

    window.Pusher = require("pusher-js");

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: process.env.VUE_APP_MIX_PUSHER_APP_KEY,
      cluster: process.env.VUE_APP_MIX_PUSHER_APP_CLUSTER,
      wsHost: process.env.VUE_APP_MIX_PUSHER_APP_SERVER,
      wsPort: 6001,
      forceTLS: false,
      authHost: process.env.VUE_APP_URI_BACKEND,
      authorizer: (channel) => {
        return {
          authorize: (socketId, callback) => {
            http()
              .post(`/broadcasting/auth`, {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                console.log("...");
                callback(null, response.data);
              })
              .catch((error) => {
                console.log(error);
                callback(error);
              });
          },
        };
      },
    });
  },
  methods: {
    ...mapActions("user", ["userLogged"]),
  },
  computed: {
    ...mapGetters("user", ["getUserLogged", "isLogged"]),
    isNotPageAuth() {
      return this.$route.path != "/auth";
    },
  },
};
</script>
<style scoped>
header {
  width: 90%;
  height: 70px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.log_twitch {
  padding: 0.1rem 1.5rem;
  background: #9146ff;
  color: #f2f2f2;
  text-decoration: none;
  border-radius: 3px;
}
.log_twitch p {
  font-weight: light;
  text-align: ;
  font-size: 0.8em;
  letter-spacing: 1px;
}
.logins {
  display: flex;
}
.logout {
  display: none;
}
</style>
