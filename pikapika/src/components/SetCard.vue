<script setup>
import { defineProps } from 'vue';

defineProps(['cardeSet']);
</script>

<template>
    <RouterLink :to="`/openABooster/${cardeSet.id}`">
    <div class="card">
        <p>{{ cardeSet.name }}</p>
        <p>{{ cardeSet.cardCount }}</p>
    </div>
    </RouterLink>
</template>

<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 250px;
}
p {
    text-align: center;
    color: black;
    font-size: large;
    font-weight: bold;
}
a {
    text-decoration: none;
}
</style>