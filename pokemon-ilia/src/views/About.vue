<template>
  <div class="about">
    <h1>{{$t('global.credits')}}</h1>

    <div id="authors">

        <b-row>
            <b-col sm>
                <div class="author">
                    <img class="pokemon-credits turtle" src="@/assets/img_trans.gif" width="1" height="1">
                </div> 

                <b-card
                    title="Turtle (Design UX)"
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 pokemon-credits"
                >
                    <b-card-text>
                        Com suas habilidades indescritiveis em layoutar paginas focando na experiência do usuário.
                    </b-card-text>

                </b-card> 

            </b-col>
            <b-col sm>
                <div class="author">
                    <img class="pokemon-credits charmander" src="@/assets/img_trans.gif" width="1" height="1">
                </div>    

                <b-card
                    title="Charmander (FrontEnd)"
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 pokemon-credits"
                >
                    <b-card-text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </b-card-text>

                </b-card> 

            </b-col>
            <b-col sm>
                <div class="author">
                    <img class="pokemon-credits bubassauro" src="@/assets/img_trans.gif" width="1" height="1">
                </div> 

                <b-card
                    title="Bubassauro (BackEnd)"
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 pokemon-credits"
                >
                    <b-card-text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </b-card-text>

                </b-card>                            
            </b-col>
            <b-col sm>
                <div class="author">
                    <img class="pokemon-credits pikachu" src="@/assets/img_trans.gif" width="1" height="1">
                </div> 

                <b-card
                    title="Pikachu (P.O.)"
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 pokemon-credits"
                >
                    <b-card-text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </b-card-text>

                </b-card>                            
            </b-col>
        </b-row>

    </div>


  </div>
</template>

<script>

export default{

}

</script>

<style lang="scss">

  #authors{
    display: flex;
    justify-content: center;
    align-items: center;

    .author{
        background-color: white;
        margin: 0 20px;
        border-radius: 15%;
    }


  }

</style>
