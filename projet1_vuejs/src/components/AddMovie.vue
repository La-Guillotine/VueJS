<template> 
    <v-content>
        <v-row justify="center" align="center">
            <v-col cols="12" md="12" justify="center" align="center">
            <h2><b>Ajouter un film</b></h2>
            </v-col>
            <v-col cols="12"  md="4">
                <u>Titre du film : </u><v-text-field v-model="m.title"></v-text-field>
                <u>Réalisateur : </u>
                    <v-text-field label="Nom" v-model="m.realisateur.nom"></v-text-field>
                    <v-text-field label="Prénom" v-model="m.realisateur.prenom"></v-text-field>
                    <v-text-field label="Nationalité" v-model="m.realisateur.nationalite"></v-text-field>
                <u>Année de Sortie : </u><v-text-field v-model="m.year"></v-text-field>
                <u>Genre du film : </u><v-text-field v-model="m.genre"></v-text-field>
                <u>Lien du poster : </u><v-text-field v-model="m.image"></v-text-field>
                <u>Synopsis : </u><v-text-field label="Un scénario ? Pour quoi faire ? #MickaëlBay" v-model="m.synopsys"></v-text-field>
                <u>Note du film : </u><v-text-field type="number" min="0" max="5" v-model="m.note"></v-text-field>
            <v-btn color="success" v-on:click="addMovie()">Ajouter le film</v-btn>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
import axios from 'axios';
import router from '../main'

export default {
  name: 'AddMovie',
  data(){
    return{
        m:{
          title:"",
          realisateur:{nom:"",prenom:"",nationalite:""},
          year:"",
          image:"",
          synopsys:"",
          genre:"",
          note:""
      },
    }
  },
  methods:{
        addMovie(){
            axios.post(`http://localhost:8080/api/movies`, this.m).then(res => {
                this.$router.push('/');
            }).catch(console.error);
        }
    }
}
</script>