//import './assets/main.css'

import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import Home from './components/Home.vue';
import AllCards from './components/AllCards.vue';
import MyDecks from './components/MyDecks.vue';
import OpenABooster from './components/OpenABooster.vue';
import CardDetail from './components/CardDetail.vue';
import BoosterOpening from './components/BoosterOpening.vue';
import DeckDetail from './components/DeckDetail.vue';


//name: 'list' je sais plus a qoui ca sert

const routes = [
  { path: '/', component: Home },
  { path: '/allCards', component: AllCards },
  { path: '/allCards/:id', component: CardDetail },
  { path: '/myDecks', component: MyDecks },
  { path: '/myDecks/:id', component: DeckDetail },
  { path: '/openABooster', component: OpenABooster },
  { path: '/openABooster/:id', component: BoosterOpening },
];
  
const router = createRouter({
history: createWebHistory(),
routes,
});

createApp(App).use(router).mount('#app')
