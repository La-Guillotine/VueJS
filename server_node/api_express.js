const Movie = require('./movies');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

new Movie('Titanic', {nom:'Cameron',prenom:'James', nationalite:'Royaume-Uni'}, "1998", 'Le bateau coule OMG !!!','Historique',4,'https://img.over-blog-kiwi.com/1/04/49/45/20181026/ob_6c1a3f_titanic-via-encyclopedia-titanica-2.jpg');
new Movie('Interstellar', {nom:'Dolan',prenom:'Christopher', nationalite:'Etats-Unis'}, "2014", 'Un fucking trou noir de ses morts','Science-Fiction',3,'https://www.telerama.fr/sites/tr_master/files/styles/sheet_illustration_625/public/assets/related_links/73554/74469955_525944.jpg?itok=Yl8qbnpm');
new Movie('Assurancetourix', {nom:'B',prenom:'A', nationalite:'France'}, "2020", 'Il chante et ça fait mal','Humour',3, "https://i.ytimg.com/vi/PDMPYJCTLAY/maxresdefault.jpg");

app.use(bodyParser.json()) //parse JSON body
app.use(bodyParser.urlencoded()) //parse x-www-form-urlencoded body
app.use('/static', express.static('folder/of/static/files'));

app.use((req, res, next) => {
    console.log(new Date());
    console.log(req.path);
    console.log(req.body);
    next();
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname,'./index.html')));
app.get('/foo/:myVar', (req, res) => res.send(req.params.myVar));
app.post('/add', (req, res) => res.send("" + (Number(req.body.foo) + Number(req.body.bar))));

app.use("/api", (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/api/movies/all', (req, res) => res.send(Movie.all()));
app.get('/api/movies/:id', (req, res) => res.send(Movie.getMovie(req.params.id)));
app.post('/api/movies/:id', (req, res) => {
    let movie = Movie.getMovie(req.params.id);
    console.log(req.body.realisateur);
    if(movie){
        if(req.body.title) movie.titre = req.body.title;
        if(req.body.realisateur) movie.realisateur = req.body.realisateur;
        if(req.body.year) movie.annee = req.body.year;
        if(req.body.image) movie.image = req.body.image;
        if(req.body.synopsys) movie.synopsys = req.body.synopsys;
        if(req.body.genre) movie.genre = req.body.genre;
        if(req.body.note) movie.note = req.body.note;
        res.send(movie);
    }
    else{
        res.send('Film Introuvable');
    }
});
app.post('/api/movies', (req, res) => {
    new Movie(req.body.title, req.body.realisateur, req.body.year, req.body.synopsys,
        req.body.genre,req.body.note,req.body.image); 
    res.send(Movie.all());
});
app.delete('/api/movies/:id', (req, res) => {
    let destroy = Movie.supprMovie(req.params.id);
    res.send(destroy);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));