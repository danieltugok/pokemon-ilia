<template>
    <div class="details">
        <HelloWorld msg="Bem-vindo"/>


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
                            types: {{pokemonInfo.types}}<br>
                            Resistencia: {{pokemonInfo.resistances}}<br>
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
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {

    name: 'Details',

    components: {
        HelloWorld
    },
    
    props: {

        pokemonId: {
            type: String,
            default: null
        },

    },

    data () {
        return {
            pokemonInfo: null,

        }
    },

    mounted() {
        this.SelectedPokemonId();
        
    },

    methods: {
        SelectedPokemonId: async function(){
            console.log('PokemonId: ', this.pokemonId);

            var params = {
                id: this.pokemonId                
            }

            try{
                const response = await axios.get(`/cards`, {params});
                this.pokemonInfo = response.data.cards[0];

            } catch (error) {
                console.log(error);
            }


        }
    }




}

</script>


<style >


</style>
