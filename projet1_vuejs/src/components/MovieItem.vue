<template>
    <v-content justify="center" align="center">
        <v-content>
            <li><b>{{movie.titre}}</b> - <i>{{movie.annee}}</i> - {{movie.genre}}<br/>
                <small> {{movie.realisateur.prenom}} {{movie.realisateur.nom}} - {{movie.synopsys}}.</small><br/>
                {{movie.note}}<b>/5</b>
            </li>
            <a v-if="movie.image" :href="movie.image" target="_new"><img v-bind:src=movie.image alt="image" /></a>
        </v-content>
        <v-content align="center">
            <v-btn small color="error" v-on:click="suppFilm">Retirer le film</v-btn>
            <router-link v-bind:to="`/EditMovie/${movie.id}`">
                <v-btn small color="info">Editer</v-btn><!-- v-on:click="editFilm"-->
            </router-link>
        </v-content>
    </v-content>
</template>

<script>

export default {
  name: 'MovieItem',
  props: {
    movie: Object
  },
  data(){
    return{
        message:"Mon film",
        shared_data: window.shared_data
    }
  },
  methods:{
    suppFilm(){
        this.$emit("remove");
    },
    valModif(){
        this.movie.edition = false;
    }
  }
}
</script>

<style>
li{
    margin-right : 15px;
    list-style-type: none;
}

img{
    object-fit: cover;
    width:30vw;
    height:40vh;
    border-radius:5px;
}

</style>