<script setup>
import { ref, computed } from 'vue';
import { LocalStorageService } from '../services/LocalStorageService.js';
import { CardService } from '../services/CardService.js';

const allCards = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(LocalStorageService.getItem('itemsPerPage', 10));  // Utilisation de LocalStorageService pour récupérer la valeur
const totalCards = ref(0);
const loading = ref(true);

const cardService = new CardService("https://api.tcgdex.net/v2/fr/cards");

const fetchCards = async () => {
  const response = await cardService.getCards(currentPage.value, itemsPerPage.value);
  allCards.value = response;
  totalCards.value = response.length;
  loading.value = false;
};

const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + Number(itemsPerPage.value);
  return allCards.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(totalCards.value / itemsPerPage.value));

const changeItemsPerPage = (event) => {
  itemsPerPage.value = event.target.value;
  localStorage.setItem('itemsPerPage', itemsPerPage.value);  // Sauvegarde de la valeur dans le localStorage
  currentPage.value = 1;
  fetchCards();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

fetchCards();
</script>

<template>
  <h1>All Cards</h1>

  <h3 v-if="totalCards">Il y a {{ totalCards }} cartes</h3>

  <label for="itemsPerPage">Cartes par page :</label>
  <select id="itemsPerPage" v-model="itemsPerPage" @change="changeItemsPerPage">
    <option value="10">10</option>
    <option value="25">25</option>
    <option value="50">50</option>
    <option :value="totalCards">Toutes</option>
  </select>

  <div class="container">
    <p v-if="loading">Chargement...</p>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
    
    <template v-else-if="allCards.length">
      <div v-for="card in allCards" :key="card.id" class="card" @click="goToCardDetails(card.id)">
        <img :src="card.image" :alt="card.name" class="card-image" />
        <h3>{{ card.name }}</h3>
      </div>
    </template>
    
    <p v-else>Aucune carte trouvée</p>
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
