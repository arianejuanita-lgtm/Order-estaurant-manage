<script setup lang="ts">
import { router } from '@/router/routes.ts';
import { CircleArrowLeft } from 'lucide-vue-next';

const redirect = () => {
    router.push("/");
}
</script>
<template>
            <div @click="redirect" class="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-black w-fit">
                <CircleArrowLeft class="w-5 h-5" />
                <p class="font-medium">Back to products</p>
            </div>
</template>