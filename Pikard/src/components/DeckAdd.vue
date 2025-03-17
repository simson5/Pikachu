<script setup>
import { ref } from 'vue';
import { DeckService } from '../services/DeckService.js';

const cards = ref([]);
const cardName = defineModel()
// a effacer et regarder ds cours pour comment on fait
//const nom = ref({});

const deckService = new DeckService("https://67b8eac151192bd378dc35a6.mockapi.io/decks");

const addDeck = async() => {
    //console.log(deck.value, "deck ajouté");
    //console.log(nom.value, "name");
    const card = await deckService.rechercheCard(cardName);
    cards.value.pop();
    cards.value.push(card);
    //deck.name = deck.value;
    console.log(cards.value, "deck ajouté");
    //console.log(deck.value.name, "name");
    //ApiService.postCards(deck.value);
}


</script>

<template>
    <h1>Creation de Deck</h1>
    <!-- @submit.prevent="" -->
    <form>
        <label for="name">Nom du card</label>
        <!-- v-model="nom.name" -->
        <input type="text" id="name" v-model="cardName" @input="addDeck" />
        <ul v-if="cards.length" v-for="card in cards[0]" :id="card.id">
            <li> 8 {{card}}</li>
        </ul>
        <p v-else> recherche pokemon et ajout dans ton deck </p>
        <!-- <button type="submit">Ajouter</button> -->
    </form>

    <!-- <Card v-if="deck.length" v-for="card in deck" :key="card.id" :card="card" /> -->
</template>