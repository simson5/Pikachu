<script setup>
import {ref, onMounted} from 'vue';
import { BoosterGeneratorService } from '../services/BoosterGeneratorService';
import { useRoute } from 'vue-router';
import { LocalStorageService } from '../services/LocalStorageService';

const opening = ref([]);
const route = useRoute();
const boosterGeneratorService = new BoosterGeneratorService("https://api.tcgdex.net/v2/fr/sets/", "https://api.tcgdex.net/v2/fr/cards/");
const id = route.params.id;
const localStorageP = new LocalStorageService();

// ca prend 10sec a charger

const fetchOpening = async () => {
    opening.value = await boosterGeneratorService.generateBooster(id);
    //console.log(opening.value);
    localStorageP.setLocalStorageCards(opening.value);
}

onMounted(fetchOpening);
</script>

<template>
    <h1>Booster opening</h1>
    <h2 v-if = "opening==undefined">opening pas defini</h2>
    <p v-else>nombre d'element trouver : {{ opening.length }}</p>
    <div class="container">
        <div class="card" v-if = "opening.length!=0" v-for="carte in opening" :key="carte?.id">
            <p v-if="carte!=null">{{ carte.name }}</p>
            <img v-if="carte!=null" :src="`${carte.image}/high.png`" alt="image non charger" class="card-image" />
        </div>

        <p v-else>Chargement...</p>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
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