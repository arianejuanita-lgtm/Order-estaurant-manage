<script setup lang="ts">
import Boutton from './Boutton.vue';
import { Search } from 'lucide-vue-next';
import { useFiltered } from '@/presentation/stores/useFiltered.ts';
import { ref, nextTick } from 'vue';

const filter = useFiltered();
const isExpanded = ref<boolean>(false);
const inputRef = ref<HTMLInputElement | null>(null);

const openSearch = async () => {
  isExpanded.value = true;
  await nextTick();
  inputRef.value?.focus();
};

const handleBlur = () => {
  setTimeout(() => {
    if (document.activeElement !== inputRef.value && !filter.title) {
      isExpanded.value = false;
    }
  }, 200);
};
</script>

<template>
  <div class="relative flex items-center">
    <button
      v-if="!isExpanded"
      @click="openSearch"
      class="flex items-center justify-center w-[35px] h-[35px] mr-12 bg-white border border-gray-500 rounded-full hover:border-[#F5BE18] transition-colors md:hidden"
      aria-label="Ouvrir la recherche"
    >
      <Search :size="18" class="text-gray-400" />
    </button>

    <div
      :class="[
        'items-center h-[30px] pt-1.25 pb-1.25 pr-1.5 pl-4.5 bg-white border border-gray-500 rounded-[25px] focus-within:border-[#F5BE18] focus-within:shadow-[0_4px_18px_rgba(245,190,24,0.15)] transition-all duration-300',
        isExpanded ? 'flex absolute right-0 z-50 w-[220px] shadow-lg bg-white' : 'hidden md:flex md:w-[400px]'
      ]"
    >
      <Search :size="20" class="shrink-0 text-gray-400" />

      <input
        ref="inputRef"
        type="text"
        name="search"
        id="search"
        placeholder="Pizza, burger..."
        v-model="filter.title"
        @blur="handleBlur"
        class="flex-1 h-full px-3 border-none outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400 w-full"
      />

      <Boutton :haut="25" title="Search" />
    </div>
  </div>
</template>