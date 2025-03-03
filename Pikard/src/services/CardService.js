import { ApiService } from "./ApiService";

export class CardService {
    baseUrl;
    apiService;

    constructor(url) {
        this.baseUrl = url;
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
}