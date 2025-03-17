<script setup>
import { ref } from 'vue';
import { DeckService } from '../services/DeckService.js';
import { ApiService } from '../services/ApiService.js';
import Card from './Card.vue';

const deck = ref([]);
// a effacer et regarder ds cours pour comment on fait
const nom = ref({});

const deckService = new DeckService("https://67b8eac151192bd378dc35a6.mockapi.io/decks");

const addDeck = async() => {
    console.log(deck.value, "deck ajouté");
    console.log(nom.value, "name");
    deck.value = await deckService.rechercheCard(deck.value);
    deck.name = deck.value;
    console.log(deck.value, "deck ajouté");
    console.log(deck.value.name, "name");
    //ApiService.postCards(deck.value);
}


</script>

<template>
    <h1>Creation de Deck</h1>
    <!-- @submit.prevent="" -->
    <form>
        <label for="name">Nom du card</label>
        <input type="text" id="name" v-model="nom.name" @input="addDeck" />
        <ul v-if="deck.length" v-for="card in deck" :id="card.id">
            <il>{{card.id}}</il>
        </ul>
        <!-- <button type="submit">Ajouter</button> -->
    </form>

    <!-- <Card v-if="deck.length" v-for="card in deck" :key="card.id" :card="card" /> -->
</template>