<script setup>
import { ref, onMounted } from 'vue';
import { CardService } from '../services/CardService.js';
import Card from './Card.vue';

const allCards = ref([]);
const cardService = new CardService("https://api.tcgdex.net/v2/fr/cards/");

const fetchCards = async () => {
  allCards.value = await cardService.getCards();
  console.log(allCards.value);
};

onMounted(fetchCards);

</script>


<template>
    <h1>All cards</h1>

    <h3 v-if="allCards.length">ya {{ allCards.length }} cartes</h3>
    <!-- <ul>
        <li v-for="carde in allCards" :key="carde.id">
            <p>{{ carde.name }}</p>
            <p>simoni</p>
        </li>
    </ul> -->

    <div class="container">
        <Card v-if="allCards.length" v-for="card in allCards" :key="card.id" :card="card" />

        <h3 v-else>
            wait a moment
        </h3>
    </div>

</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>