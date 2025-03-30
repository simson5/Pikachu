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
    let data = this.getLocalStorageCards(this.localStorageKey);
    console.log(data, "data");
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

  setLocalStorageCardsWithOutOcc(localStorageKey, card) {
    let data = this.getLocalStorageCards(localStorageKey);
    Object.assign(data, card);
    window.localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  removeLocalStorageCards(localStorageKey) {
    window.localStorage.setItem(localStorageKey, JSON.stringify([]));
  }

  searchCards(localStorageKey, searchTerm) {
    let data = this.getLocalStorageCards(localStorageKey);

    let byId = data.filter(item => item.id.toString().includes(searchTerm));

    console.log(searchTerm, "searchTerm");
    let byName = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    let combinedResults = [...byId, ...byName];

    combinedResults = combinedResults.filter((value, index, self) => 
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    );

    console.log(combinedResults, "combinedResults");
    return combinedResults;
}
}
