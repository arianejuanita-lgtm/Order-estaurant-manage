<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { useFiltered } from '@/presentation/stores/useFiltered';

const filterStore = useFilter();
const filter = useFiltered();

onMounted(async () => {
    await filterStore.fecthCategoryMenuItems();
});

const cate = ref<string>(''); 

watch(cate, (newValue) => {
    filter.catego = newValue;
    console.log('newValue',newValue);
    if (!newValue) {
    cate.value = "";
  }
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <label for="category" class="text-xs font-bold uppercase tracking-wider text-gray-500">Category</label>
        <ul class="flex flex-col gap-2 m-0 p-0 list-none">
            <li v-for="cat in filterStore.categories" :key="cat.id">
                <label :for="'cat-' + cat.id" class="flex items-center gap-2.5 text-sm font-medium text-gray-700 cursor-pointer select-none hover:text-gray-900 transition-colors">
                    <input 
                        type="checkbox" 
                        name="cat" 
                        :id="'cat-' + cat.id" 
                        v-model="cate"
                        :true-value="cat.label"
                        :checked="filter.catego === cat.label"
                        false-value=""
                        class="w-4 h-4 rounded border-gray-300 accent-[#F5BE18] cursor-pointer"
                    /> 
                    {{ cat.label }}
                </label>
            </li>
        </ul>
    </div>
</template>