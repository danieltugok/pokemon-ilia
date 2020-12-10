<template>

    <b-container class="home">
        
        <HelloWorld msg="Welcome to Your Vue.js App"/>        

        
        <form v-on:submit.prevent="getPokemonByName()">
            <b-form-input id="type-text" type="text" v-model="searchName"></b-form-input>

            <b-button variant="outline-primary" type="submit">
                {{$t('global.searchByName')}}
            </b-button>
        </form>

            <b-button variant="primary" @click.prevent="getPokemonList()">
                Clear
            </b-button>

            <b-button variant="primary" @click.prevent="sortPokemonList()">
                SORT
            </b-button>



        <br><br>  

        
        <b-container class="bv-example-row" v-if="pokemons">
            <b-row>
                <b-col v-for="pokemon in pokemons" :key="pokemon.id" sm>
                    <a href="#" @click.prevent="checkDetails(pokemon.id)">
                        <img :src="pokemon.imageUrl" :alt="pokemon.name">
                        <p>{{pokemon.name}}</p>
                        <p>{{pokemon.id}}</p>
                        <p>{{pokemon.types}}</p>
                    
                        <b-button variant="outline-primary">
                            Ver Detalhes...
                        </b-button>
                    </a>
                    
                </b-col>

            </b-row>
        </b-container>

    </b-container>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {

    name: 'Home',

    components: {
        HelloWorld
    },
    
    props: {
        pokemons: {
            type: Array,
            default: null
        },

    },

    data () {
        return {
            searchName: null,
            sort: "ASC"

        }
    },

    methods: {
        getPokemonByName() {
            this.$emit('searchName', this.searchName)
        },

        getPokemonList() {
            if ( this.searchName != "" ) {
                this.$emit('searchList', this.searchName)
                this.searchName = ""
            }
        },

        sortPokemonList() {

            if (this.sort === "ASC") {
                this.sort = "DESC"
            } else {
                this.sort = "ASC"
            }

            this.$emit('sortPokemonList', this.sort)
        },

        checkDetails( pokemonId ) {
            this.$emit('checkDetails', pokemonId)
        }

        



        

    }

    
}
</script>

<style lang="scss">

    .col-sm{
        margin-bottom: 50px;
    }
</style>
