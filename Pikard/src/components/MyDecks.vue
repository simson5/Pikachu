<script setup>
import { ref, onMounted } from 'vue'; 
import { DeckService } from '../services/DeckService.js';
import SetDeck from './SetDeck.vue';

const decks = ref([]);
const deckService = new DeckService("https://67b8eac151192bd378dc35a6.mockapi.io/decks");

const fetchDeck = async() => {
    decks.value = await deckService.getDeck();
    console.log(decks.value, "deks disponibles");
}

onMounted(fetchDeck);

</script>

<template>
    <h1>My decks</h1>
    <p v-if="decks.length"> il y a {{ decks.length }} decks disponibles </p>

    <SetDeck v-if="decks.length" v-for="deck in decks" :deck="deck" :decks="decks" :key="deck.id" />

    <p v-else> Wait a moment </p>
</template>

<style scoped>
h1 {
    text-align: center;
}

p {
    text-align: center;
}

SetDeck {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
}
</style>