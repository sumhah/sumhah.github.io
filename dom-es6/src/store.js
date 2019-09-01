import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        score: 0,
        uiState: 'open',
    },
    mutations: {
        togglePage({state, payload}) {
            state.uiState = payload
        }
    },
    actions: {},
})
