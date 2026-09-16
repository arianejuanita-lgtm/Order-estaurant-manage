<script setup lang="ts">
import { reactive } from "vue";
import { useFilter } from "../stores/useFilter";
import { useMenuItem } from "../stores/useMenuItem";
import { MenuItem } from "@/domain/entities/MenuItem";
import FormGroup from "./comom/FormGroup.vue";
import Boutton from "./comom/Boutton.vue";
import CheckBoxGroup from "./comom/CheckBoxGroup.vue";
import rowCheck from "./comom/rowCheck.vue";
import SelectCategory from "./comom/SelectCategory.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import FormTextArea from "./comom/FormTextArea.vue";
import FormFile from "./comom/FormFile.vue";

const emit = defineEmits(["close"]);

const filterStore = useFilter();
const menuStore = useMenuItem();

interface ProductForm {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  delivery_time: string;
  category: string;
  dietary: string[];
  image: string;
  is_available: boolean;
  portion_sizes: string[];
}

const form = reactive<ProductForm>({
  id: Date.now(),
  name: "",
  description: "",
  price: 1,
  rating: 0,
  reviews: 0,
  delivery_time: "10 min",
  category: "",
  dietary: [],
  image: "",
  is_available: false,
  portion_sizes: [],
});

const validationSchema = toTypedSchema(
  zod.object({
    name: zod.string().min(1, "Name is required"),
    description: zod.string().min(1, "Description is required"),
    price: zod.coerce
      .number()
      .min(1, "Price must be greater than or equal to 1"),
    delivery: zod.string().min(1, "Delivery time is required"),
    rating: zod.number().min(0).max(5),
    reviews: zod.number().min(0),
    category: zod.string().min(1, "Please select a category"),
    image: zod.string().min(1, "Image is required"),
    dietary: zod.array(zod.string()),
    portion_sizes: zod.array(zod.string()).min(1, "Select at least one portion size"),
  }),
);

const handleSubmit = async () => {
  const newItem = new MenuItem({
    id: form.id,
    name: form.name,
    description: form.description,
    price: Number(form.price),
    rating: Number(form.rating),
    reviews: Number(form.reviews),
    delivery_time: form.delivery_time,
    category: form.category,
    dietary: form.dietary,
    image: form.image,
    is_available: form.is_available,
    portion_sizes: form.portion_sizes,
  });

  await menuStore.addMenuItem(newItem);
  emit("close");
};
</script>

<template>
  <div class="max-w-full mx-auto p-4 bg-white font-sans">
    <h2 class="text-2xl font-bold text-gray-900 mb-5">Add Menu Item</h2>

    <Form
      @submit="handleSubmit"
      :validation-schema="validationSchema"
      class="space-y-4"
    >
      <div class="flex flex-col">
        <FormGroup
          labelFor="name"
          title="Name"
          typeField="text"
          name="name"
          idu="name"
          :modelValue="form.name"
          @update:modelValue="form.name = $event"
        />
        <ErrorMessage name="name" class="text-red-500 text-xs mt-1" />
      </div>

      <div class="flex flex-col">
        <FormTextArea
          idu="description"
          title="Description"
          name="description"
          :modelValue="form.description"
          @update:modelValue="form.description = $event"
        />
        <ErrorMessage name="description" class="text-red-500 text-xs mt-1" />
      </div>

      <div class="flex gap-4">
        <div class="flex-1 flex flex-col">
          <FormGroup
            labelFor="price"
            title="Price ($)"
            typeField="number"
            step="0.01"
            name="price"
            idu="price"
            :modelValue="form.price"
            @update:modelValue="form.price = Number($event)"
          />
          <ErrorMessage name="price" class="text-red-500 text-xs mt-1" />
        </div>

        <div class="flex-1 flex flex-col">
          <FormGroup
            labelFor="delivery_time"
            title="Delivery Time"
            typeField="time"
            name="delivery"
            idu="delivery_time"
            :modelValue="form.delivery_time"
            @update:modelValue="form.delivery_time = $event"
          />
          <ErrorMessage name="delivery" class="text-red-500 text-xs mt-1" />
        </div>
      </div>

      <div class="flex gap-4">
        <div class="flex-1 flex flex-col">
          <FormGroup
            labelFor="rating"
            title="Rating"
            typeField="number"
            name="rating"
            idu="rating"
            step="0.1"
            min="0"
            max="5"
            :modelValue="form.rating"
            @update:modelValue="form.rating = Number($event)"
          />
          <ErrorMessage name="rating" class="text-red-500 text-xs mt-1" />
        </div>

        <div class="flex-1 flex flex-col">
          <FormGroup
            labelFor="reviews"
            title="Reviews"
            typeField="number"
            name="reviews"
            idu="reviews"
            :modelValue="form.reviews"
            @update:modelValue="form.reviews = Number($event)"
          />
          <ErrorMessage name="reviews" class="text-red-500 text-xs mt-1" />
        </div>
      </div>

      <div class="flex flex-col">
        <SelectCategory
          id="category"
          label="Category"
          placeholder="Select a category"
          item-label="label"
          item-key="label"
          item-value="label"
          name="category"
          :options="filterStore.categories"
          v-model="form.category"
        />
        <ErrorMessage name="category" class="text-red-500 text-xs mt-1" />
      </div>

      <div class="flex flex-col">
        <CheckBoxGroup
          label="Dietary"
          name="dietary"
          item-label="label"
          item-key="label"
          :options="filterStore.dietaries"
          :model-value="form.dietary"
          @update:modelValue="($event) => (form.dietary = $event)"
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
          :modelValue="form.portion_sizes"
          @update:modelValue="($event) => (form.portion_sizes = $event)"
        />
        <ErrorMessage name="portion_sizes" class="text-red-500 text-xs mt-1" />
      </div>

      <div class="flex flex-col">
        <FormFile
          label="Image File"
          idu="image"
          name="image"
          v-model="form.image"
        />
        <ErrorMessage name="image" class="text-red-500 text-xs mt-1" />
      </div>

      <div class="flex flex-col">
        <rowCheck
          title="Available"
          typeField="checkbox"
          name="is_available"
          :modelvalue="form.is_available"
          @update:modelValue="($event) => (form.is_available = $event)"
        />
      </div>

      <Boutton
        class="block mx-auto w-48 p-3 bg-amber-400 border-none rounded-lg font-bold text-base cursor-pointer transition-colors hover:bg-amber-500 mt-4 text-black"
        type="submit"
        title="Save"
        :haut="60"
      />
    </Form>
  </div>
</template>