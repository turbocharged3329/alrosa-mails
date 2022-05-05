import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: () => ({
        items: [],
        headerVisibility: false
    }),
    mutations: {
        SET_HEADER_VISIBILITY(state, payload) {
            state.headerVisibility = payload;
        }
    },
    actions: {
        setHeaderVisibility({commit}, payload) {
            commit('SET_HEADER_VISIBILITY', payload)
        }
    },
    getters: {
        headerVisibility: (state) => state.headerVisibility
    },
})

export default store;