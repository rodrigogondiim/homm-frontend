<template>
  <template v-if="profile.it_is_my_friend || it_is_my_friend">
    <h3>Vocês são amigos!</h3>
  </template>
  <template v-else>
    <template v-if="!profile.have_solicitation">
      <button v-if="profile.was_my_solicitation || view" class="pendent" title="Você enviou um pedido de amizade">
        <i class="fa-solid fa-user-check"></i>
      </button>
      <Button v-else class="request" title="Adicionar como amigo" :disabled="onLoad" :load="onLoad"
        @click="requestFriend">
        <i class="fa-solid fa-user-plus"></i>
      </Button>
    </template>
    <template v-else>
      <button class="confirm" @click="friendship(true)" :disabled="onLoad" :load="onLoad">
        <i class="fa-solid fa-circle-check"></i> Aceitar
      </button>
      <button class="close" @click="friendship(false)" :disabled="onLoad" :load="onLoad">
        <i class="fa-solid fa-circle-xmark"></i> Recusar
      </button>
    </template>
  </template>
</template>
<script>
import http from "@/services/axios";
import Button from '@/components/Animations/Button.vue';
export default {
  props: {
    profile: Object
  },
  components: {
    Button
  },
  data() {
    return {
      onLoad: false,
      it_is_my_friend: false,
      view: false
    }
  },
  methods: {
    async requestFriend() {
      this.onLoad = true;
      await http()
        .post(`/api/friends/${this.profile.id}`)
        .then(() => (this.view = true))
        .catch((err) => {
          err.response.status === 401
            ? this.$router.go({ name: "index" })
            : '';
        });
      this.onLoad = false;
    },
    async friendship(accept) {
      this.onLoad = true;
      await http()
        .patch(
          `/api/friends/${this.profile.have_solicitation}/friendship`, {
          accept
        })
        .then(() => this.it_is_my_friend = accept)
        .catch((err) => {
          err.response.status === 401
            ? this.$router.go({ name: "index" })
            : '';
        });
      this.onLoad = false;
    },
  }
};
</script>
<style scoped>
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

.pendent {
  background: #9146ff;
  color: #f2f2f2;
  cursor: auto;
}

.request {
  width: 30px !important;
  height: 30px !important;
  cursor: pointer;
  color: #9146ff;
  background: #f2f2f2;
}

.request,
.pendent {
  margin-top: 10px;
  border-radius: 50%;
  appearance: none;
  padding: 5px;
  outline: none;
  border: none;
}
</style>
