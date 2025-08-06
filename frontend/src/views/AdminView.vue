<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Admin Panel</h1>
      <button
        @click="openCreateModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        + Create Post
      </button>
    </div>

    <h2 class="text-xl font-semibold mb-2 text-gray-700">All Posts</h2>
    <div class="space-y-3">
      <div
        v-for="post in posts"
        :key="post.id"
        class="flex justify-between items-center border border-gray-300 bg-white p-4 rounded shadow-sm hover:shadow-md transition"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ post.title }}</h3>
          <p class="text-sm text-gray-500">by {{ post.author }}</p>
        </div>
        <div class="space-x-3">
          <button @click="editPost(post)" class="text-blue-600 hover:underline">
            Edit
          </button>
          <button @click="deletePost(post.id)" class="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-xl p-6 shadow-lg relative">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">
          {{ selectedPost ? 'Edit Post' : 'Create Post' }}
        </h2>
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          @click="closeModal"
        >
          ✖
        </button>

        <BlogForm
          :modelValue="selectedPost"
          :isEdit="!!selectedPost"
          @submit="handleSubmit"
        />
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
const showModal = ref(false);

async function loadPosts() {
  const res = await api.get('/posts');
  posts.value = res.data;
}

function openCreateModal() {
  selectedPost.value = null;
  showModal.value = true;
}

function editPost(post: Blog) {
  selectedPost.value = { ...post };
  showModal.value = true;
}

function closeModal() {
  selectedPost.value = null;
  showModal.value = false;
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
  closeModal();
  await loadPosts();
}

onMounted(loadPosts);
</script>

<style scoped>
/* Ffade in */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
