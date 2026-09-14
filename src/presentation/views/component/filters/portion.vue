<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { useFiltered } from '@/presentation/stores/useFiltered.ts';
import portion from '../../comom/Portion.vue';

const filterStore = useFilter();
const filter = useFiltered();

onMounted(async () => {
    await filterStore.fecthPortionSizeMenuItems();
});

const porte = ref<string>('');

watch(porte, (newport) => {
    filter.port = newport;
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
    <label for="portion">Portion</label>
    <div class="bot">
        <div v-for="p in filterStore.portionSizes" :key="p.id">
            <portion 
                :title="p.label"
                :ontap="() => selectPortion(p.label)"
                :is-selected="porte === p.label"
                :id="'part' + p.id" 
            />
        </div>
    </div>
</template>

<style>
.bot {
    width: 220px;
    height: auto;
    display: inline-flex;
    justify-content: space-between;
    align-items: flex-start;
}
</style>