<template>
  <div class="p-8 max-w-7xl mx-auto">
    <h1 class="text-4xl font-extrabold text-white mb-8 text-center">📚 Latest Posts</h1>

    <!-- Search + Filter Controls -->
    <div
      class="flex flex-col sm:flex-row items-center gap-4 mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg"
    >
      <!-- Search -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Search posts..."
        class="flex-1 px-4 py-2 rounded-xl bg-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <!-- Filter by Author -->
     <select
  v-model="selectedAuthor"
  class="bg-white/10 backdrop-blur-md border border-white/20 
         text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
         focus:ring-white/30"
>
  <option value="" class="bg-gray-900 text-white">All Authors</option>
  <option
    v-for="author in authors"
    :key="author"
    :value="author"
    class="bg-gray-900 text-white"
  >
    {{ author }}
  </option>
</select>

    </div>

    <!-- Posts Grid -->
    <div v-if="!filteredPosts.length" class="text-center text-gray-400">
      No posts match your search/filter.
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard v-for="post in paginatedPosts" :key="post.id" :blog="post" />
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center mt-8 gap-2"
    >
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 rounded-xl transition-all backdrop-blur-md',
          currentPage === page
            ? 'bg-white/30 text-white font-bold'
            : 'bg-white/10 text-white/70 hover:bg-white/20'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BlogCard from '../components/BlogCard.vue';
import api from '../api';
import type { Blog } from '../types.ts';

const posts = ref<Blog[]>([]);
const searchQuery = ref('');
const selectedAuthor = ref('');
const currentPage = ref(1);
const pageSize = 6;

const authors = computed(() =>
  [...new Set(posts.value.map((p) => p.author))].filter(Boolean)
);

const filteredPosts = computed(() => {
  let list = posts.value;

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    );
  }

  if (selectedAuthor.value) {
    list = list.filter((p) => p.author === selectedAuthor.value);
  }

  return list;
});

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / pageSize)
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredPosts.value.slice(start, start + pageSize);
});

onMounted(async () => {
  const res = await api.get('/posts');
  posts.value = res.data;
});
</script>

<style scoped>
.backdrop-blur-lg {
  backdrop-filter: blur(20px);
}
</style>
