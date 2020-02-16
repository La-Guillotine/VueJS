import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import EditMovieVue from './components/EditMovie.vue';
import AccueilVue from './components/Accueil.vue';
import AddMovieVue from './components/AddMovie.vue';

Vue.config.productionTip = false

Vue.use(VueRouter);
const routes = [
    {path:"/EditMovie/:id", component : EditMovieVue},
    {path:"/", component : AccueilVue},
    {path:"/AddMovie", component:AddMovieVue}
]

const axios = require('axios');
const router = new VueRouter({routes});

window.shared_data = {
  mavariable: 'Test',
  movies: new Map()
}

axios.get('http://localhost:8080/api/movies/all')
.then(res => {
  window.shared_data.movies = res.data;
  new Vue({
    vuetify,
    router,
    render: h => h(App)
  }).$mount('#app');
})
.catch(console.error);



