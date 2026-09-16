<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { onMounted } from 'vue';
import { useFiltered } from '@/presentation/stores/useFiltered';

const filterStore = useFilter();
const filter = useFiltered();

onMounted(async () => {
    await filterStore.fecthdietariesMenuItems();
    console.log('filter diatery', filterStore.dietaries.values);
});

const dia = ref<string>('');

watch(dia, (newdiate) => {
    filter.diate = newdiate;
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <label for="diatery" class="text-xs font-bold uppercase tracking-wider text-gray-500">Dietary</label>
        <ul class="flex flex-col gap-2 m-0 p-0 list-none">
            <li v-for="diat in filterStore.dietaries" :key="diat.id">
                <label :for="'dia-' + diat.id" class="flex items-center gap-2.5 text-sm font-medium text-gray-700 cursor-pointer select-none hover:text-gray-900 transition-colors">
                    <input 
                        type="checkbox"
                        name="diat" 
                        v-model="dia"
                        :id="'dia-' + diat.id" 
                        :true-value="diat.label"
                        false-value=""
                        class="w-4 h-4 rounded border-gray-300 accent-[#F5BE18] cursor-pointer" 
                    /> 
                    {{ diat.label }}
                </label>
            </li>
        </ul>
    </div>
</template>