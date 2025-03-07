<script setup>
import { defineProps } from 'vue';

defineProps(['deck', 'decks']);
// console.log(deck, "deck");
// console.log(decks, "decks");
// console.log(decks.indexOf(deck), "index of deck");
</script>

<template>
    <RouterLink :to="`/myDecks/${decks.indexOf(deck)}`">
        <div class="deck">
            <p>nom : {{ deck.name }}</p>
            <p>id user : {{ deck.idUser }}</p>
            <p>cards :  {{ deck.cards }}</p>
            <p>id : {{ deck.id }}</p>
        </div>
    </RouterLink>
</template>

<style scoped>

.deck {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>