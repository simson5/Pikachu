<script setup>
import { ref, onMounted } from 'vue';
import {BoosterService} from '../services/BoosterService.js';
import SetCard from './SetCard.vue';


const boosters = ref([]);

const boosterService = new BoosterService("https://67b8eac151192bd378dc35a6.mockapi.io/boosters");
//https://67b8eac151192bd378dc35a6.mockapi.io/boosters
//https://api.tcgdex.net/v2/fr/sets/

const fetcheBooster = async () => {
    boosters.value = await boosterService.getBoosters();
    console.log(boosters.value);
}

onMounted(fetcheBooster);

</script>

<template>
    <h1>Open a Set</h1>
    <h3 v-if="boosters.length">ya {{ boosters.length }} Sets</h3>

    <div class="container">
        <SetCard v-if = "boosters.length" v-for = "booster in boosters" :key="booster.id" :cardeSet="booster" />

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