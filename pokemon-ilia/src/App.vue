<template>
  <div id="app">

    

    <b-navbar toggleable="lg" type="dark" variant="dark">        

        <router-link class="navbar-brand" to="/">Pokemon ília</router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">
                    <router-link to="/detail">{{$t('global.detail')}}</router-link>
                </b-nav-item>
                <b-nav-item href="#">
                    <router-link to="/historic">{{$t('global.historic')}}</router-link>
                </b-nav-item>
                <b-nav-item href="#">
                    <router-link to="/about">{{$t('global.credits')}}</router-link>
                </b-nav-item>
            </b-navbar-nav>            

            <b-navbar-nav class="ml-auto">

                <!-- <a href="#" @click.prevent="setLanguage('en')">EN</a>
                <a href="#" @click.prevent="setLanguage('br')">PT</a> -->


                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#" @click.prevent="setLanguage('en')">EN</b-dropdown-item>
                    <b-dropdown-item href="#" @click.prevent="setLanguage('br')">PT</b-dropdown-item>
                </b-nav-item-dropdown>

            </b-navbar-nav>
        </b-collapse>
    </b-navbar>

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
import { mapGetters, mapActions } from 'vuex'

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
    
    computed: {
        ...mapGetters([
            'isLoading'
        ]),

    },

    methods: {
        ...mapActions([
            'setLoading',
        ]),        

        setLanguage( locale ) {
            Vue.i18n.set( locale )
        },

        selectedPokemonId ( selectedPokemonId ) {
            this.pokemonId = selectedPokemonId
            router.push('detail')
        },

        async getPokemonList( event = null ) {
            
            this.setLoading(true);

                console.log('event:', event);
            var params;

            if ( event == null  ) {
                params = {
                    page: 1,
                    pageSize: 10,
                    supertype: 'pokemon'                
                }
            } 
            
            if (event) {
                params = event;
            }  
            
            console.log('params:', params);

            try {
                const response = await axios.get('/cards', {params});
                this.pokemons = response.data.cards;
                this.sortPokemons("ASC");
                this.setLoading(false);

            } catch (error) {
                console.error(error);
            }
        },

        // async getPokemonByName( object ) {

        //     this.setLoading(true);

        //     var params = {
        //         page: 1,
        //         pageSize: 10,
        //         name: object,
        //         supertype: 'pokemon'                 
        //     }

        //     try{
        //         const response = await axios.get(`/cards`, {params});
        //         this.pokemons = response.data.cards;
        //         this.sortPokemons("ASC");
        //         this.setLoading(false);

        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

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
    @import './assets/styles/style.scss';

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        // color: #2c3e50;
        color: white;
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

    .navbar{
        margin-bottom: 50px;
    }

   
    
</style>
