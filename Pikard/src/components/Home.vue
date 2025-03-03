<script setup>
import { ref } from 'vue';
import { LocalStorageService } from '../services/LocalStorageService';

const home = ref([]);
const localStorageP = new LocalStorageService();
home.value = localStorageP.getLocalStorageCards();

</script>

<template>
    <h1>Home</h1>
    <div class="container">
        <div class="card" v-if = "home.length!=0" v-for="cart in home" :key="cart?.id">
            <p v-if="cart!=null">nom de cart : {{ cart.name }}</p>
            <p v-if="cart!=null">nombre de occurence : {{ cart.occ }}</p>
            <img v-if="cart!=null" :src="`${cart.image}/high.png`" alt="image non charger" class="card-image" />
        </div>
        <p v-else>pas de cart pour l'instant</p>
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