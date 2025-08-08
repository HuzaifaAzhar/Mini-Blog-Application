<template>
  <div
    class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div class="p-6 flex flex-col h-full">
      <h2 class="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
        {{ blog.title }}
      </h2>
      <p class="text-gray-500 text-sm mb-4">
        ✍️ {{ blog.author }} • {{ formatDate(blog.createdAt) }}
      </p>
      <p class="text-gray-700 flex-grow line-clamp-3 leading-relaxed">
        {{ blog.content }}
      </p>
      <router-link
        :to="`/posts/${blog.id}`"
        class="mt-6 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition"
      >
        Read more
        <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from '../types.ts';
const props = defineProps<{ blog: Blog }>();

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
</script>
