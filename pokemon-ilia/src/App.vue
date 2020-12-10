<template>
  <div id="app">
    <div id="nav">

        <router-link to="/">{{$t('global.home')}}</router-link> |
        <router-link to="/about">{{$t('global.credits')}}</router-link>
        <router-link to="/detail">{{$t('global.credits')}}</router-link>

        <br><br>

        <a href="#" @click.prevent="setLanguage('en')">en</a> | 
        <a href="#" @click.prevent="setLanguage('br')">pt</a><br>

        <br><br>
    </div>

    <div id="content">
        <router-view 
            :pokemons="pokemons" 
            :pokemonId="pokemonId" 
            @searchName="getPokemonByName($event)" 
            @searchList="getPokemonList($event)" 
            @checkDetails="selectedPokemonId($event)"
            @sortPokemonList="sortPokemons($event)"
        />    
    </div>  

  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import router from './router'

// import ApiService from './services/api.service'

export default {

    data() { 
        return { 
            pokemons: null,
            pokemonId: null,

        }
    },

    mounted (){
        this.getPokemonList()
    },    

    methods: {

        setLanguage( locale ) {
            Vue.i18n.set( locale )
        },

        selectedPokemonId ( selectedPokemonId ) {
            console.log(selectedPokemonId);
            this.pokemonId = selectedPokemonId

            router.push('detail')

        },

        async getPokemonList() {
            var params = {
                page: 1,
                pageSize: 10,
                supertype: 'pokemon'                
            }

            try {
                const response = await axios.get('/cards', {params});
                this.pokemons = response.data.cards;
                this.sortPokemons("ASC");
            } catch (error) {
                console.error(error);
            }
        },

        async getPokemonByName( object ) {
            var params = {
                page: 1,
                pageSize: 10,
                name: object,
                supertype: 'pokemon'                 
            }

            try{
                const response = await axios.get(`/cards`, {params});
                this.pokemons = response.data.cards;
                this.sortPokemons("ASC");
            } catch (error) {
                console.log(error);
            }
        },

        sortPokemons (sort = "ASC") {            

            if ( sort == "ASC") {
                this.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });

                return

            } 

            this.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });


            
        }

        
               
    }


}
</script>

<style lang="scss">
@import './assets/styles/bootstrap';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
