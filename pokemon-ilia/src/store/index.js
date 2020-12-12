import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n';

import app from './modules/app'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    getters,
    modules: {
        app,
    },
    state: {
        pokemonIds: []

    },
    mutations: {

        addPokemonIdToArray (state, pokemonId) {
            if (!state.pokemonIds.includes(pokemonId)) {
                state.pokemonIds.push(pokemonId)
            }
        },

    },
    actions: {


    },
})


Vue.use(vuexI18n.plugin, store);


export default store;
