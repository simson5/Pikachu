<script setup>
import { defineProps } from 'vue';

defineProps(['deck']);
</script>

<template>
    <RouterLink :to="`/deck/${deck.id}`">
        <div class="deck">
            <p>{{ deck.name }}</p>
            <p>{{ deck.idUser }}</p>
            <p>{{ deck.cards }}</p>
        </div>
    </RouterLink>
</template>