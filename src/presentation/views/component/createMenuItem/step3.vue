<script lang="ts" setup>
import { ref } from 'vue';
import type { IStep } from '@/data/repositories/StepRepository';
import RetourButton from '../../comom/RetourButton.vue';
import ActionButton from '../../comom/ActionButton.vue';
import Disponibility from '../../comom/disponibility.vue';
defineProps<{
    itemStep: IStep
}>();
const isAvailable = ref(true);

const emit = defineEmits(['next', 'prev']);
</script>

<template>
    <div class="flex flex-col gap-6">
        <div>
            <h3 class="text-xl font-bold text-gray-900">{{itemStep.id}}. {{ itemStep.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ itemStep.description }}</p>
        </div>

        <div class="py-8 text-gray-400  border-gray-200 rounded-xl flex items-center justify-center">
            
 
            <Disponibility
            :isAvailable="isAvailable"
            title="Produit disponible"
            description="Le produit est visible dans votre menu"
            />

            <div>
                <label for="mode">Mode de vente </label>

                
            </div>


        </div>

          <div class="flex justify-between pt-4 border-t border-gray-100">
                <RetourButton type="button" @click="emit('prev')" />
                <ActionButton 
                    label="Suivant" 
                    variant="next" 
                    type="submit"
                />
            </div>
    </div>
</template>