<script setup>
  import NavBar from './components/NavBar.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <NavBar/>
    <h2>Vue JS PIKARD</h2>
  </header>

  <main>
    <RouterView />
  </main>
</template>

