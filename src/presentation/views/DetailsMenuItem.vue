<script setup lang="ts">
import ActionMenu from './component/DetailsMenuItem/ActionMenu.vue';
import Infos from './component/DetailsMenuItem/Infos.vue';
import BackProduct from './comom/BackProduct.vue';
import Statistique from './component/DetailsMenuItem/Statistique.vue';
import Status from './component/DetailsMenuItem/Status.vue';
import VariantsSupp from './component/DetailsMenuItem/VariantsSupp.vue';
import { useMenuItem } from '../stores/useMenuItem.ts';
import { computed, onMounted, ref } from 'vue';
import Loading from './comom/Loading.vue';

const props = defineProps<{
    id: number; 
}>();

const menuStore = useMenuItem();
const isLoading = ref(false);

onMounted(async () => {
    if (menuStore.menuItems.length === 0) {
        isLoading.value = true;
        await menuStore.fecthMenuItems();
        isLoading.value = false;
    }
});

const currentMenuItem = computed(() => {
  return menuStore.menuItems.find((x) => x.id === Number(props.id));
});
</script>

<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        <BackProduct />
        <Loading :isLoading="isLoading"/>


        <div v-if="!currentMenuItem" class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p class="text-base font-semibold text-red-600">Unavailable Product.</p>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            <div class="lg:col-span-3 flex flex-col gap-6">
                <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <Infos :item="currentMenuItem"/>
                </div>
                <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <VariantsSupp :item="currentMenuItem" />
                </div>
            </div>

            <div class="lg:col-span-1 flex flex-col gap-6">
                    <div>
                        <Status :item="currentMenuItem" />
                    </div>
                    
                    <div>
                        <ActionMenu :item="currentMenuItem" />
                    </div>
                
 
                <!-- <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <Statistique :item="currentMenuItem" />
                </div> -->
            </div>
        </div>
    </div>
</template>