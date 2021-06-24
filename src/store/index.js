import Vue from "vue";
import Vuex from "vuex";

// getters
import getters from "./getters";

// modules
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import permission from "./modules/permission";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters
});

// export store
export default store;
