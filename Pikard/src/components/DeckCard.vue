<script setup>
import { defineProps } from 'vue';

const props = defineProps(['card']);
console.log(props, "props");
console.log(props.card.id, "id card");
</script>

<template>
    <RouterLink :to="`/allCards/${card.id}`">
        <div class="card">
            <h1>Card</h1>
            <img :src="`${card.image}/high.png`" alt="image non charger" class="card-image" />
            <p>{{ card.name }}</p>
        </div>
    </RouterLink>
</template>

<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 250px;
    height: 250px;
}
h1 {
    text-align: center;
    color: black;
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