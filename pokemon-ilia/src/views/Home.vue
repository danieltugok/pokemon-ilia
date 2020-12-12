<template>

    <div>

        <b-container class="home">           
            
            <form v-on:submit.prevent="getPokemonByName()">
                <!-- <b-form-input id="type-text" type="text" v-model="searchName">
                </b-form-input> -->

                <div>
                    <div>
                        <b-input-group size="lg" class="mb-2">
                            <b-input-group-prepend is-text>
                                <b-icon icon="search"></b-icon>
                            </b-input-group-prepend>
                            <b-form-input id="type-text" type="text" v-model="searchName" placeholder="Search card"></b-form-input>
                        </b-input-group>
                    </div>

                    <div>
                        <b-button variant="outline-primary" type="submit">
                            {{$t('global.searchByName')}}
                        </b-button>
                    </div>

                </div>
            </form>

                <b-button variant="primary" @click.prevent="getPokemonList()">{{$t('global.clear')}}</b-button>
                <b-button variant="primary" @click.prevent="sortPokemonList()">{{$t('global.sort')}}</b-button>

            <br><br>        

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

export default {

    name: 'Home',

    components: {
        PokemonCard
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
            sliding: null

        }
    },

    methods: {
        onSlideStart() {
            this.sliding = true
        },
        onSlideEnd() {
            this.sliding = false
        },
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


    @media only screen and (min-width: 768px) {
        .carousel-cards{
            display: none;
        }

        .pokemon-cards-list{
            display: block;
        }
    }

    @media only screen and (max-width: 768px) {
        .carousel-cards{
            display: block;
        }

        .pokemon-cards-list{
            display: none;
        }
    }

    
</style>
