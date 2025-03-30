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
        return this.urlBase;
    }

    getApiService() {
        return this.apiService;
    }

    async getDeck() {
        try {
            const response = await fetch(`${this.urlBase}`, {
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
        let decks = await this.getDeck();
        let cardDeck = [];
    
        let deck = decks.find(d => d.id == id);
        if (!deck) {
            console.error(`Aucun deck trouvé avec l'ID: ${id}`);
            return null;
        }
    
        for (let cardId of deck.cards) {
            console.log(cardId, "carte trouvée dans le deck");
            let fullCard = await this.cardService.getCard("/" + cardId);
            cardDeck.push(fullCard);
        }
    
        console.log(cardDeck, "Cartes du deck");
    
        return {
            idUser: deck.idUser,
            name: deck.name,
            cards: cardDeck,
            id: deck.id
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