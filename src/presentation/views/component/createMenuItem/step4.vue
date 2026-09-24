<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { IStep } from "@/data/repositories/StepRepository";
import RetourButton from "../../comom/RetourButton.vue";
import ActionButton from "../../comom/ActionButton.vue";
import InputField from "../../comom/InputField.vue";
import IngredientInput from "../../comom/IngredientInput.vue";
import { Form } from "vee-validate";
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateMenuItem } from "@/presentation/stores/useCreateMenuItem";
import { useRoute } from 'vue-router';

defineProps<{
  itemStep: IStep;
}>();

const emit = defineEmits(["prev", "finish"]);
const createStore = useCreateMenuItem();
const route = useRoute();

const formatPreparationTime = (val: any): string => {
  if (typeof val === "number") {
    const hours = Math.floor(val / 60).toString().padStart(2, '0');
    const minutes = (val % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return val ? String(val) : "";
};

const rawTime = createStore.formState.preparationTime ?? (createStore.formState as any).preparation_time ?? "";

const quantity = ref<number>(createStore.formState.stock?.quantity ?? 0);
const temps = ref<string>(formatPreparationTime(rawTime));
const seuil = ref<number>(createStore.formState.stock?.alert_threshold ?? 0);
const dietary = ref<string[]>(createStore.formState.dietary || []);

watch(
  () => createStore.formState,
  (newState) => {
    if (newState) {
      if (newState.stock?.quantity !== undefined) {
        quantity.value = newState.stock.quantity;
      }
      if (newState.stock?.alert_threshold !== undefined) {
        seuil.value = newState.stock.alert_threshold;
      }
      
      const incomingTime = newState.preparationTime ?? (newState as any).preparation_time;
      if (incomingTime !== undefined) {
        temps.value = formatPreparationTime(incomingTime);
      }
      
      if (newState.dietary) {
        dietary.value = newState.dietary;
      }
    }
  },
  { immediate: true, deep: true }
);

const isEditing = computed(() => {
  return !!route.params.id || !!createStore.formState.id;
});

const validationSchema = toTypedSchema(
  zod.object({
    quantity: zod.number({ invalid_type_error: "Required" }).min(0, "Must be positive"),
    seuil: zod.number({ invalid_type_error: "Required" }).min(0, "Must be positive"),
    temps: zod.string().min(1, "Preparation time is required"),
  })
);

const initialValues = computed(() => ({
  quantity: quantity.value,
  seuil: seuil.value,
  temps: temps.value,
}));

const onSubmit = (values: any) => {
  createStore.updateForm({
    stock: {
      quantity: quantity.value,
      alert_threshold: seuil.value,
      sold_by_unit: createStore.formState.stock?.sold_by_unit ?? true,
      in_stock: quantity.value > 0,
    },
    preparationTime: temps.value,
    dietary: dietary.value,
  });

  emit("finish");
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h3 class="text-xl font-bold text-gray-950">
        {{ itemStep.id }}. {{ itemStep.title }}
      </h3>
      <p class="text-sm text-gray-500 mt-1">{{ itemStep.description }}</p>
    </div>

    <Form 
      @submit="onSubmit" 
      :validation-schema="validationSchema"
      :initial-values="initialValues"
      class="flex flex-col gap-6"
    >
      <div class="flex flex-col gap-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700">Stock</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField 
              name="quantity" 
              type="number"
              label="Stock quantity" 
              placeholder="100" 
              v-model="quantity"
              @update:modelValue="($event) => (quantity = $event)"
            />
            <InputField 
              name="seuil" 
              type="number"
              label="Alert threshold" 
              placeholder="5"
              v-model="seuil"
              @update:modelValue="($event) => (seuil = $event)" 
            />
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <InputField 
            name="temps" 
            type="time"
            label="Preparation time" 
            :required="true"
            v-model="temps"
            @update:modelValue="($event) => (temps = $event)"
          />
        </div>

        <div class="pt-4 border-t border-gray-100">
          <IngredientInput v-model="dietary" />
        </div>

      </div>

      <div class="flex justify-between pt-4 border-t border-gray-100">
        <RetourButton type="button" @click="emit('prev')" />
        <ActionButton
          :label="isEditing ? 'Update product' : 'Create product'"
          variant="finish"
          type="submit"
        />
      </div>
    </Form>
  </div>
</template>