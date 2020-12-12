<template>
    <div class="historic">

        <h1>Histórico</h1>
        <br>

        <b-container v-if="pokemonInfo"> 
            <PokemonCard class="pokemon-cards-list" :pokemons="pokemonInfo" @checkDetails="checkDetails($event)"/>        
        </b-container>

        <p v-if="msgEmpty">{{msgEmpty}}</p>              

    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import PokemonCard from '@/components/PokemonCard.vue'

export default {

    name: 'Historic',

    components: {
        PokemonCard
    },
    
    computed: {
        ...mapGetters([
            'pokemonIds'
        ])

    },

    data () {
        return {
            pokemonInfo: null,
            msgEmpty: false,
        }
    },

    mounted() {
        this.SelectedPokemonId();
        
    },

    methods: {

        SelectedPokemonId: async function(){
            console.log('pokemonIds: ', this.pokemonIds);

            var pokemonIdsQueryString;

            console.log(this.pokemonIds);

            this.pokemonIds.forEach( e => {
                pokemonIdsQueryString += "|" + e;
            });

            if (typeof pokemonIdsQueryString == "undefined") {
                this.msgEmpty = "*Não há historico. Você ainda não visitou nenhuma carta.*"
                return;
            }

            console.log('pokemonIdsQueryString: ', typeof pokemonIdsQueryString);

            var params = {
                id: pokemonIdsQueryString              
            }

            try{
                const response = await axios.get(`/cards`, {params});
                console.log('resp: ',response.data.cards);
                this.pokemonInfo = response.data.cards;

            } catch (error) {
                console.log(error);
            }
        },

        checkDetails( pokemonId ) {
            this.$emit('checkDetails', pokemonId)
        } 


    }




}

</script>


<style >

    #weakness {
        width: 93px;
        height: 93px;
        background: url(/img/weakness.619dbf43.png) -254px -27px;
    }


</style>
