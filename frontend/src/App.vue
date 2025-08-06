<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">Mini Blog</h1>
      <div class="space-x-4">
        <router-link to="/" class="text-gray-700 hover:underline">Home</router-link>
        <router-link to="/admin" class="text-gray-700 hover:underline">Admin</router-link>
      </div>
    </nav>

    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>
