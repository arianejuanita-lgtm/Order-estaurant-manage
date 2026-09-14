<script setup lang="ts">
import Boutton from './Boutton.vue';
import { Search } from 'lucide-vue-next';
import { useFiltered } from '@/presentation/stores/useFiltered.ts';
import { ref } from 'vue';

const filter = useFiltered();
const text = ref<string>('');

const handleSearch = () => {
  filter.title = text.value;
};
</script>

<template>
  <div class="flex items-center w-full sm:w-[400px] h-[30px] pt-1.25 pb-1.25 pr-1.5 pl-4.5 bg-white border border-gray-500 rounded-[25px] focus-within:border-[#F5BE18] focus-within:shadow-[0_4px_18px_rgba(245,190,24,0.15)]">
    
    <Search :size="20" class="shrink-0 text-gray-400"/>

    <input
      type="search"
      name="search"
      id="search"
      placeholder="Pizza, burger..."
      v-model="text"
      @keyup.enter="handleSearch"
      class="flex-1 h-full px-3 border-none outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400"
    >

    <Boutton :haut="25" @click="handleSearch" title="Search"/>
  </div>
</template>
