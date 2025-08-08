<template>
  <div
    class="flex items-center justify-center min-h-screen "
  >
    <form
      @submit.prevent="login"
      class="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 border border-white/10 space-y-5"
    >
      <h2 class="text-3xl font-extrabold text-center text-white drop-shadow">🔑 Admin Login</h2>

      <input
        v-model="username"
        placeholder="Username"
        class="w-full border border-white/20 bg-white/30 text-white placeholder-white/70 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full border border-white/20 bg-white/30 text-white placeholder-white/70 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-300"
      />

      <button
        type="submit"
        class="w-full bg-white/40 hover:bg-white/50 text-gray-900 font-semibold p-3 rounded-lg shadow transition"
      >
        Login
      </button>

      <p v-if="error" class="text-red-200 text-sm text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../api';

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
    window.location.href = '/admin';
  } catch {
    error.value = 'Invalid username or password';
  }
}
</script>
