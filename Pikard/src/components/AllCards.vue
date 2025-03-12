<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { CardService } from '../services/CardService.js';
import Card from './Card.vue';

const allCards = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(localStorage.getItem('itemsPerPage') || 10);
const totalCards = ref(0);
const cardService = new CardService("https://api.tcgdex.net/v2/fr/cards");

const fetchCards = async () => {
  const response = await cardService.getCards(`?limit=100`);
  allCards.value = response;
  totalCards.value = response.length;
};

const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + Number(itemsPerPage.value);
  return allCards.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(totalCards.value / itemsPerPage.value));

const changeItemsPerPage = (event) => {
  itemsPerPage.value = event.target.value;
  localStorage.setItem('itemsPerPage', itemsPerPage.value);
  currentPage.value = 1;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

onMounted(fetchCards);
</script>

<template>
  <h1>All cards</h1>

  <h3 v-if="totalCards">Il y a {{ totalCards }} cartes</h3>

  <label for="itemsPerPage">Cartes par page :</label>
  <select id="itemsPerPage" v-model="itemsPerPage" @change="changeItemsPerPage">
    <option value="10">10</option>
    <option value="25">25</option>
    <option value="50">50</option>
    <option :value="totalCards">Toutes</option>
  </select>

  <div class="container">
    <Card v-if="paginatedCards.length" v-for="card in paginatedCards" :key="card.id" :card="card" />
    <h3 v-else>Wait a moment</h3>
  </div>

  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
    <span>Page {{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
button {
  margin: 0 10px;
}
</style>
