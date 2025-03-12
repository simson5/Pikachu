export class ApiService {
    baseUrl;

    constructor(url) {
        this.baseUrl = url;
    }

    async getCards(param) {
        const response = await fetch(this.baseUrl+param);

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const cards = await reponse.json();
        console.log(cards, "les cartes recuperees");
        return cards;
    }

    async postCards(card, method, id) {
        console.log(this.baseUrl+id);
        const reponse = await fetch(this.baseUrl+id, {
             method: method,
             headers: {"Content-Type": "application/json"}, 
             body: JSON.stringify(card)
            });

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        
        const cards = await reponse.json();
        console.log(cards);
        return cards;
    }
    
    async deleteCards(id) {
        console.log(this.baseUrl+id);
        const reponse = await fetch(this.baseUrl+id, { method: "DELETE" });

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        
        const cards = await reponse.json();
        console.log(cards);
        return cards;
    }

}