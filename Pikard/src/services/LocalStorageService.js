export class LocalStorageService {
    localStorageKey;
    localStorageCards;

    constructor() {
        this.localStorageKey = "pikachu";
    }

    getLocalStorageCards() {
        return JSON.parse(window.localStorage.getItem(this.localStorageKey)) || [];
    }

    setLocalStorageCards(cards) {
        let data = this.getLocalStorageCards();
        for (let i = 0; i < cards.length; i++) {
          let card = cards[i];
          let existingCard = data.find(item => item.id === card.id);
          if (existingCard) {
            existingCard.occ += 1;
            Object.assign(existingCard, card);
          } else {
            card.occ = 1;
            data.push(card);
          }
        }
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(data));
        this.localStorageCards = data; // Update the local copy
    }
}  