<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">Mini Blog</h1>
      <div class="space-x-4">
        <router-link to="/" class="text-gray-700 hover:underline">Home</router-link>
        <router-link to="/admin" class="text-gray-700 hover:underline">Admin</router-link>
           <button
    v-if="isLoggedIn"
    @click="logout"
    class="text-red-500 hover:underline ml-auto"
  >   Logout
  </button>
      </div>
    </nav>

    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from "jwt-decode";
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
  } catch (err) {
    isLoggedIn.value = false;
    localStorage.removeItem('token');
  }
}


function logout() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  window.location.href = '/login';
}

onMounted(() => {
  checkToken();
});
</script>
