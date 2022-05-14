import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["token", "postName", "headerVisibility", "user"],
    }),
  ],
  state: () => ({
    headerVisibility: false,
    posts: [],
    token: null,
    postName: "",
    user: null,
  }),
  mutations: {
    SET_HEADER_VISIBILITY(state, payload) {
      state.headerVisibility = payload;
    },
    SET_POSTS(state, payload) {
      state.posts = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload.token;
    },
    SET_POST_NAME(state, payload) {
      state.postName = payload;
    },
    SET_USER_DATA(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setHeaderVisibility({ commit }, payload) {
      commit("SET_HEADER_VISIBILITY", payload);
    },
    getPosts({ commit }) {
      return axios({
        method: "GET",
        url: `${process.env.VUE_APP_API}/email-templates/`,
        headers: {
          Authorization: "Token da2da7a36ef5fd7e39944f10c589e7ccddf29217",
        },
      }).then((response) => {
        commit("SET_POSTS", response.data);
      });
    },
    getToken({ commit, dispatch }, payload) {
      return axios({
        method: "POST",
        url: `${process.env.VUE_APP_API}/auth/get-token/`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((response) => {
          commit("SET_TOKEN", response.data);
          dispatch("getUser")
          return response;
        })
        .catch((e) => {
          console.log("Неверный логин или пароль", e);
        });
    },
    getUser({ commit }) {
      return axios({
        method: "GET",
        url: `${process.env.VUE_APP_API}/user/`,
        headers: {
          Authorization: "Token da2da7a36ef5fd7e39944f10c589e7ccddf29217",
        },
      }).then((response) => {
        commit("SET_USER_DATA", response.data);
      });
    },
    setPostName({ commit }, payload) {
      commit("SET_POST_NAME", payload);
    },
    logout({ commit }) {
      commit("SET_TOKEN", "");
    },
  },
  getters: {
    headerVisibility: (state) => state.headerVisibility,
    posts: (state) => state.posts,
    token: (state) => state.token,
    postName: (state) => state.postName,
    user: (state) => state.user,
  },
});

export default store;
