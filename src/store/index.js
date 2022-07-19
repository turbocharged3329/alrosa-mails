import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: [
        "token",
        "postName",
        "headerVisibility",
        "user",
        "currentPost",
        "currentTemplate",
        "pattern_img",
        "it_img",
        "signature_img"
      ],
    }),
  ],
  state: () => ({
    headerVisibility: false,
    posts: [],
    token: null,
    postName: "",
    user: null,
    currentPost: null,
    currentTemplate: null,
    templates: [],
    isDisabledCopy: false,
    pattern_img: null,
    it_img: null,
    signature_img: null
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
    SET_CURRENT_POST(state, payload) {
      state.currentPost = payload;
    },
    SET_CURRENT_TEMPLATE(state, payload) {
      state.currentTemplate = payload;
    },
    SET_TEMPLATES(state, payload) {
      state.templates = payload;
    },
    SET_PATTERN_IMAGE(state, payload) {
      state.pattern_img = payload[0].image;
    },
    SET_IT_IMAGE(state, payload) {
      state.it_img = payload[0].image;
    },
    SET_SIGNATURE_IMAGE(state, payload) {
      state.signature_img = payload[0].image;
    },
    SET_COPY_DISABLED_STATUS(state, payload) {
      state.isDisabledCopy = payload;
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
          // Authorization: "Token da2da7a36ef5fd7e39944f10c589e7ccddf29217",
          Authorization: `Token ${this.state.token}`,
        },
      }).then((response) => {
        commit("SET_POSTS", response.data);
      });
    },
    getTemplates({ commit }) {
      return axios({
        method: "GET",
        url: `${process.env.VUE_APP_API}/premade-email-templates/`,
        headers: {
          // Authorization: "Token da2da7a36ef5fd7e39944f10c589e7ccddf29217",
          Authorization: `Token ${this.state.token}`,
        },
      }).then((response) => {
        commit("SET_TEMPLATES", response.data);
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
          dispatch("getUser");
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
          // Authorization: "Token da2da7a36ef5fd7e39944f10c589e7ccddf29217",
          Authorization: `Token ${this.state.token}`,
        },
      }).then((response) => {
        commit("SET_USER_DATA", response.data);
      });
    },
    getPatternImage({ commit }, payload) {
      let url = `${process.env.VUE_APP_API}`;
      if (payload == 'pattern') {
        url += '/header-with-pattern-images/'
      } else if (payload == 'it') {
        url += '/header-from-it-department-images/'
      } else if (payload == 'signature') {
        url += '/signature-images/'
      }

      return axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then((response) => {
        if (payload == 'pattern') {
          commit("SET_PATTERN_IMAGE", response.data);
        } else if (payload == 'it') {
          commit("SET_IT_IMAGE", response.data);
        } else if (payload == 'signature') {
          commit("SET_SIGNATURE_IMAGE", response.data);
        }
      });
    },
    setPostName({ commit }, payload) {
      commit("SET_POST_NAME", payload);
    },
    setCurrentPost({ commit }, payload) {
      commit("SET_CURRENT_POST", payload);
    },
    setCurrentTemplate({ commit }, payload) {
      commit("SET_CURRENT_TEMPLATE", payload);
    },
    setDisabledCopyStatus({ commit }, payload) {
      commit("SET_COPY_DISABLED_STATUS", payload);
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
    currentPost: (state) => state.currentPost,
    currentTemplate: (state) => state.currentTemplate,
    isDisabledCopy: (state) => state.isDisabledCopy,
    templates: (state) => state.templates,
    pattern_img: (state) => state.pattern_img,
    it_img: (state) => state.it_img,
    signature_img: (state) => state.signature_img,
  },
});

export default store;
