<script setup lang="ts">
import {ref, watch} from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { onMounted } from 'vue';
import { useFiltered } from '@/presentation/stores/useFiltered';

const filterStore=useFilter();
const filter=useFiltered();
onMounted(
    async()=>{
        await filterStore.fecthdietariesMenuItems();
        console.log('filter diatery', filterStore.dietaries.values)
    }
)

const dia=ref<string>('');

watch(dia,(newdiate)=>{
    filter.diate=newdiate;
});
</script>
<template>
    <label for="diatery">Diatery</label>
    <ul>
        <li v-for="diat in filterStore.dietaries" :key="diat.id">
           
            <input 
            type="checkbox"
             name="diat" 
v-model="dia"
                  :id="'dia-' + diat.id" 
                :true-value="diat.label"
                false-value="" > {{ diat.label }}
                
        </li>
    </ul>
</template>
<style scoped>
input[type="checkbox"] {
    accent-color: #F5BE18;
    cursor: pointer;
}
</style>