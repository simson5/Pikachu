<script setup>
import {defineProps} from 'vue';

defineProps(['card']);
</script>

<template>
    <div class="card">
        <p>{{ card.name }}</p>
        <img :src="`${card.image}/low.png`" alt="image non charger" class="card-image" />
    </div>
</template>

<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    height: 200px;
}
.card:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}
.card-image {
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 5px;
}
</style>