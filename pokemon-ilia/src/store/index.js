import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n';

import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    getters,
    state: {
        isLoading: true,
        pokemonIds: [],

    },
    mutations: {

        setLoading (state, isLoading) {
            state.isLoading = isLoading
        },

        addPokemonIdToArray (state, pokemonId) {
            if (!state.pokemonIds.includes(pokemonId)) {
                state.pokemonIds.push(pokemonId)
            }
        },

    },
    actions: {
        setLoading( context, boolean ) {  context.commit('setLoading', boolean)} ,


    },
})


Vue.use(vuexI18n.plugin, store);


export default store;
