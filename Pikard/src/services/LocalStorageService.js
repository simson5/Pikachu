export class LocalStorageService {
  static getItem(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }

  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  constructor() {
    this.localStorageKey = "pikachu";
  }

  getLocalStorageCards() {
    return JSON.parse(window.localStorage.getItem(this.localStorageKey)) || [];
  }

  setLocalStorageCards(card) {
    console.log(card, "cart");
    let data = this.getLocalStorageCards();
    let existingCard = data.find(item => item.id === card.id);
    console.log(existingCard, "existe ou pas");

    if (existingCard) {
      existingCard.occ += 1;
      Object.assign(existingCard, card);
    } else {
      card.occ = 1;
      data.push(card);
    }
    
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    this.localStorageCards = data; // Update local copy
  }
}
