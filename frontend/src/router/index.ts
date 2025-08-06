import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';
import BlogDetails from '../components/BlogDetails.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/admin', component: AdminView },
  { path: '/posts/:id', component: BlogDetails },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
