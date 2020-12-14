<template>

    <div>

        <b-container class="home">           
            
            <form v-on:submit.prevent="getPokemonListbyName()" class="mb-5">
                <!-- <b-form-input id="type-text" type="text" v-model="searchName">
                </b-form-input> -->

                <div class="flex">
                    <div class="flex44">
                        <b-input-group size="lg" >
                            <b-input-group-prepend is-text>
                                <b-icon icon="search"></b-icon>
                            </b-input-group-prepend>
                            <b-form-input id="type-text" type="text" v-model="searchName" placeholder="Search card"></b-form-input>
                        </b-input-group>
                    </div>

                    <b-button variant="info" type="submit" class="flex11">
                        {{$t('global.searchByName')}}
                    </b-button>

                    <b-button class="flex11" variant="light" @click.prevent="clearInput()">{{$t('global.clear')}}</b-button>

                </div>
            </form>

                <b-button variant="primary" @click.prevent="sortPokemonList()">{{$t('global.sort')}}</b-button>

            <br><br>  

            <ul role="menubar"
                aria-disabled="false"
                aria-label="Pagination"
                class="pagination b-pagination">
                
                <li
                    role="presentation"
                    aria-hidden="true">

                    <a href="#" @click.prevent="getPrevPokemonList()">
                        <span
                            role="menuitem"
                            aria-label="Go to previous page"
                            aria-controls="my-table"
                            class="page-link">‹ pagina anterior</span>
                    </a>

                </li>                
                    
                <li
                    role="presentation"
                    aria-hidden="true"
                    class="page-item">
                    
                    <a href="#" @click.prevent="getNextPokemonList()">
                        <span 
                            role="menuitem" 
                            aria-label="Go to next page" 
                            aria-controls="my-table"
                            class="page-link">Próxima pagina ›</span> 
                    </a>               
                </li>

            </ul> 

            <Loading v-if="isLoading"/> 

            <PokemonCard class="pokemon-cards-list" :pokemons="pokemons" @checkDetails="checkDetails($event)"/>

        </b-container>

        <div class="carousel-cards">
            <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="4000"
                controls
                background="#ababab"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                >

                <b-carousel-slide v-for="pokemon in pokemons" :key="pokemon.id">
                    <template #img>
                        <img
                            class="d-block img-fluid w-100"
                            :src="pokemon.imageUrl"
                            :alt="pokemon.name"
                        >
                    </template>
                </b-carousel-slide>

            </b-carousel>

        </div>
    </div>

</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue'
import Loading from '@/components/Loading.vue'
import { mapGetters, mapActions } from 'vuex'

export default {

    name: 'Home',

    components: {
        PokemonCard,
        Loading,
    },

    computed: {
        ...mapGetters([
            'isLoading'
        ]),

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
            sort: "ASC",
            slide: 0,
            sliding: null,
            paginationStatus: "pageRandom",
            pageRandom: 1,        
            pageSearch: 1,        

        }
    },

    methods: {
        ...mapActions([
            'setLoading'
        ]),      

        clearInput() {
            this.searchName = "";

            this.pageRandom = 1,        
            this.pageSearch = 1,  
            this.getPokemonList()
        },

        onSlideStart() {
            this.sliding = true
        },

        onSlideEnd() {
            this.sliding = false
        },

        getPokemonListbyName() {
            this.paginationStatus = "pageSearch"
            this.getPokemonList();
        },

        getNextPokemonList(){

            if ( this.searchName == null || this.searchName == "") {
                this.pageRandom += 1;
                this.paginationStatus = "pageRandom"
            } else {
                this.pageSearch += 1;
                this.paginationStatus = "pageSearch"
            }

            this.getPokemonList()
        },

        getPrevPokemonList(){

            if ( this.searchName == null || this.searchName == "") {
                if (this.pageRandom >= 1) {
                    this.pageRandom -= 1;
                    this.paginationStatus = "pageRandom"
                }
            } else {
                if (this.pageSearch >= 1) {
                    this.pageSearch -= 1;
                    this.paginationStatus = "pageSearch"
                }
            }

            this.getPokemonList()
        },

        getPokemonList() {

            console.log(this.paginationStatus);
            
            var params;

            if ( this.paginationStatus == "pageSearch") {
                params = {
                    page: this.pageSearch,
                    pageSize: 10,
                    name: this.searchName             
                }           
            } 

            if ( this.paginationStatus == "pageRandom") {
                params = {
                    page: this.pageRandom,
                    pageSize: 10,
                }
            }

            console.log('params:::', params);
           
            this.$emit('searchList', params);
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

    .flex{
        display: flex;
        justify-content: space-between;
    }

    .flex11 {
        flex: 1;
        margin: 5px;
    }

    .flex44 {
        flex: 4;
        margin: 5px;
    }

    .pagination{
        justify-content: center;
    }

    .col-sm{
        margin-bottom: 50px;
        max-width: 278px !important;
    }

    .carousel-cards{
        display: none;
    }

    .pokemon-cards-list{
        display: block;
    }

    @media only screen and (max-width: 768px) {

        .carousel-cards{
            display: block;
        }
    
        .pokemon-cards-list{
            display: none;
        }

        .flex{
            display: block;
        }

    }


    
</style>
