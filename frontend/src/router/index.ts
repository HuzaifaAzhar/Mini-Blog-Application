import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';
import BlogDetails from '../components/BlogDetails.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', component: HomeView, meta: { title: 'Mini Blog - Home' } },
  { path: '/posts/:id', component: BlogDetails, meta: { title: 'Mini Blog - Post Details' } },
  { path: '/login', component: LoginView, meta: { title: 'Mini Blog - Login' } },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true, title: 'Mini Blog - Admin' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  document.title = (to.meta.title as string) || 'Mini Blog';

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export { router };
