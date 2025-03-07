<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { DeckService } from '../services/DeckService.js';
import DeckCard from './DeckCard.vue';

const deck = ref(null);
const deckService = new DeckService("https://67b8eac151192bd378dc35a6.mockapi.io/decks");
const route = useRoute();
const id = route.params.id;
console.log(id);

const fetchDeck = async() => {
    deck.value = await deckService.getDeckById(id-1);
    console.log(deck.value, "deck recupéré");
}

onMounted(fetchDeck);
</script>

<template>
    <h1>Detail de deck</h1>
    <p v-if="deck!=null"> nom de deck : {{ deck.name }}, id d'utilisateur : {{ deck.idUser }}, id de deck : {{ deck.id }}</p>

    <div class="container">
        <DeckCard v-if="deck!=null" v-for="card in deck.cards" :key="card.id" :card="card" />

        <p v-else> Wait a moment </p>
    </div>

</template>

<style scoped>
h1 {
    text-align: center;
}
a {
    text-align: center;
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
p {
    text-align: center;
}
</style>