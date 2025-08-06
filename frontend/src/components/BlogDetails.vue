<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="text-3xl font-bold">{{ blog.title }}</h1>
    <p class="text-gray-500 text-sm mb-4">By {{ blog.author }} | {{ formatDate(blog.createdAt) }}</p>
    <p class="text-lg text-gray-800 whitespace-pre-line">{{ blog.content }}</p>
    <router-link to="/" class="text-blue-500 hover:underline mt-4 block">← Back to posts</router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import type { Blog } from '../types';

const route = useRoute();
const blog = ref<Blog>({} as Blog);

onMounted(async () => {
  const res = await api.get(`/posts/${route.params.id}`);
  blog.value = res.data;
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString();
}
</script>
