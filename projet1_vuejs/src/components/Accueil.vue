<template>
    <v-content justify="center" align="center">
        <h1>La liste contient {{nbFilms}} films.</h1>
        <v-row justify="center" align="center" class="search">
                <v-col cols="12">
                <h2><b>Recherche : </b></h2>
                </v-col>
                <v-col cols="2" align="center">
                <v-text-field label="Titre du film" single-line v-model="s.titre"></v-text-field>
                </v-col>
                <v-col cols="2">
                <v-text-field label="Réalisateur (Nom)" single-line v-model="s.realisateur.nom"></v-text-field>
                </v-col>
                <v-col cols="2">
                <v-text-field label="Année de Sortie" single-line v-model="s.annee"></v-text-field>
            </v-col>
        </v-row>
        <br/>
        <v-content>
            <router-link v-bind:to="`/AddMovie`">
                <v-btn small color="success">Ajouter un film</v-btn>
            </router-link>
        </v-content>
        <br/>
        <v-content align="center"><h2><b>Liste des Films :</b></h2></v-content>
        <v-content>
            <ul>
                <MovieItem v-for="(m,i) of search" v-bind:key="i" v-on:remove="removeFilm(m.id)" v-bind:movie="m"></MovieItem>
            </ul>
        </v-content>
        <br/>
        
    </v-content>
  
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import MovieItem from './MovieItem.vue';
import axios from 'axios';

export default {
  name: 'accueil',
  components: {
    //HelloWorld,
    MovieItem
  },
  data(){
    return{
      shared_data: window.shared_data,
      movies:window.shared_data.movies,
      counter:0,
      edition:false,
      m:{
          titre:"",
          realisateur:{nom:"",prenom:"",nationalite:""},
          annee:"",
          image:"",
          synopsys:"",
          genre:"",
          note:0,
          edition:"false", 
          display:"false"
      },
      s:{
          titre:"",
          realisateur:{nom:"",prenom:"",nationalite:""},
          annee:""
      }
    }
  },
  methods:{
      increment(){
          this.counter ++;
      },
      removeFilm(i){
          console.log(i);
          axios.delete(`http://localhost:8080/api/movies/${i}`).then(res => {
              console.log("bonsoir");
                this.$router.push('/');
            }).catch(console.error);
      }      
  },
  computed:{
      firstletter(){
          return this.message[0];
      },
      nbFilms(){
          //console.log(this.movies);
          return this.movies.length;
      },
      search(){
          return this.movies.filter(m => m.titre.toLowerCase().includes(this.s.titre.toLowerCase()))
          .filter(m => m.annee.includes(this.s.annee))
          .filter(m => m.realisateur.nom.toLowerCase().includes(this.s.realisateur.nom.toLowerCase()))
          .sort((m1,m2) => {
              let title1 = m1.titre.toLowerCase();
              let title2 = m2.titre.toLowerCase();
              if(title1 > title2)return 1;
              else if(title1 < title2)return -1;
              else return -1;
          });
      }
  }      
}
</script>

<style scoped>
.form{
  display : flex;
  flex-direction : column;
  margin-left:auto;
  margin-right : auto;
}

a{
    text-decoration:none;
}
</style>
