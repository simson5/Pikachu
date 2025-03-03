export class LocalStorageService {
    localStorageKey;
    localStoragePikas;

    constructor() {
        this.localStorageKey = "pookie";
    }

    getLocalStoragePikas() {
        return JSON.parse(window.localStorage.getItem(this.localStorageKey)) || [];
    }

    setLocalStoragePikas(pikas) {
        let data = this.getLocalStoragePikas();
        for (let i = 0; i < pikas.length; i++) {
          let pika = pikas[i];
          let existingPika = data.find(item => item.id === pika.id);
          if (existingPika) {
            existingPika.occ += 1;
            Object.assign(existingPika, pika);
          } else {
            pika.occ = 1;
            data.push(pika);
          }
        }
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(data));
        this.localStoragePikas = data; // Update the local copy
    }
}  