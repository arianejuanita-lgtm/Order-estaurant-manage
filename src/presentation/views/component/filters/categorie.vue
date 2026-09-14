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
});
</script>

<template>
    <label for="category">Category</label>
    <ul>
        <li v-for="cat in filterStore.categories" :key="cat.id">
            <input 
                type="checkbox" 
                name="cat" 
                :id="'cat-' + cat.id" 
                v-model="cate"
                :true-value="cat.label"
                false-value=""
            /> 
            {{ cat.label }}
        </li>
    </ul>
</template>

<style scoped>
input[type="checkbox"] {
    accent-color: #F5BE18;
    cursor: pointer;
}
</style>