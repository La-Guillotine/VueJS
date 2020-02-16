<template> 
    <v-content>
        <v-row justify="center" align="center">
            <v-col cols="12" md="12" justify="center" align="center">
            <h2><b>Editer un film</b></h2>
            </v-col>
            <v-col cols="12"  md="4">
                <u>Titre du film : </u><v-text-field v-model="movie.titre"></v-text-field>
                <u>Réalisateur : </u>
                    <v-text-field label="Nom" v-model="movie.realisateur.nom"></v-text-field>
                    <v-text-field label="Prénom" v-model="movie.realisateur.prenom"></v-text-field>
                    <v-text-field label="Nationalité" v-model="movie.realisateur.nationalite"></v-text-field>
                <u>Année de Sortie : </u><v-text-field v-model="movie.annee"></v-text-field>
                <u>Genre du film : </u><v-text-field v-model="movie.genre"></v-text-field>
                <u>Lien du poster : </u><v-text-field v-model="movie.image"></v-text-field>
                <u>Synopsis : </u><v-text-field label="Un scénario ? Pour quoi faire ? #MickaëlBay" v-model="movie.synopsys"></v-text-field>
                <u>Note du film : </u><v-text-field type="number" min="0" max="5" v-model="movie.note"></v-text-field>
                <v-btn small color="success" v-on:click="editMovie()">Valider modifications</v-btn>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
import axios from 'axios';
import router from '../main'

export default {
  name: 'EditMovie',
  data(){
    return{
        message:"Mon film",
        shared_data: window.shared_data,
        movie:window.shared_data.movies.filter(m => m.id == this.$route.params.id)[0]
    }
  },
  methods:{
        editMovie(){
            axios.post(`http://localhost:8080/api/movies/${this.movie.id}`, this.movie).then(res => {
                this.$router.push('/');
            }).catch(console.error);
        }
    }
}
</script>

<style>
li{
    margin-right : 15px;
    list-style-type: none;
}
router-link a{
    text-decoration-style: none;
}

</style>