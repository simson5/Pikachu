import {ApiService} from './ApiService';

export class DeckService {
    urlBase;
    apiService;

    constructor(urlBase) {
        this.urlBase = urlBase;
        this.apiService = new ApiService(this.urlBase);
    }

    getUrl() {
        return this.baseUrl;
    }

    getApiService() {
        return this.apiService;
    }

    async getDeck() {
        return await this.apiService.getCards("");
    }

    async getDeckById(id) {
        let deck = await getDeck();
        return {
            "idUser": deck[id].idUser,
            "name": deck[id].name,
            "cards": deck[id].cards,
            "id": deck[id].id
        }
    }

    addDeck(deck) {
        return this.apiService.postCards(deck, "POST", "");
    }

    // id est en caractere
    // card est un JSON
    addCardInDeck(card, id) {
        return this.apiService.postCards(card, "PUT", id);
    }
}