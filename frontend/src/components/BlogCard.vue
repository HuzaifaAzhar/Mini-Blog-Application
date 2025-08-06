<template>
  <div class="p-4 border rounded shadow hover:shadow-md transition">
    <h2 class="text-xl font-bold">{{ blog.title }}</h2>
    <p class="text-gray-500 text-sm mb-2">By {{ blog.author }} | {{ formatDate(blog.createdAt) }}</p>
    <p class="text-gray-700">{{ blog.content.slice(0, 150) }}...</p>
    <router-link :to="`/posts/${blog.id}`" class="text-blue-500 hover:underline mt-2 block">Read more</router-link>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from '../types';
import { defineProps } from 'vue';

const props = defineProps<{
  blog: Blog;
}>();

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString();
}
</script>
