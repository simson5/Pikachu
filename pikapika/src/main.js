//import './assets/main.css'

import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import Home from './components/Home.vue';
import AllCards from './components/AllCards.vue';
import MyDecks from './components/MyDecks.vue';
import OpenABooster from './components/OpenABooster.vue';
import PikaDetail from './components/PikaDetail.vue';
import BoosterOpening from './components/BoosterOpening.vue';
import WelcomeHome from './components/WelcomeHome.vue';


//name: 'list' je sais plus a qoui ca sert

const routes = [
  { path: '/', component: WelcomeHome },
  { path: '/home', component: Home },
  { path: '/allCards', component: AllCards },
  { path: '/allCards/:id', component: PikaDetail },
  { path: '/myDecks', component: MyDecks },
  { path: '/openABooster', component: OpenABooster },
  { path: '/openABooster/:id', component: BoosterOpening },
];
  
const router = createRouter({
history: createWebHistory(),
routes,
});

createApp(App).use(router).mount('#app')
