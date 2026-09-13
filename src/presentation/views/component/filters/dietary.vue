<script setup lang="ts">
import {ref, watch} from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { onMounted } from 'vue';

const filterStore=useFilter();

onMounted(
    async()=>{
        await filterStore.fecthdietariesMenuItems();
        console.log('filter diatery', filterStore.dietaries.values)
    }
)
</script>
<template>
    <label for="diatery">Diatery</label>
    <ul>
        <li v-for="diat in filterStore.dietaries" :key="diat.id">
           
            <input 
            type="checkbox"
             name="diat" 
              
                > {{ diat.label }}
        </li>
    </ul>
</template>
<style></style>