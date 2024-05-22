<template>
  <template v-if="!profile.have_solicitation">
    <button v-if="profile.was_my_solicitation" class="request_pendent" title="Você enviou um pedido de amizade">
      <i class="fa-solid fa-user-check"></i>
    </button>
    <button v-else class="request_ok" title="Adicionar como amigo" @click="$emit('requestFriend')">
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
<script>

export default {
  props: {
    profile: Object
  },
  mounted() {
  }
};
</script>
<style>
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

.request_ok,
.request_pendent {
  margin-top: 10px;
  border-radius: 50%;
  appearance: none;
  padding: 5px;
  outline: none;
  border: none;
}
</style>
