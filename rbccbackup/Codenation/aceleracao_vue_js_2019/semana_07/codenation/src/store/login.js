import axios from "axios";
import { domain } from "env";

export default {
  namespaced: true,
  state: {
    oauth: {}
  },
  actions: {
    async login({ commit }, form) {
      const headers = {
        Authorization: "Basic dWFhY2xpZW50OnVhYXNlY3JldA=="
      };

      const { data } = await axios.post(
        `${domain}/oauth/token`,
        { ...form, grant_type: "password" },
        { headers }
      );
      commit("save_token", data);
    },
    async signup(context, form) {
      await axios.post(`${domain}/users`, form);
    },
    async confirm(context, token) {
      await axios.post(`${domain}/users/confirm`, {token});
    },
  },
  mutations: {
    save_token(state, oauth) {
      state.oauth = oauth;
    }
  },
  getters: {
    user(state) {
      const [, body] = state.oauth.access_token.split(".");
      return JSON.parse(atob(body));
    }
  }
};
