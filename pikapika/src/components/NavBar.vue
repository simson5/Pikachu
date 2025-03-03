<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="nav">
        <RouterLink to="/"><div class="it">vide</div></RouterLink>
        <RouterLink to="/home"><div class="it">Home</div></RouterLink>
        <RouterLink to="/allCards"><div class="it">All cards</div></RouterLink>
        <RouterLink to="/myDecks"><div class="it">My decks</div></RouterLink>
        <RouterLink to="/openABooster"><div class="it">Open a booster</div></RouterLink>
    </nav>
</template>

<style scoped>
.nav {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    background-color: green;
}
.nav .it {
    /*flex : 1;*/
    text-align: center;
    border: 1px solid black;
    padding-top: 30px;
    height: 60px;
}
</style>