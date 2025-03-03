<script setup>
import { defineProps } from 'vue';

defineProps(['cardePika']);
</script>

<template>
    <RouterLink :to="`/allCards/${cardePika.id}`">
        <div class="card">
            <h1>Pika card</h1>
            <p>{{ cardePika.name }}</p>
        </div>
    </RouterLink>
</template>

<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    flex-direction: column;
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