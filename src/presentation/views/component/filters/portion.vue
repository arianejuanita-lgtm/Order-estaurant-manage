<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { useFiltered } from '@/presentation/stores/useFiltered.ts';
import portionComponent from '../../comom/Portion.vue';

const filterStore = useFilter();
const filter = useFiltered();

onMounted(async () => {
    await filterStore.fecthPortionSizeMenuItems();
});

const porte = ref<string>('');

watch(porte, (newport) => {
    filter.port = newport;
});

watch(() => filter.port, (newStorePort) => {
    if (!newStorePort) {
        porte.value = '';
    }
});

const selectPortion = (label: string) => {
    if (porte.value === label) {
        porte.value = '';
    } else {
        porte.value = label;
    }
};
</script>

<template>
    <div class="flex flex-col gap-2">
        <label for="portion" class="text-xs font-bold uppercase tracking-wider text-gray-500">Portion</label>
        <div class="flex flex-wrap gap-2 items-start">
            <div v-for="p in filterStore.portionSizes" :key="p.id">
                <portionComponent 
                    :title="p.label"
                    :ontap="() => selectPortion(p.label)"
                    :is-selected="porte === p.label"
                    :id="'part' + p.id" 
                />
            </div>
        </div>
    </div>
</template>