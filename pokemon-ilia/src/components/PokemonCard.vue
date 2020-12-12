<template>

    <b-container class="bv-row" v-if="pokemons">
        <b-row>
            <b-col v-for="pokemon in pokemons" :key="pokemon.id" sm>

                    <img :src="pokemon.imageUrl" :alt="pokemon.name">

                    <div class="container-card">
                    
                    <img id="types" :class="strengthSprite(pokemon.types, true)" src="https://www.w3schools.com/css/img_trans.gif" width="1" height="1">
                    <h3 class="title">{{pokemon.name}} <span>({{pokemon.id}})</span></h3>
                    </div>

                    
                    <b-button variant="outline-primary" @click.prevent="checkDetails(pokemon.id)">
                        {{$t('global.checkDetail')}}
                    </b-button>              
            </b-col>
        </b-row>
    </b-container>

</template>

<script>

export default {
    name: 'PokemonCard',

    props: {
        pokemons: {
            type: Array,
            default: null
        }
    },

    methods: {

        checkDetails( pokemonId ){
            this.$emit("checkDetails", pokemonId)
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

<style scoped lang="scss">

    .container-card{
        display: flex;
        margin-top: -40px;
    }

    .bv-row{
        color: white
    }

    #types {
        min-width: 93px;
        min-height: 93px;
        border-radius: 100%;
        margin-right: 15px;
    }

    .title {

        span{
            font-size: 12px
        }
    }

    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    
</style>


