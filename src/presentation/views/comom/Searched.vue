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
  <div class="search-bar">
    <Search :size="20" class="search-icon"/>

    <input
      type="search"
      name="search"
      id="search"
      placeholder="Pizza, burger..."
      v-model="text"
      @keyup.enter="handleSearch"
    >

    <Boutton :haut="25" @click="handleSearch" title="Search"/>
  </div>
</template>

<style scoped>
.search-bar {
  width: 400px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 5px 6px 5px 18px;
  background-color: #ffffff;
  border: 1px solid gray;
  border-radius: 25px;
}

.search-icon {
  flex-shrink: 0;
  color: #888;
}

input {
  flex: 1;
  height: 100%;
  padding: 0 12px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #333;
}

input::placeholder {
  color: #aaa;
}

.search-bar:focus-within {
  border-color: #F5BE18;
  box-shadow: 0 4px 18px rgba(245, 190, 24, 0.15);
}

@media (max-width: 600px) {
  .search-bar {
    width: 100%;
  }
}
</style>