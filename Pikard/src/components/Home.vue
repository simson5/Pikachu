<script setup>
import { ref, onMounted } from 'vue';
import { LocalStorageService } from '../services/LocalStorageService';

const home = ref([]);
const localStorageP = new LocalStorageService();

onMounted(() => {
    let rawData = localStorageP.getLocalStorageCards();
    console.log("Données brutes récupérées :", rawData);

    // 🔥 Aplatir les éventuels tableaux imbriqués
    home.value = rawData.flat(Infinity); 

    console.log("Cartes après flatten :", home.value);
});
</script>



<template>
    <h1>Home</h1>
    <div class="container">
        <div class="card" v-if = "home.length!=0" v-for="carte in home" :key="carte?.id">
            <p v-if="carte!=null">Nom de carte : {{ carte.name }}</p>
            <img v-if="carte?.image" :src="`${carte.image}/high.png`" alt="image non chargée" class="card-image" />
        </div>
        <p v-else>pas de carte pour l'instant</p>
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