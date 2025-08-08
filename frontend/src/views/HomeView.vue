<template>
  <div class="p-8 max-w-7xl mx-auto">
    <h1 class="text-4xl font-extrabold text-white mb-8 text-center">📚 Latest Posts</h1>
    <div v-if="!posts.length" class="text-center text-gray-500">
      No posts yet. Start by creating one!
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard v-for="post in posts" :key="post.id" :blog="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BlogCard from '../components/BlogCard.vue';
import api from '../api';
import type { Blog } from '../types.ts';

const posts = ref<Blog[]>([]);

onMounted(async () => {
  const res = await api.get('/posts');
  posts.value = res.data;
});
</script>
