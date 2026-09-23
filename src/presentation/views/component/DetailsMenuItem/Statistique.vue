<script setup lang="ts">
import { ChartArea } from 'lucide-vue-next';
import { MenuItem } from '@/domain/entities/MenuItem';
defineProps<{
    item:MenuItem
}>();
</script>
<template>
    <div>
        <div>
            <div>
                <ChartArea />
                <h2>Statistic</h2>
            </div>
            <div></div>
        </div>
        <div></div>

    </div>
</template>