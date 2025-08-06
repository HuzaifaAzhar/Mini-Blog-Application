<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Latest Posts</h1>
    <div class="grid gap-4">
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
