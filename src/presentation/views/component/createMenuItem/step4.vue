<script lang="ts" setup>
import { ref } from "vue";
import type { IStep } from "@/data/repositories/StepRepository";
import RetourButton from "../../comom/RetourButton.vue";
import ActionButton from "../../comom/ActionButton.vue";
import InputField from "../../comom/InputField.vue";
import IngredientInput from "../../comom/IngredientInput.vue";
import { Form } from "vee-validate";
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useMenuItem } from "@/presentation/stores/useMenuItem.ts";
import { useCreateMenuItem } from "@/presentation/stores/useCreateMenuItem";
import { useRouter } from 'vue-router'

defineProps<{
  itemStep: IStep;
}>();

const emit = defineEmits(["prev", "finish"]);
const createStore = useCreateMenuItem();
const menuItemStore = useMenuItem();

const validationSchema = toTypedSchema(
  zod.object({
    quantity: zod.number({ invalid_type_error: "Required" }).min(0, "Must be positive"),
    seuil: zod.number({ invalid_type_error: "Required" }).min(0, "Must be positive"),
    temps: zod.string().min(1, "Preparation time is required"),
  })
);

const initialValues = {
  quantity: createStore.formState.stock?.quantity ?? 0,
  seuil: createStore.formState.stock?.alert_threshold ?? 0,
  temps: createStore.formState.preparationTime ?? "",
};

const dietaryList = ref<string[]>(createStore.formState.dietary || []);
const router = useRouter()
const onSubmit = (values: any) => {
  createStore.updateForm({
    stock: {
      quantity: values.quantity,
      alert_threshold: values.seuil,
      sold_by_unit: createStore.formState.stock?.sold_by_unit ?? true,
      in_stock: values.quantity > 0,
    },
    preparationTime: values.temps,
    dietary: dietaryList.value,
  });

  menuItemStore.addMenuItem(createStore.formState);
  router.push("/sucess");
  createStore.resetForm();

  console.log("Final product successfully created:", createStore.formState);
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
              :required="true"
            />
            <InputField 
              name="seuil" 
              type="number"
              label="Alert threshold" 
              placeholder="5" 
              :required="true"
            />
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <InputField 
            name="temps" 
            type="time"
            label="Preparation time" 
            :required="true"
          />
        </div>

        <div class="pt-4 border-t border-gray-100">
          <IngredientInput v-model="dietaryList" />
        </div>

      </div>

      <div class="flex justify-between pt-4 border-t border-gray-100">
        <RetourButton type="button" @click="emit('prev')" />
        <ActionButton
          label="Create product"
          variant="finish"
          type="submit"
        />
      </div>
    </Form>
  </div>
</template>