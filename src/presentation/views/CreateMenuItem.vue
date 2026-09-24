<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMenuItem } from '@/presentation/stores/useMenuItem';
import Step1 from './component/createMenuItem/step1.vue';
import Step2 from './component/createMenuItem/step2.vue';
import Step3 from './component/createMenuItem/step3.vue';
import Step4 from './component/createMenuItem/step4.vue';
import ApercueItem from './component/createMenuItem/apercueItem.vue';
import { steps } from '@/data/repositories/StepRepository.ts';
import BackProduct from './comom/BackProduct.vue';
import type { MenuItem } from '@/domain/entities/MenuItem';
import { useCreateMenuItem } from '../stores/useCreateMenuItem.ts';
import IncompleteStep from './comom/IncompleteStep.vue';
import DialogBox from './comom/DialogBox.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const menuStore = useMenuItem();
const createStore = useCreateMenuItem();
const currentItem = ref<MenuItem | undefined>(undefined);
const currentStepId = ref(1);

const isEditMode = computed(() => !!route.params.id);

onMounted(() => {
    if (isEditMode.value) {
        const id = Number(route.params.id);
        const foundItem = menuStore.menuItems.find(i => i.id === id);
        if (foundItem) {
            currentItem.value = foundItem;
            createStore.updateForm(foundItem); 
        }
    } else {
        createStore.resetForm();
    }
});

const nextStep = () => {
    if (currentStepId.value < steps.length) {
        currentStepId.value++;
    }
};

const prevStep = () => {
    if (currentStepId.value > 1) {
        currentStepId.value--;
    }
};

const emit = defineEmits(["edit"]);

const isDialogOpen = ref(false);

const finishForm = () => {
    if (isEditMode.value) {
        isDialogOpen.value = true;
        router.push("/home");
    } else {
        menuStore.addMenuItem(createStore.formState);
        router.push("/success");
        console.log("Final product successfully created:", createStore.formState);
    }
};

const handleConfirmEdit = () => {
    isDialogOpen.value = false;
    emit("edit", currentItem.value);
    console.log("Product successfully updated:", createStore.formState);
};

const isModalOpen = ref(false);
const modalMessage = ref("");

const showWarningModal = (message: string) => {
    modalMessage.value = message;
    isModalOpen.value = true;
};

const goToStep = (targetStepId: number) => {
    if (targetStepId <= currentStepId.value) {
        currentStepId.value = targetStepId;
        return;
    }

    if (targetStepId === 2) {
        if (!createStore.formState.name || !createStore.formState.category) {
            showWarningModal("Please fill in the required fields in Step 1 (Name and Category).");
            return;
        }
    }

    if (targetStepId === 3) {
        if (!createStore.formState.name || !createStore.formState.category) {
            showWarningModal("Please complete Step 1 first.");
            currentStepId.value = 1;
            return;
        }
        if (createStore.formState.price === undefined || createStore.formState.price < 0) {
            showWarningModal("Please enter a valid price in Step 2.");
            currentStepId.value = 2;
            return;
        }
    }

    if (targetStepId === 4) {
        if (!createStore.formState.name || !createStore.formState.category) {
            showWarningModal("Please complete Step 1 first.");
            currentStepId.value = 1;
            return;
        }
        if (createStore.formState.price === undefined || createStore.formState.price < 0) {
            showWarningModal("Please complete Step 2 first.");
            currentStepId.value = 2;
            return;
        }
    }

    currentStepId.value = targetStepId;
};
</script>

<template>
    <DialogBox
      :item="currentItem ?? null"
      :isOpen="isDialogOpen"
      mode="edit"
      @close="isDialogOpen = false"
      @confirm="handleConfirmEdit"
    />

    <div class="min-h-screen bg-gray-50 p-6 flex flex-col gap-8">
        <div class="flex flex-col gap-6">
            <BackProduct />

            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 class="text-3xl font-bold text-gray-900">
                    {{ isEditMode ? 'Edit product' : 'Create a product' }}
                </h2>
                
                <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                    <div 
                        v-for="stepItem in steps" 
                        @click="goToStep(stepItem.id)"
                        :key="stepItem.id"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer hover:opacity-90 select-none"
                        :class="[
                            currentStepId === stepItem.id 
                                ? 'bg-amber-400 text-gray-900 font-bold shadow-sm' 
                                : 'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-600'
                        ]"
                    >
                        <span class="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold"
                            :class="currentStepId === stepItem.id ? 'bg-white/40 text-gray-900' : 'bg-gray-300 text-gray-500'"
                        >
                            {{ stepItem.id }}
                        </span>
                        <div class="flex flex-col">
                            <p class="text-sm whitespace-nowrap">{{ stepItem.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!isEditMode || currentItem" class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            <div class="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Step1 v-if="currentStepId === 1" :itemStep="steps[0]!" :initialData="currentItem" @next="nextStep" />
                <Step2 v-else-if="currentStepId === 2" :itemStep="steps[1]!" :initialData="currentItem" @next="nextStep" @prev="prevStep" />
                <Step3 v-else-if="currentStepId === 3" :itemStep="steps[2]!" :initialData="currentItem" @next="nextStep" @prev="prevStep" />
                <Step4 v-else-if="currentStepId === 4" :itemStep="steps[3]!" :initialData="currentItem" @prev="prevStep" @finish="finishForm" />
            </div>

            <div class="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                <ApercueItem :item="currentItem" />
            </div>
        </div>
        
        <div v-else class="flex justify-center items-center py-20 text-gray-400">
            Loading Product ...
        </div>
    </div>
    
    <IncompleteStep
        v-model:is-modal-open="isModalOpen" 
        :modal-message="modalMessage" 
    />
</template>