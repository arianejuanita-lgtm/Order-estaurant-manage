<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { IStep } from '@/data/repositories/StepRepository';
import ActionButton from '../../comom/ActionButton.vue';
import InputField from '../../comom/InputField.vue';
import TextareaField from '../../comom/TextareaField.vue';
import { Form, ErrorMessage } from 'vee-validate';
import * as zod from "zod";
import { toTypedSchema } from '@vee-validate/zod';
import { useFilter } from '@/presentation/stores/useFilter.ts';
import { useCreateMenuItem } from '@/presentation/stores/useCreateMenuItem';
import Disponibility from '../../comom/disponibility.vue';
import { Camera, RefreshCw } from 'lucide-vue-next';
import SelectCategory from '../../comom/SelectCategory.vue';
import CheckBoxGroup from '../../comom/CheckBoxGroup.vue';

defineProps<{
    itemStep: IStep
}>();
const emit = defineEmits(['next']);

const filterStore = useFilter();
const createStore = useCreateMenuItem();

const validationSchema = toTypedSchema(
    zod.object({
        name: zod.string().min(1, "Product name is required").max(100, "Maximum 100 characters"),
        category: zod.string().min(1, "Category is required"),
        description: zod.string().max(500, "Maximum 500 characters").optional(),
    })
);

onMounted(async () => {
    await filterStore.fecthCategoryMenuItems();
    await filterStore.fecthPortionSizeMenuItems();
    await filterStore.fecthdietariesMenuItems();
});

const fileInputRef = ref<HTMLInputElement | null>(null);

const previewImage = ref<string>(createStore.formState.image);
const nameValue = ref<string>(createStore.formState.name);
const categoryValue = ref<string>(createStore.formState.category);
const descValue = ref<string>(createStore.formState.description);
const isAvailable = ref<boolean>(createStore.formState.isAvailable);
const dietaryValue = ref<string[]>(createStore.formState.dietary);
const portionSizeValue = ref<string[]>(createStore.formState.portionSizes)

const triggerFileInput = () => {
    fileInputRef.value?.click();
};

const onFileSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        previewImage.value = URL.createObjectURL(file);
        createStore.updateForm({ image: previewImage.value });
    }
};

const onSubmit = (values: any) => {
    createStore.updateForm({
        name: values.name || nameValue.value,
        category: categoryValue.value,
        description: values.description || descValue.value,
        image: previewImage.value,
        isAvailable: isAvailable.value,
        dietary: dietaryValue.value,
        portionSizes: portionSizeValue.value,
    });

    console.log("Valid form, moving to next step:", createStore.formState);
    emit('next');
};

const onInvalidSubmit = ({ errors }: { errors: any }) => {
    console.log("Zod validation failed. Errors:", errors);
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <div>
            <h3 class="text-xl font-bold text-gray-900">{{ itemStep.id }}. {{ itemStep.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ itemStep.description }}</p>
        </div>

        <Form 
            @submit="onSubmit" 
            @invalid-submit="onInvalidSubmit" 
            :validation-schema="validationSchema"
            class="flex flex-col gap-6"
        >
            
            <input 
                ref="fileInputRef" 
                type="file" 
                accept="image/png, image/jpeg" 
                class="hidden" 
                @change="onFileSelected"
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                <div 
                    @click="triggerFileInput"
                    :class="[
                        'border-2 border-dashed border-gray-300 hover:border-amber-400 bg-gray-50 hover:bg-amber-50/20 rounded-2xl p-6 flex-col items-center justify-center text-center cursor-pointer transition-all h-52 gap-3',
                        previewImage ? 'hidden md:flex' : 'flex'
                    ]"
                >
                    <div class="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-amber-500">
                        <Camera class="w-6 h-6" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <p class="font-semibold text-gray-800 text-sm">Add a photo</p>
                        <p class="text-xs text-gray-400">Drag and drop an image or click to browse JPG, PNG (max 5 MB)</p>
                    </div>
                </div>
                
                <div 
                    :class="[
                        'border border-gray-200 bg-gray-50 rounded-2xl p-4 flex-col items-center justify-center relative h-52 overflow-hidden shadow-sm w-full',
                        previewImage ? 'flex' : 'hidden md:flex'
                    ]"
                >
                    <template v-if="!previewImage">
                        <div class="flex flex-col items-center justify-center text-gray-400 text-center gap-2">
                            <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                                <Camera class="w-5 h-5" />
                            </div>
                            <p class="text-xs">No image selected</p>
                        </div>
                    </template>

                    <template v-else>
                        <img :src="previewImage" alt="Preview" class="w-full h-full object-cover rounded-xl absolute inset-0" />
                        <button 
                            type="button"
                            @click="triggerFileInput"
                            class="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold px-4 py-2 rounded-xl shadow-md backdrop-blur-sm transition-all cursor-pointer"
                        >
                            <RefreshCw class="w-3.5 h-3.5 text-amber-500" />
                            <span>Change</span>
                        </button>
                    </template>
                </div>
            </div>

            <InputField 
                name="name" 
                label="Product name" 
                placeholder="Ex: Deluxe Burger" 
                :required="true"
                v-model="nameValue"
                :max-length="100"
            />

            <SelectCategory
                id="category"
                label="Category"
                placeholder="Select a category"
                item-label="label"
                item-key="label"
                item-value="label"
                name="category"
                :options="filterStore.categories"
                v-model="categoryValue"
            />
            <ErrorMessage name="category" class="text-xs text-red-500 mt-0.5" />

            <div class="flex flex-col">
                <CheckBoxGroup
                    label="Dietary"
                    name="dietary"
                    item-label="label"
                    item-key="label"
                    :options="filterStore.dietaries"
                    :model-value="dietaryValue"
                    @update:modelValue="($event) => (dietaryValue = $event)"
                />
                <ErrorMessage name="dietary" class="text-red-500 text-xs mt-1" />
            </div>

            <div class="flex flex-col">
                <CheckBoxGroup
                    label="Portion Sizes"
                    name="portion_sizes"
                    item-label="label"
                    item-key="id"
                    :options="filterStore.portionSizes"
                    :modelValue="portionSizeValue"
                    @update:modelValue="($event) => (portionSizeValue = $event)"
                />
                <ErrorMessage name="portion_sizes" class="text-red-500 text-xs mt-1" />
            </div>

            <TextareaField 
                name="description" 
                label="Description" 
                placeholder="Describe your product..." 
                v-model="descValue"
                :max-length="500"
            />

            <Disponibility
                v-model="isAvailable"
                title="Product available"
                description="The product is visible in your menu"
            />

            <div class="flex justify-end pt-4 border-t border-gray-100">
                <ActionButton 
                    label="Next" 
                    variant="next" 
                />
            </div>

        </Form>
    </div>
</template>