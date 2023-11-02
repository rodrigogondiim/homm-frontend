import { createStore } from "vuex";

import notification from "./notification";
import user from "./user";

const store = createStore({
  modules: {
    notification,
    user,
  },
});

export default store;
