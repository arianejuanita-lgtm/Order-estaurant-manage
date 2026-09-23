<script lang="ts" setup>
import {  Pencil } from "lucide-vue-next";
defineProps<{
    click?:()=>void;
}>();
</script>

<template>
     <div @click.stop.prevent="click" class="w-8 h-8 bg-white/85 hover:bg-white rounded-full flex items-center justify-center cursor-pointer pointer-events-auto shadow-md transition-colors">
            <Pencil :size="16" class="text-gray-700" />
        </div>
</template>