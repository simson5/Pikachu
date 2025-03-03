import { ApiService } from "./ApiService";
import { CardService } from "./CardService";

export class BoosterGeneratorService {
    setUrl;
    cardUrl;
    apiService;
    cardService

    constructor(urlSet, urlCard) {
        this.setUrl = urlSet;
        this.cardUrl = urlCard;
        this.apiService = new ApiService(this.setUrl);
        this.cardService = new CardService(this.cardUrl);
    }

    getApiService() {
        return this.apiService;
    }

    getUrl() {
        return this.baseUrl;
    }

    async generateBooster(id) {
        let set = await this.apiService.getCards(id);
        let cardsRare = [];
        let cardsUncommon = [];
        let cardsCommon = [];
        let booster = [];
        for (let i = 0; i<set.cards.length; i++) {
            let r = await this.getRarity(set.cards[i].id);
            if (r === "Rare"){
                cardsRare.push(set.cards[i]);
            }
            else if (r === "Commune") {
                cardsCommon.push(set.cards[i]);
            }
            else if (r === "Peu Commune"){
                cardsUncommon.push(set.cards[i]);
            }
            else if (r === "Ultra Rare"){
                cardsRare.push(set.cards[i]);
            }
            else {
                console.log(r ,"erreur MIMOMAMO");
            }
        }

        booster.push(this.randomGenerator(cardsCommon,6));
        booster.push(this.randomGenerator(cardsUncommon,3));
        booster.push(this.randomGenerator(cardsRare,1));        
        console.log(booster);
        return booster.flat();
    }

    async getRarity(i) {
        let rarity = await this.cardService.getCard(i);
        return rarity.rarity;
    }

    // certians set n'ont pas des cartes de toutes les raretés
    randomGenerator(r,nb) {
        // entre 0 et nb
        let boo = [];
        for (let i = 0; i < nb; i++) {
            const random_number = Math.floor(Math.random() * r.length);
            boo.push(r[random_number]);
        }
        return boo;
    }
}