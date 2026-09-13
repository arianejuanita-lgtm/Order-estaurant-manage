<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { onMounted } from 'vue';
import portion from '../../comom/Portion.vue';

const filterStore=useFilter();

onMounted(
    async()=>{
        await filterStore.fecthPortionSizeMenuItems();
        console.log("portion.size",filterStore.portionSizes.values);
    }
)


// const porte = ref('');
// const { port } = UseItem();

// watch(porte, (newport) => {
//     port.value = newport;
// });

// const selectPortion = (label) => {
//     if (porte.value === label) {
//         porte.value = '';
//     } else {
//         porte.value = label;
//     }
// };
</script>

<template>
    <label for="portion">Portion</label>
    <ul class="bot">
        <li v-for="p in filterStore.portionSizes" :key="p.id">
            <portion 
                :title="p.label"
               
                :id="'part' + p.id" 
                
            />
        </li>
    </ul>
</template>

<style>
.bot {
   
    width: 100%;
    height: auto;
}
</style>
