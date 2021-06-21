import Vue from "vue";
import Vuex from "vuex";
// getters
import getters from "./getters";
// modules
import user from "./modules/user";
import permission from "./modules/permission";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  modules: {
    user,
    permission
  },
  getters
});

// export store
export default store;
