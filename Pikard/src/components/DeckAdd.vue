<script setup>
import { ref, onMounted } from 'vue';
import { DeckService } from '../services/DeckService.js';
import { LocalStorageService } from '../services/LocalStorageService';
import MonDeck from './MonDeck.vue';

const cards = ref([]);
const deck = ref([]);
const cardName = defineModel();
const localStorageP = new LocalStorageService();
deck.value = localStorageP.getLocalStorageCards("deck");
cards.value = localStorageP.getLocalStorageCards("pikachu");

const deckService = new DeckService("https://67b8eac151192bd378dc35a6.mockapi.io/decks");

const addDeck = async() => {
    //const card = await deckService.rechercheCard(cardName);
    //const card = localStorageP.searchCards("pikachu",cardName._value);
    //cards.value.pop();
    cards.value = localStorageP.searchCards("pikachu",cardName._value);
    console.log(cards.value, "deck avant ajout");
    //cards.value.push(card);
    console.log(cards.value, "deck ajouté");

    
    const inputDeRecherche = document.querySelector(".input-recherche");
    const derulant = document.querySelector(".listDerulant");

    let rect = inputDeRecherche.getBoundingClientRect();

    const compStyles = window.getComputedStyle(inputDeRecherche);

    console.log(rect.left, "inputDeRecherche");
    //left: ${rect.left}px; ${compStyles.width};
    derulant.setAttribute('style', `background-color: rebeccapurple;`);
    if(cardName._value.length == 0){
        derulant.setAttribute('style', `background-color: aquamarine;`);
    }
}

function addPokemon(card){
    console.log(card.id, "selectioner");
    deck.value.push({
        id: card.id,
        name: card.name,
        image: card.image,
    });
    localStorageP.setLocalStorageCardsWithOutOcc("deck",deck.value);
    console.log(deck.value, "deck ajoute");
    cardName.value = "";
    cards.value=localStorageP.getLocalStorageCards("pikachu");
    const derulant = document.querySelector(".listDerulant");
    derulant.setAttribute('style', `background-color: aquamarine;`);
}

const addPokemonInApi = async() => {
    console.log(deck.value, "deck envoyer dans l'api");
    let cards = [];
    for (let i = 0; i < deck.value.length; i++) {
        cards.push(deck.value[i].id.toString());
    }

    let randomNumber = Math.floor(Math.random() * 10) + 1;

    console.log(cards, "cards envoyer dans l'api");
    let jsonDeck = {
        idUser: randomNumber,
        name: "yupi",
        cards: cards,
    };
    console.log(jsonDeck, "jsonDeck envoyer dans l'api");
    await deckService.ajouterDeck(jsonDeck);
}

function deleteDeck(){
    deck.value = [];
    localStorageP.removeLocalStorageCards("deck");
    console.log(deck.value, "deck effacer");
}

</script>

<template>
    <h1>Creation de Deck</h1>
    <div class="parent">

    <section>
        <label for="name">Nom du card</label>
        <input type="text" id="name" class="input-recherche" list="cards-list" v-model="cardName" @input="addDeck" />
        <div class="listDerulant" id="derulant">
            <button v-if="cards.length!=0" v-for="card in cards" :id="card.id" class="card-button" @click="addPokemon(card)">
                <p>name: {{ card.name }}</p>
                <img :src="`${card.image}/low.png`" alt="image non charger" class="card-image" />
            </button>
            <p v-else>aucune carte disponible</p>
        </div>
    </section>

    <section class="mon-deck">
        <form @submit.prevent="addPokemonInApi">
            <div class="deck">
                <MonDeck v-if="deck.length" v-for="card in deck" :key="card.id" :card="card" />
            </div>
            <button type="subimit">Ajouter Deck</button>
            <button type="button" @click="deleteDeck">effacer deck</button>
        </form>
    </section>

    </div>
</template>

<style scoped lang="scss">
.parent {
    display: flex;
    flex-direction: row;
}
#name {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 0;
    width: 500px;
}

.listDerulant {
    max-height: 600px;
    max-width: 600px;
    overflow-y: auto;
    position: relative;
    background-color: aquamarine;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 0;
}

.listDerulant .card-button {
    all: unset;
    display: block;
    list-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 2px;
}

.listDerulant .card-button:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}

.listDerulant .card-button p {
    margin: 0;
    padding: 10px;
}

.listDerulant .card-button img {
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 5px;
}

// .mon-deck form .deck {
//     width: 50%;
//     margin-left: 20px;
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
// }

.mon-deck {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.deck {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    min-height: 150px; /* Pour garder un espace même si vide */
}

button {
    display: inline-block;
    margin: 10px 5px;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}

button[type="submit"] {
    background: #007bff;
    color: white;
}

button[type="submit"]:hover {
    background: #0056b3;
}

button[type="button"] {
    background: #ff4d4d;
    color: white;
}

button[type="button"]:hover {
    background: #cc0000;
}

</style>