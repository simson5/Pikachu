<script setup>
import {ref, onMounted} from 'vue';
import { BoosterService } from '../services/BoosterService';
import { useRoute } from 'vue-router';
import { LocalStorageService } from '../services/LocalStorageService';
import { CardService } from '../services/CardService';

const opening = ref([]);
const route = useRoute();
const boosterService = new BoosterService("https://67b8eac151192bd378dc35a6.mockapi.io/boosters");
const cardService = new CardService("https://api.tcgdex.net/v2/fr/cards/");
const id = route.params.id;
const localStorageP = new LocalStorageService();

// ca prend 10sec a charger

const fetchOpening = async () => {
    console.log("id", id);
    let idPokemon = await boosterService.getRandomCard(id);
    opening.value = await cardService.getCard(idPokemon);
    console.log(opening.value, "sisi");
    let existingCards = localStorageP.getLocalStorageCards("pikachu") || [];
    existingCards.push(opening.value);
    localStorageP.setLocalStorageCards(existingCards);
}

onMounted(fetchOpening);

// v-for="cart in opening" :key="cart?.id"
</script>

<template>
    <h1>Booster opening</h1>
    <h2 v-if = "opening==undefined">opening pas defini</h2>
    <p v-else>nombre d'element trouver : {{ opening.length }}</p>
    
    <div class="card" v-if = "opening.length!=0">
        <p>nom de pokemon : {{ opening.name }}</p>
        <img :src="`${opening.image}/high.png`" alt="image non charger" class="card-image" />
    </div>

    <p v-else>Chargement...</p>
</template>

<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 250px;
}
.card-image {
    width: 200px;
    height: 200px;
}
</style>