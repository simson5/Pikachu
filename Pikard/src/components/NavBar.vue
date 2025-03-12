<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import getLinks from '../services/LienService';

const liens = ref([]);

onMounted(async () => {
    try {
        console.log("Chargement des liens...");
        liens.value = getLinks();
        console.log("Liens chargés :", liens.value);
    } catch (error) {
        console.error("Erreur lors du chargement des liens :", error);
    }
});
</script>

<template>
    <nav class="nav" v-if="liens.length">
        <RouterLink v-for="lien in liens" :key="lien.path" :to="lien.path">
            <div class="it">{{ lien.name }}</div>
        </RouterLink>
    </nav>
</template>

<style scoped>
.nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: green;
}

.nav .it { 
    text-align: center;
    border: 1px solid black;
    padding-top: 30px;
    height: 60px;
}
</style>
