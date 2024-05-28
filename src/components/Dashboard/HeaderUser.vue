<template>
  <header>
    <Spinner v-if="!isLogged" />
    <template v-else>
      <Notification v-if="onLoad" :userMe="getUserLogged.id" :view="getUserLogged.view_notification" />
      <Spinner v-else />

      <div class="info">
        <nav id="manageOptions">
          <ul>
            <li><a @click.prevent="logout" href=""><i class="fa-solid fa-door-open"></i>Sair</a></li>
          </ul>
        </nav>
        <div class="info">
          <div class="main_manager" @click="optionsManager">
            <i class="manager fa-solid fa-gear"></i>
          </div>
          <span class="info_user" href="">
            <img width="30" height="30" :src="getUserLogged.picture" />
            <p :title="getUserLogged.name">{{ getUserLogged.name }}</p>
          </span>
          <a href="" class="logout">X</a>
        </div>

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
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "Header",
  components: {
    Notification,
    Spinner,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      onLoad: false,
    }
  },
  async created() {
    window.Pusher = require("pusher-js");
    window.Echo = new Echo({
      broadcaster: "pusher",
      //
      wsHost: process.env.VUE_APP_PUSHER_APP_SERVER,
      wsPort: parseInt(process.env.VUE_APP_PUSHER_APP_PORT),
      //
      key: process.env.VUE_APP_PUSHER_APP_KEY,
      cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
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
                callback(null, response.data);
              })
              .catch((error) => {
                callback(error);
              });
          },
        };
      },
    });
    this.userLogged();
    await this.listFriendsPendency();
    this.onLoad = true;
  },
  methods: {
    ...mapActions("user", ["userLogged"]),
    ...mapActions("notification", [
      "listFriendsPendency",
    ]),
    optionsManager() {
      const manager = document.getElementById('manageOptions').classList;
      const hasActive = manager.contains("active");
      if (hasActive) {
        return manager.remove('active');
      }
      return manager.add('active');
    },
    logout() {
      localStorage.removeItem('-tknA');
      this.toast.clear();
      this.toast.info("saindo...!", {
        position: POSITION.BOTTOM_CENTER,
        timeout: 1000,
        icon: true,
        onClose: () => {
          this.$router.go({ name: 'index' });
        }
      });
      return true
    }
  },
  computed: {
    ...mapGetters("user", ["getUserLogged", "isLogged"]),
    isNotPageAuth() {
      return this.$route.path != "/auth";
    }
  },
};
</script>
<style scoped>
header {
  max-width: 900px;
  width: 90%;
  height: 70px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info_user {
  padding: 0.1rem 1.5rem;
  background: #9146ff;
  color: #f2f2f2;
  text-decoration: none;
  border-radius: 3px;
}

.info_user p {
  font-weight: light;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.main_manager {
  color: #fff;
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  flex-direction: column;
  align-items: end;
}

#manageOptions {
  display: none;
}

#manageOptions.active {
  display: block;
}

#manageOptions ul {
  list-style: none;
  text-decoration: none;
}

#manageOptions ul li {
  border-radius: 3px;
  margin-left: 10px;
  background: white;
  text-decoration: none;
  padding: 2px;
}

#manageOptions ul li a {
  display: flex;
  gap: 3px;
  align-items: center;
  text-decoration: none;
  color: #010101;
}

#manageOptions ul li a:hover {
  color: #9146ff;
}

.manager {
  width: 16px;
  height: 16px;
}

.manager:hover {
  color: #999;
  cursor: pointer
}

.info {
  position: relative;
  display: flex;
  gap: 5px;
}

.logout {
  display: none;
}
</style>
