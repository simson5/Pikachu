<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { DeckService } from '../services/DeckService.js';

const deck = ref([]);
const deckService = new DeckService("https://67b8eac151192bd378dc35a6.mockapi.io/decks");
const route = useRoute();
const id = route.params.id;
console.log(id);

const fetchDeck = async() => {
    deck.value = await deckService.getDeckById();
    console.log(deck.value, "deks disponibles");
}

onMounted(fetchDeck);
</script>

<template>
    <h1>My decks</h1>
    <p v-if="deck.length"> il y a {{ deck.length }} decks disponibles </p>

    <SetDeck v-if="deck.length" v-for="deck in deck" :deck="deck" :key="deck.id" />

    <p v-else> Wait a moment </p>

</template>