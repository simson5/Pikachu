export class LocalStorageService {
  //localStorageCards;

  constructor() {}

  getLocalStorageCards(localStorageKey) {
      return JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
  }

  setLocalStorageCards(localStorageKey, card) {
    console.log(card, "cart");
    let data = this.getLocalStorageCards(localStorageKey);
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
    console.log(data, "data after");
    window.localStorage.setItem(localStorageKey, JSON.stringify(data));
    // let savedData = JSON.parse(window.localStorage.getItem(localStorageKey));
    // console.log(savedData, "blabla");
    //this.localStorageCards = data; // Update the local copy
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