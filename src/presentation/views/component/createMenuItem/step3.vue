<script lang="ts" setup>
import { ref } from 'vue';
import type { IStep } from '@/data/repositories/StepRepository';
import RetourButton from '../../comom/RetourButton.vue';
import ActionButton from '../../comom/ActionButton.vue';
import Disponibility from '../../comom/disponibility.vue';
import ModeVente from '../../comom/ModeVente.vue';
import { Truck, Store } from 'lucide-vue-next';
import { Form } from 'vee-validate';
import { useCreateMenuItem } from '@/presentation/stores/useCreateMenuItem';

defineProps<{
    itemStep: IStep
}>();

const emit = defineEmits(['next', 'prev']);
const createStore = useCreateMenuItem();

const isAvailable = ref<boolean>(createStore.formState.isAvailable);
const isSurPlace = ref<boolean>(createStore.formState.salesModes.dine_in);
const isEmporter = ref<boolean>(createStore.formState.salesModes.takeaway);
const isLivraison = ref<boolean>(createStore.formState.salesModes?.delivery);

const onSubmit = () => {
    createStore.updateForm({
        isAvailable: isAvailable.value,
        salesModes: { 
            dine_in: isSurPlace.value, 
            takeaway: isEmporter.value, 
            delivery: isLivraison.value 
        },
    });

    console.log("Validated and saved data from step 3:", createStore.formState);
    emit('next');
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <div>
            <h3 class="text-xl font-bold text-gray-900">{{ itemStep.id }}. {{ itemStep.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ itemStep.description }}</p>
        </div>

        <Form @submit="onSubmit" class="flex flex-col gap-6">
            <div class="flex flex-col gap-4">
                
                <Disponibility
                    v-model="isAvailable"
                    title="Available for sale"
                    description="The product is visible in your menu"
                    @update:modelValue="($event) => (isAvailable = $event)"
                />

                <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium text-gray-700">Sales mode</label>
                    
                    <ModeVente
                        v-model="isSurPlace"
                        title="Dine-in"
                        :icon="Store"
                        @update:modelValue="($event) => (isSurPlace = $event)"
                    />

                    <ModeVente
                        v-model="isEmporter"
                        title="Takeaway"
                        :icon="Store"
                        @update:modelValue="($event) => (isEmporter = $event)"
                    />

                    <ModeVente
                        v-model="isLivraison"
                        title="Delivery"
                        :icon="Truck"
                        @update:modelValue="($event) => (isLivraison = $event)"
                    />
                </div>

            </div>

            <div class="flex justify-between pt-4 border-t border-gray-100">
                <RetourButton type="button" @click="emit('prev')" />
                <ActionButton 
                    label="Next" 
                    variant="next" 
                    type="submit"
                />
            </div>
        </Form>
    </div>
</template>