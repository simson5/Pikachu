import {ApiService} from './ApiService';
import {CardService} from './CardService';

export class DeckService {
    urlBase;
    apiService;
    cardService;

    constructor(urlBase) {
        this.urlBase = urlBase;
        this.apiService = new ApiService(this.urlBase);
        this.cardService = new CardService(null);
    }

    getUrl() {
        return this.baseUrl;
    }

    getApiService() {
        return this.apiService;
    }

    async getDeck() {
        try {
            const response = await fetch(`${this.urlBase}/decks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            });
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch decks:", error);
            throw error;
        }
    }

    // cardDeck ce les cartes du deck je les recuperes et au lieu de avoir que id on a tt info sur
    async getDeckById(id) {
        let deck = await this.getDeck();
        let cardDeck=[];
        console.log(id, "id");
        console.log(deck, "deck");
        for (let i = 0; i < deck[id].cards.length; i++) {
            console.log(deck[id].cards[i], "cart ds for");
            cardDeck.push(await this.cardService.getCard("/"+deck[id].cards[i]));
        }
        console.log(cardDeck, "cardDeck");
        
        return {
            "idUser": deck[id].idUser,
            "name": deck[id].name,
            "cards": cardDeck,
            "id": deck[id].id
        };
    }

    addDeck(deck) {
        return this.apiService.postCards(deck, "POST", "");
    }

    // id est en caractere
    // card est un JSON
    addCardInDeck(card, id) {
        return this.apiService.postCards(card, "PUT", id);
    }

    async rechercheCard(name) {
        // mm pas besoin de ca 
        console.log(name._value, "nom de recherch")
        return await this.cardService.getCardsByName(name._value);
    }

    async ajouterDeck(deck) {
        const rep = await this.apiService.postCards(deck, "POST", "");
        console.log(rep, "rep de post");
    }

    async removeDeck(id) {
        const rep = await this.apiService.deleteCards("/"+id);
        console.log(rep, "rep de delete");
    }
}