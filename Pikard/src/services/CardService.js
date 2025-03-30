import { ApiService } from "./ApiService";

export class CardService {
  baseUrl;
  apiService;

  constructor(url) {
    this.baseUrl = url || "https://api.tcgdex.net/v2/fr/cards/";
    this.apiService = new ApiService(this.baseUrl);
  }

  getApiService() {
    return this.apiService;
  }

  async getCards(page = 1, cardsPerPage = 10) {
    const url = `?pagination:page=${page}&pagination:itemsPerPage=${cardsPerPage}`;
    return await this.apiService.getCards(url);
  }

  async getCardsByName(name) {
    const url = `?name=like:${name}`;
    return await this.apiService.getCards(url);
  }

  async getCard(id) {
    const url = `${id}`;
    return await this.apiService.getCards(url);
  }
}
