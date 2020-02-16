var incr_id = 0;
const FILMS = new Map();
module.exports = class Movie{
    constructor(titre, real, annee, synopsys, genre, note, image){
        this.id = incr_id++;
        this.titre = titre;
        this.realisateur = {
            nom : real.nom,
            prenom : real.prenom,
            nationalite : real.nationalite
        };
        this.annee = annee;
        this.image = image;
        this.genre = genre;
        this.synopsys = synopsys;
        this.note = note;
        FILMS.set(this.id,this);
    }

    static all(){
        return Array.from(FILMS.values());
    }

    static getMovie(id){
        return FILMS.get(Number(id));
    }

    static supprMovie(id){
        return FILMS.delete(Number(id));
    }

}