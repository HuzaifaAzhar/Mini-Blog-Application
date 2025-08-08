<template>
  <div class="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-4">{{ blog.title }}</h1>
    <p class="text-gray-500 text-sm mb-8">
      ✍️ {{ blog.author }} • {{ formatDate(blog.createdAt) }}
    </p>
    <div class="prose prose-lg text-gray-800 leading-relaxed">
      {{ blog.content }}
    </div>
    <router-link
      to="/"
      class="mt-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition"
    >
      ← Back to posts
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import type { Blog } from '../types.ts';

const route = useRoute();
const blog = ref<Blog>({} as Blog);

onMounted(async () => {
  const res = await api.get(`/posts/${route.params.id}`);
  blog.value = res.data;
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
}
</script>
