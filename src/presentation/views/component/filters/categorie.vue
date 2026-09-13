<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { onMounted } from 'vue';

const filterStore =useFilter();
onMounted(
    async()=>{
        await filterStore.fecthCategoryMenuItems();
    }
)
</script>

<template>
    <label for="category">Category</label>
    <ul>
        <li v-for="cat in filterStore.categories" :key="cat.id">
            <input 
                type="checkbox" 
                name="cat" 
                :id="'cat-' + cat.id" 
            /> 
            {{ cat.label }}
        </li>
    </ul>
</template>
