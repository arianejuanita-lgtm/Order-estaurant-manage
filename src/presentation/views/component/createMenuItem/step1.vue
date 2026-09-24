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
import SelectCategory from '../../comom/SelectCategory.vue';
import CheckBoxGroup from '../../comom/CheckBoxGroup.vue';
import ImageUpload from '../../comom/ImageUpload.vue';

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

const previewImage = ref<string>(createStore.formState.image);
const nameValue = ref<string>(createStore.formState.name);
const categoryValue = ref<string>(createStore.formState.category);
const descValue = ref<string>(createStore.formState.description);
const isAvailable = ref<boolean>(createStore.formState.isAvailable);
const dietaryValue = ref<string[]>(createStore.formState.dietary);
const portionSizeValue = ref<string[]>(createStore.formState.portionSizes);

const handleImageUpdate = (newImage: string) => {
    previewImage.value = newImage;
    createStore.updateForm({ image: newImage });
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
            <ImageUpload 
                :model-value="previewImage" 
                @update:model-value="handleImageUpdate" 
            />

            <InputField 
                name="name" 
                label="Product name" 
                placeholder="Ex: Deluxe Burger" 
                :required="true"
                v-model="nameValue"
                :max-length="100"
                @update:modelValue="($event) => (nameValue = $event)"
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
                @update:modelValue="($event) => (categoryValue = $event)"
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
                @update:modelValue="($event) => (descValue = $event)"
            />

            <Disponibility
                v-model="isAvailable"
                title="Product available"
                description="The product is visible in your menu"
                @update:modelValue="($event) => (isAvailable = $event)"
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