<template>
    <div class="details">
        <h1>DETALHES</h1>
        <br>
        <b-container v-if="pokemonInfo"> 

            <b-card no-body class="overflow-hidden">
                <b-row no-gutters>
                    <b-col md="6">
                    <b-card-img :src="pokemonInfo.imageUrlHiRes" :alt="pokemonInfo.name" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                    <b-card-body :title="pokemonInfo.name">
                        <b-card-text>
                            id: {{pokemonInfo.id}}<br>

                            <img id="types" :class="strengthSprite(pokemonInfo.types, true)" src="https://www.w3schools.com/css/img_trans.gif" width="1" height="1">
                            types: {{pokemonInfo.types}}<br>

                            <div v-if="pokemonInfo.resistances">
                                <img id="resistance" :class="strengthSprite(pokemonInfo.resistances)" src="https://www.w3schools.com/css/img_trans.gif" width="1" height="1">
                                Resistencia: {{pokemonInfo.resistances}}<br>
                            </div>

                            <img id="weakness" :class="strengthSprite(pokemonInfo.weaknesses)" src="https://www.w3schools.com/css/img_trans.gif" width="1" height="1">
                            weaknesses: {{pokemonInfo.weaknesses}}<br>
                            <br>

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
                        <p>Mana: {{attack.convertedEnergyCost}}</p>
                        <p>Nome: {{attack.name}}</p>
                        <p>Dano: {{attack.damage}}</p>
                        <p>Descrição: {{attack.text}}</p>
                    </li>
                </ul>
                <p class="my-4">Hello from modal!</p>
            </b-modal>
        </div>


    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {

    name: 'Details',
    
    props: {

        pokemonId: {
            type: String,
            default: null
        },

    },

    computed: {
        ...mapGetters([
            'pokemonIds'
        ]),

        pokemonIds() {
            console.log('this.$store.getterspokemonIds', this.$store.getters[ 'pokemonIds']);
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
            // 'decrement',
        ]),

        saveIdPokemon( pokemonId ){
            this.$store.commit( 'addPokemonIdToArray', pokemonId );
        },

        SelectedPokemonId: async function(){

            var params = {
                id: this.pokemonId                
            }

            try{
                const response = await axios.get(`/cards`, {params});
                this.pokemonInfo = response.data.cards[0];

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


<style >

    



</style>
