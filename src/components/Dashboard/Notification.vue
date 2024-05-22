<template>
  <div class="main-notification">
    <div>
      <img tabindex="0" @click.stop="showNotification" src="@/assets/img/notification.svg" alt="Mostrar notificações" />
      <span v-if="receivedNotification" class="signal"></span>
    </div>
    <div v-if="onModalNotification" tabindex="0" @click.stop class="box">
      <template v-if="getListFriendsPendency.length > 0">
        <div class="card_solicitation" v-for="pendent in getListFriendsPendency" :key="pendent.id">
          <img :src="pendent.user.picture" alt="" />
          <div class="infos">
            <h4>
              <span title="Ir para perfil" @click="goToProfile(pendent.user.name)">{{ pendent.user.name }}</span>
              fez uma solicitação de amizade
            </h4>
            <div class="btns">
              <button class="confirm">
                <i class="fa-solid fa-circle-check"></i> Aceitar
              </button>
              <button class="close">
                <i class="fa-solid fa-circle-xmark"></i> Recusar
              </button>
              <p>{{ dateNotification(pendent.created_at) }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="message">Não tem nenhuma notificação!</p>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';

export default {
  props: {
    userMe: Number,
    view: Boolean,
  },
  data() {
    return {
      onModalNotification: false,
    };
  },
  computed: {
    ...mapGetters("notification", [
      "getListFriendsPendency",
      "receivedNotification",
    ]),
  },
  created() {
    this.hasViewed(this.view);

    document.body.addEventListener(
      "click",
      () => (this.onModalNotification = false)
    );
    window.Echo.private(`request_friend.${this.userMe}`).listen(
      ".RequestFriend",
      async (resultEvent) => {
        if (!this.onModalNotification) return this.viewed(true);

        this.getListFriendsPendency.unshift(resultEvent.notification);
        this.scrollTop();
      }
    );
  },
  methods: {
    ...mapActions("notification", [
      "viewed",
      "listFriendsPendency",
      "hasViewed",
    ]),
    async showNotification() {
      if (!this.onModalNotification)
        await this.listFriendsPendency();
      if (this.receivedNotification)
        this.viewed(false);

      this.onModalNotification = true;
    },
    goToProfile(profileToGo) {
      this.onModalNotification = false;
      this.$router.push({
        name: "profile",
        params: { name: profileToGo },
        replace: true,
      });
    },
    scrollTop() {
      if (this.getListFriendsPendency.length)
        document.querySelectorAll(".box")[0].scrollIntoView(true);
    },
    dateNotification(date) {
      moment.locale('pt-br');
      return moment(new Date(date)).fromNow();
    }
  },
};
</script>

<style scoped>
img {
  cursor: pointer;
}

.message {
  padding: 5% 0;
}

.main-notification {
  position: relative;
}

.box {
  position: absolute;
  width: 270px;
  max-height: 300px;
  min-height: 300px;
  background: #fff;
  z-index: 10;
  padding: 0.3rem;
  overflow-y: scroll;
  margin: auto;
  scrollbar-width: thin;
}

.box::-webkit-scrollbar {
  width: 3px;
  height: 8px;
  background-color: #aaa;
}

.card_solicitation {
  min-width: 200px;
  width: 100%;
  height: 60px;
  background: #ddd;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  box-sizing: border-box;
  gap: 5px;
  margin-bottom: 10px;
}

.card_solicitation img {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
}

.card_solicitation .infos {
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
  word-wrap: break-word;
}

.card_solicitation .infos h4 {
  font-size: 0.7em;
  font-weight: 400;
  user-select: none;
}

.card_solicitation .infos h4 span {
  font-weight: bold;
  cursor: pointer;
}

.card_solicitation .infos .btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card_solicitation .infos .btns p {
  font-size: 0.6em;
  font-weight: bold;
  text-wrap: nowrap;
}

.confirm,
.close {
  font-size: 0.7em;
  border-radius: 3px;
  border: none;
  outline: hidden;
  background: transparent;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.confirm {
  color: green;
}

.close {
  color: red;
}

.confirm:hover,
.close:hover {
  background: #fff;
  cursor: pointer;
}

.signal {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
  background: #9146ff;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
