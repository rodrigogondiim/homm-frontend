<template>
  <div class="parts-main">
    <div>
      <input autocomplete="off" style="position: relative" aria-label="Entrada Pesquisa" :value="searchText"
        @input="(e) => (searchText = e.target.value)" @keyup="searchUser" ref="search" @blur="focusOff" class="search"
        type="text" />
      <span v-if="spinner" style="
          width: 20px;
          height: 20px;
          position: absolute;
          top: 7px;
          right: 3px;
        ">
        <Spinner class="spinner" v-if="onSearch" />
      </span>
    </div>
    <div class="parts" @focus="focusOn" tabindex="0" role="button" v-if="!onSearch">
      <div class="itens">
        <img src="@/assets/img/search.svg" alt="" />
        <p>Pesquisar amigos</p>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Animations/Spinner.vue";

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      onSearch: false,
      spinner: false,
      searchText: "",
    };
  },
  methods: {
    focusOn() {
      this.onSearch = !this.onSearch;
      this.$refs.search.focus();
    },
    focusOff() {
      if (!this.searchText) this.onSearch = !this.onSearch;
    },
    searchUser() {
      this.spinner = true;
      setTimeout(() => {
        this.spinner = false;
      }, 1000);
      this.$emit("obs", this.searchText);
    },
  },
};
</script>

<style scoped>
.spinner {
  width: 5px;
  height: 5px;
}

.search {
  height: 30px;
  padding: .5rem 0.8rem;
  box-sizing: border-box;
  color: #999;
  outline: none;
}

.parts-main {
  width: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.parts-main input {
  width: 100%;
  height: 100%;
}

.parts {
  top: 0;
  left: 0;
  display: flex;
  z-index: 2;
  align-items: center;
  flex-direction: row;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: left;
  cursor: text;
  padding: 0 16px;
  color: #999;
  box-sizing: border-box;
}

.parts .itens {
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.parts .itens img {
  margin-right: 10px;
}

.parts .itens p {
  font-size: .7rem;
}
</style>
