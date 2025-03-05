import { ApiService } from "./ApiService";
import { CardService } from "./CardService";

export class BoosterService {
    urlBase;
    apiService;

    constructor(urlBase) {
        this.urlBase = urlBase;
        this.apiService = new ApiService(this.urlBase);
    }

    getApiService() {
        return this.apiService;
    }

    getUrl() {
        return this.baseUrl;
    }

    async getBoosters(){
        return await this.apiService.getCards("");
    }

    async getRandomCard(id) {
        let set = await this.apiService.getCards("");
        console.log(set);
        return this.randomGenerator(set[id-1].cards);
    }

    // certians set n'ont pas des cartes de toutes les raretés
    randomGenerator(r) {
        // entre 0 et nb
        const random_number = Math.floor(Math.random() * r.length);
        return r[random_number];
    }
}