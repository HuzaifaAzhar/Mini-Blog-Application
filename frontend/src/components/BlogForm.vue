<template>
  <form @submit.prevent="onSubmit" class="space-y-4 max-w-xl mx-auto">
    <div>
      <label class="block font-medium">Title</label>
      <input v-model="form.title" class="w-full border p-2 rounded" required />
    </div>
    <div>
      <label class="block font-medium">Author</label>
      <input v-model="form.author" class="w-full border p-2 rounded" required />
    </div>
    <div>
      <label class="block font-medium">Content</label>
      <textarea v-model="form.content" class="w-full border p-2 rounded h-40" required />
    </div>
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
      {{ isEdit ? 'Update' : 'Create' }} Post
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Blog } from '../types.ts';

const props = defineProps<{
  modelValue?: Blog | null;
  isEdit?: boolean;
}>();

const emit = defineEmits(['submit']);

const form = reactive<Partial<Blog>>({
  title: '',
  author: '',
  content: '',
});

watch(() => props.modelValue, (val) => {
  if (val) Object.assign(form, val);
}, { immediate: true });

function onSubmit() {
  emit('submit', { ...form });
}
</script>
