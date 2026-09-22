<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { IStep } from "@/data/repositories/StepRepository";
import RetourButton from "../../comom/RetourButton.vue";
import ActionButton from "../../comom/ActionButton.vue";
import InputField from "../../comom/InputField.vue";
import VariantInput, { type IVariants } from "../../comom/VariantInput.vue";
import { Form, Field } from "vee-validate";
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useSupplement } from "@/presentation/stores/useSupplement.ts";
import { useCreateMenuItem } from "@/presentation/stores/useCreateMenuItem";

defineProps<{
  itemStep: IStep;
}>();

const emit = defineEmits(["next", "prev"]);

const validationSchema = toTypedSchema(
  zod.object({
    price: zod
      .number({ invalid_type_error: "Le prix est requis" })
      .min(0, "Le prix ne peut pas être négatif"),
    supplements: zod.array(zod.string()).optional(),
  }),
);

const supplementStore = useSupplement();
const createStore = useCreateMenuItem();

onMounted(async () => {
  await supplementStore.fetchSupplement();
});

const initialValues = {
  price: createStore.formState.price || 0,
  supplements: createStore.formState.supplements || [],
};

const variantsList = ref<IVariants[]>(createStore.formState.variants || []);

const onSubmit = (values: any) => {
  createStore.updateForm({
    price: values.price,
    supplements: values.supplements || [],
    variants: variantsList.value,
  });

  console.log("Données validées et enregistrées de l'étape 2 :", createStore.formState);
  emit("next");
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h3 class="text-xl font-bold text-gray-900">
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
      <div class="w-full">
        <InputField
          name="price"
          label="Prix de vente"
          placeholder="Ex: 2500"
          :required="true"
          type="number"
        />
      </div>

      <VariantInput v-model="variantsList" />

      <div class="flex flex-col gap-2.5">
        <label class="text-sm font-medium text-gray-700">Suppléments disponibles</label>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <label
            v-for="supp in supplementStore.supplements"
            :key="supp.id"
            class="flex items-center justify-between p-2.5 sm:p-3.5 border border-gray-200 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-gray-50 transition-all shadow-sm bg-white"
          >
            <div class="flex items-center gap-2 truncate">
              <Field
                name="supplements"
                type="checkbox"
                :value="supp.id"
                class="w-4 h-4 accent-amber-500 rounded border-gray-300 focus:ring-amber-400 shrink-0 cursor-pointer"
              />
              <span class="text-xs sm:text-sm font-semibold text-gray-800 truncate" :title="supp.label">
                {{ supp.label }}
              </span>
            </div>
            <div class="text-xs sm:text-sm font-bold text-amber-600 shrink-0 pl-1">
              +{{ supp.price }}
            </div>
          </label>
        </div>
      </div>

      <div class="flex justify-between pt-4 border-t border-gray-100">
        <RetourButton type="button" @click="emit('prev')" />
        <ActionButton label="Suivant" variant="next" type="submit" />
      </div>
    </Form>
  </div>
</template>