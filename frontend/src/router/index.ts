import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';
import BlogDetails from '../components/BlogDetails.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/posts/:id', component: BlogDetails },
  { path: '/login', component: LoginView },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export { router };
