<template>
  <div id="app">
    <div id="nav">


        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      987987987987987
    </div>
    <div class="carousel-item">
      kjhkjhkjhkjh
    </div>
    <div class="carousel-item">
      000000000000000000
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
      <a href="#" @click.prevent="setLanguage('en')">en</a> <br>
      <a href="#" @click.prevent="setLanguage('br')">pt</a><br>
      {{$t('auth.recover_password')}}<br><br><br><br>

      <a href="#" @click.prevent="getPokemonList()">{{ this.url }}</a><br><br><br><br>

      <input type="text" v-model="inputText">

      {{ inputText }}
      

      <a href="#" @click.prevent="getPokemonByName()">Buscar por nome</a>

      <br><br><br><br>

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>

      <br><br><br>


      {{ pokemons }}
    </div>
    <router-view/>


  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
// import ApiService from './services/api.service'

export default {

    data() { 
        return { 
            url: process.env.VUE_APP_TESTE,
            inputText: null,
            pokemons: null,
            dismissSecs: 10,
        dismissCountDown: 0,
        showDismissibleAlert: false
        }
    },

    methods: {

        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },

        setLanguage( locale ) {
            Vue.i18n.set( locale )
        },

        getPokemonList: async function() {

            var params = {
                page: 1,
                pageSize: 1000,
                supertype: 'pokemon'                
            }

            try {
                const response = await axios.get('/cards', {params});

                console.log(response);
                this.pokemons = response.data.cards;

            } catch (error) {
                console.error(error);
            }


        },

        getPokemonByName: async function() {

            var params = {
                page: 1,
                pageSize: 1000,
                name: this.inputText                
            }

            try{
                const response = await axios.get(`/cards`, {params});
                console.log(response);
                this.pokemons = response.data.cards;

            } catch (error) {
                console.log(error);
            }


        },
               
    }


}
</script>

<style lang="scss">
// @import './assets/styles/variables';
@import './assets/styles/bootstrap';
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss';

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
