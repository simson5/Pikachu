export class ApiService {
    baseUrl;

    constructor(url) {
        this.baseUrl = url;
    }

    // truc pour completer l'url
    // ca peut etre plusieur ou un seul donc foudra preciser avec id 
    async getPikas(truc) {
        //console.log(this.baseUrl+truc);
        const reponse = await fetch(this.baseUrl+truc);

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }

        const pikas = await reponse.json();
        //console.log(pikas);
        return pikas;
    }

    // pika = {} un JSON
    // truc pour completer l'url
    async postPikas(pika, mth, truc) {
        console.log(this.baseUrl+truc);
        const reponse = await fetch(this.baseUrl+truc, {
             method: mth,
             headers: {"Content-Type": "application/json"}, 
             body: JSON.stringify(pika)
            });

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        
        const pikas = await reponse.json();
        console.log(pikas);
        return pikas;
    }

    // // truc va comprendre un id precise aussi pour identifier
    // async putPikas(pika, truc) {
    //     console.log(this.baseUrl+truc);
    //     const reponse = await fetch(this.baseUrl+truc, {
    //          method: "PUT",
    //          headers: {"Content-Type": "application/json"}, 
    //          body: JSON.stringify(pika)
    //         });

    //     if (!reponse.ok) {
    //         throw new Error(`Erreur HTTP : ${reponse.status}`);
    //     }
        
    //     const pikas = await reponse.json();
    //     console.log(pikas);
    //     return pikas;
    // }

    
    // truc va comprendre un id precise aussi pour identifier
    async deletePikas(truc) {
        console.log(this.baseUrl+truc);
        const reponse = await fetch(this.baseUrl+truc, { method: "DELETE" });

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        
        const pikas = await reponse.json();
        console.log(pikas);
        return pikas;
    }

}