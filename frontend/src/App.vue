<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black flex flex-col">
    <!-- Navbar -->
    <nav
      class="bg-white/20 backdrop-blur-xl border-b border-white/10 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-40"
    >
      <router-link to="/" class="text-2xl font-extrabold text-white hover:text-blue-200 transition">
        Mini Blog
      </router-link>
      <div class="flex items-center space-x-6">
        <router-link to="/" class="text-white/90 hover:text-blue-200 transition">Home</router-link>
        <router-link to="/admin" class="text-white/90 hover:text-blue-200 transition">Admin</router-link>
        <button
          v-if="isLoggedIn"
          @click="logout"
          class="text-red-300 hover:text-red-200 transition"
        >
          Logout
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow p-6">
      <router-view />
    </main>

    <!-- Footer -->
    <footer
      class="bg-white/10 backdrop-blur-xl py-4 text-center text-sm text-white/70 border-t border-white/10"
    >
      © {{ new Date().getFullYear() }} Mini Blog — All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';

const isLoggedIn = ref(false);

function checkToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    isLoggedIn.value = false;
    return;
  }
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp > now) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
      localStorage.removeItem('token');
    }
  } catch {
    isLoggedIn.value = false;
    localStorage.removeItem('token');
  }
}

function logout() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  window.location.href = '/login';
}

onMounted(checkToken);
</script>
