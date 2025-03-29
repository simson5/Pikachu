import { ApiService } from "./ApiService";

export class CardService {
    baseUrl;
    apiService;

    constructor(url) {
        this.baseUrl = url || "https://api.tcgdex.net/v2/fr/cards";
        this.apiService = new ApiService(this.baseUrl);
    }

    getApiService() {
        return this.apiService;
    }

    async getCards() {
        return await this.apiService.getCards("");
    }

    async getCard(id) {
        return await this.apiService.getCards(id);
    }

    async getCardsByName(valeur) {
        //console.log(name.name);
        if (valeur.length>4){
            return await this.apiService.getCards("?name=like:"+valeur);
        }
        else{
            return null;
        }
    }
}