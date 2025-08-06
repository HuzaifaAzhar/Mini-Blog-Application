<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Admin Panel</h1>
    <BlogForm :modelValue="selectedPost" :isEdit="!!selectedPost" @submit="handleSubmit" />
    <hr class="my-6" />
    <h2 class="text-xl font-semibold mb-2">All Posts</h2>
    <div class="space-y-2">
      <div v-for="post in posts" :key="post.id" class="flex justify-between items-center border p-2 rounded">
        <div>
          <h3 class="font-bold">{{ post.title }}</h3>
          <p class="text-sm text-gray-500">By {{ post.author }}</p>
        </div>
        <div class="space-x-2">
          <button @click="editPost(post)" class="text-blue-500 hover:underline">Edit</button>
          <button @click="deletePost(post.id)" class="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BlogForm from '../components/BlogForm.vue';
import api from '../api';
import type { Blog } from '../types';

const posts = ref<Blog[]>([]);
const selectedPost = ref<Blog | null>(null);

async function loadPosts() {
  const res = await api.get('/posts');
  posts.value = res.data;
}

function editPost(post: Blog) {
  selectedPost.value = { ...post };
}

async function deletePost(id: number) {
  await api.delete(`/posts/${id}`);
  await loadPosts();
}

async function handleSubmit(data: Partial<Blog>) {
  if (selectedPost.value) {
    await api.put(`/posts/${selectedPost.value.id}`, data);
  } else {
    await api.post('/posts', data);
  }
  selectedPost.value = null;
  await loadPosts();
}

onMounted(loadPosts);
</script>
