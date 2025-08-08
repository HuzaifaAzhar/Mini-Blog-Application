<template>
  <form
    @submit.prevent="onSubmit"
    class="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
  >
    <h2 class="text-2xl font-bold text-gray-900 mb-4">
      {{ isEdit ? '✏️ Edit Post' : '📝 Create New Post' }}
    </h2>

    <div>
      <label class="block font-medium text-gray-700 mb-1">Title</label>
      <input
        v-model="form.title"
        type="text"
        class="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg p-3 outline-none transition"
        placeholder="Enter the blog title"
        required
      />
    </div>

    <div>
      <label class="block font-medium text-gray-700 mb-1">Author</label>
      <input
        v-model="form.author"
        type="text"
        class="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg p-3 outline-none transition"
        placeholder="Enter your name"
        required
      />
    </div>

    <div>
      <label class="block font-medium text-gray-700 mb-1">Content</label>
      <textarea
        v-model="form.content"
        class="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg p-3 outline-none transition h-48"
        placeholder="Write your blog content here..."
        required
      ></textarea>
    </div>

    <button
      type="submit"
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all w-full"
    >
      {{ isEdit ? 'Update Post' : 'Create Post' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Blog } from '../types.ts';

const props = defineProps<{ modelValue?: Blog | null; isEdit?: boolean }>();
const emit = defineEmits(['submit']);

const form = reactive<Partial<Blog>>({
  title: '',
  author: '',
  content: '',
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val);
  },
  { immediate: true }
);

function onSubmit() {
  emit('submit', { ...form });
}
</script>
