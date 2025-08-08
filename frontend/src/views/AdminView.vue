<template>
  <div class="p-8 max-w-6xl mx-auto">
    <!-- Header -->
    <div
      class="flex justify-between items-center mb-8 p-4 rounded-2xl bg-white/30 backdrop-blur-md shadow-lg border border-white/20"
    >
      <h1 class="md:text-4xl font-extrabold text-white drop-shadow">⚙️ Admin Panel</h1>
      <button
        @click="openCreateModal"
        class="px-5 py-2.5 rounded-lg bg-white/40 hover:bg-white/50 backdrop-blur-md text-gray-900 font-medium shadow transition"
      >
        + Create Post
      </button>
    </div>

    <!-- Posts List -->
    <h2 class="text-xl font-semibold mb-4 text-white drop-shadow">All Posts</h2>
    <div v-if="!posts.length" class="text-gray-200 text-center py-8">
      No posts yet. Create your first one above!
    </div>
    <div class="space-y-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="flex justify-between items-center p-5 rounded-xl bg-white/30 backdrop-blur-md shadow-lg border border-white/20 hover:bg-white/40 transition"
      >
        <div>
          <h3 class="text-lg font-semibold text-white drop-shadow">{{ post.title }}</h3>
          <p class="text-sm text-gray-200">by {{ post.author }}</p>
        </div>
        <div class="flex space-x-4">
          <button @click="editPost(post)" class="text-blue-200 hover:text-blue-100">
            Edit
          </button>
          <button @click="deletePost(post.id)" class="text-red-300 hover:text-red-200">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div
          class="bg-white/30 backdrop-blur-xl rounded-2xl w-full max-w-xl p-8 shadow-2xl border border-white/20 relative"
        >
          <h2 class="text-2xl font-bold mb-6 text-white drop-shadow">
            {{ selectedPost ? '✏️ Edit Post' : '📝 Create Post' }}
          </h2>
          <button
            class="absolute top-4 right-4 text-white/70 hover:text-white"
            @click="closeModal"
          >
            ✖
          </button>
          <div v-if="errorMessages.length" class="mb-4 space-y-1">
  <div
    v-for="(msg, i) in errorMessages"
    :key="i"
    class="text-red-200 bg-red-500/20 px-3 py-2 rounded-lg text-sm"
  >
    {{ msg }}
  </div>
</div>

          <BlogForm
            :modelValue="selectedPost"
            :isEdit="!!selectedPost"
            @submit="handleSubmit"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BlogForm from '../components/BlogForm.vue';
import api from '../api';
import type { Blog } from '../types.ts';

const posts = ref<Blog[]>([]);
const selectedPost = ref<Blog | null>(null);
const showModal = ref(false);
const errorMessages = ref<string[]>([]);

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
  errorMessages.value = []; 
  try {
    if (selectedPost.value) {
      await api.put(`/posts/${selectedPost.value.id}`, data);
    } else {
      await api.post('/posts', data);
    }
    closeModal();
    await loadPosts();
  } catch (err: any) {
    if (err.response?.data?.message) {
      errorMessages.value = Array.isArray(err.response.data.message)
        ? err.response.data.message
        : [err.response.data.message];
    } else {
      errorMessages.value = ['An unexpected error occurred.'];
    }
  }
}


onMounted(loadPosts);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
