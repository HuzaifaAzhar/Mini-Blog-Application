<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md w-80 space-y-4">
      <h2 class="text-2xl font-bold text-center">Admin Login</h2>
      <input v-model="username" placeholder="Username" class="w-full border p-2 rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 rounded" />
      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

async function login() {
  try {
    const res = await api.post('/auth/login', {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem('token', res.data.access_token);
    router.push('/admin');
  } catch (err) {
    error.value = 'Invalid username or password';
  }
}
</script>
