<template>
    <div class="details">
        <h1>{{$t('global.detail')}}</h1>
        <br>
        <b-container v-if="pokemonInfo"> 

            <b-card no-body class="overflow-hidden">
                <b-row no-gutters class="justify-content-md-center">

                    <b-col md="4">
                        <Loading v-if="isLoading"/> 

                        <b-card-img :src="pokemonInfo.imageUrlHiRes" :alt="pokemonInfo.name" class="rounded-0"></b-card-img>
                    </b-col>

                    <b-col md="4">
                    <b-card-body>

                        <div class="title-card">
                            <img id="types" :class="strengthSprite(pokemonInfo.types, true)" src="@/assets/img_trans.gif" width="1" height="1">
                            
                            <h2>{{pokemonInfo.name}}</h2> <br>
                            <span>({{pokemonInfo.id}})</span>                            
                            <br>
                        </div>
                        
                        <b-card-text class="card-text">
                            <!-- types: {{pokemonInfo.types}}<br> -->

                            <div v-if="pokemonInfo.resistances">
                                <h2>Resistencia</h2>
                                <img id="resistance" :class="strengthSprite(pokemonInfo.resistances)" src="@/assets/img_trans.gif" width="1" height="1">
                                <span>{{pokemonInfo.resistances[0].value}}</span>
                            </div>

                            <div v-if="pokemonInfo.weaknesses">
                                <h2>weaknesses</h2>
                                <img id="weakness" :class="strengthSprite(pokemonInfo.weaknesses)" src="@/assets/img_trans.gif" width="1" height="1">
                                <span>{{pokemonInfo.weaknesses[0].value}}</span>
                            </div>

                            <b-button v-b-modal.modal-1>Attacks</b-button>

                        </b-card-text>
                    </b-card-body>
                    </b-col>
                </b-row>
            </b-card>

        </b-container>

        <div v-if="pokemonInfo">
            <b-modal id="modal-1" :title="pokemonInfo.name" hide-footer>
                <ul>
                    <li v-for="attack in pokemonInfo.attacks" :key="attack.name">
                        <h3>{{attack.name}}</h3>
                        <div class="flex">
                            <p>Mana: {{attack.convertedEnergyCost}}</p>
                            <p>Dano: {{attack.damage}}</p>
                        </div>
                        <p>{{attack.text}}</p>
                        <hr>
                    </li>
                </ul>
            </b-modal>
        </div>


    </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/Loading.vue'

import { mapGetters, mapActions } from 'vuex'

export default {

    name: 'Details',

    components: {
        Loading,
    },
    
    props: {

        pokemonId: {
            type: String,
            default: null
        },

    },

    computed: {
        ...mapGetters([
            'pokemonIds',
            'isLoading'
        ]),

        pokemonIds() {
            return this.$store.getters[ 'pokemonIds']
        }

    },

    data () {
        return {
            pokemonInfo: null,

        }
    },

    mounted() {
        this.SelectedPokemonId();
        this.saveIdPokemon(this.pokemonId);
        
    },



    methods: {
        ...mapActions([
            'setLoading'
        ]),

        saveIdPokemon( pokemonId ){
            this.$store.commit( 'addPokemonIdToArray', pokemonId );
        },

        SelectedPokemonId: async function(){

            this.setLoading(true);

            var params = {
                id: this.pokemonId                
            }

            try{
                const response = await axios.get(`/cards`, {params});
                this.pokemonInfo = response.data.cards[0];
                this.setLoading(false);

            } catch (error) {
                console.log(error);
            }
        },

        strengthSprite( typeOf , himselfType = false) {

            var type = typeOf[0].type

            if ( himselfType ) {
                type = typeOf[0];
            }

            switch (type) {
                case 'Colorless':
                    return 'colorless';
                case 'Fire':
                    return 'fire';
                case 'Darkness':
                    return 'darkness';
                case 'Metal':
                    return 'metal';
                case 'Dragon':
                    return 'dragon';
                case 'Fairy':
                    return 'fairy';
                case 'Fighting':
                    return 'fighting';
                case 'Grass':
                    return 'grass';
                case 'Lightning':
                    return 'lightning';
                case 'Psychic':
                    return 'psychic';
                case 'Water':
                    return 'water';
                default:
                    return 'No';
            }
        },
    }

}

</script>


<style lang="scss">

    #modal-1{
        color: black;

        ul{
            list-style: none;
            padding-left: 0;
        }
    }

    .flex{
        display: flex;    

    }

    .card {
        border: none;
        background-color: transparent;
    }

    .card-body {
        text-align: left;
    }

    .title-card{
        display: flex;
        align-items: center;

        span{
            margin-left: 10px;
        }
    }  


</style>
