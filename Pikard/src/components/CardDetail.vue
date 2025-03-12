<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CardService } from '../services/CardService.js';


const card = ref([]);
const route = useRoute();
const id = route.params.id;
console.log(id);

const cardService = new CardService("https://api.tcgdex.net/v2/fr/cards/");

const fetchCard = async() => {
    card.value = await cardService.getCard(id);
    console.log(card.value, "simoni");
    // image = card.value.image+"/high.png";
    // console.log(image);
}

onMounted(fetchCard);
</script>

<template>  
    <h1>Card detail</h1>
    <div class="cardP" v-if="card">
        <p>name: {{ card.name }}</p>
        <p>types: {{ card.types }}</p>
        <img :src="`${card.image}/high.png`" alt="image non charger" class="card-image" />
    </div>
</template>

<style scoped>
.cardP {
    border: 1px solid black;
    padding: 10px;
}
.card-image {
    width: 200px;
    height: 200px;
}
</style>