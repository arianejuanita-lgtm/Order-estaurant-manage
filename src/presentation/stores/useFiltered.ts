import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useMenuItem } from "./useMenuItem";

export const useFiltered = defineStore("filtered", () => {
  const menuStore = useMenuItem();

  const catego = ref<string>("");
  const diate = ref<string>("");
  const port = ref<string>("");
  const price = ref<number>(0);

  const finalMenu = computed(() => {
    console.log('finalMenu');
    let result = menuStore.menuItems;

    if (catego.value) {
        console.log("catego.value",catego.value);
      result = result.filter((item) => item.category === catego.value);
    }
    if (diate.value) {
      result = result.filter((x) => x.dietary.includes(diate.value));
    }
    if (port.value) {
      result = result.filter((x) => x.portionSizes.includes(port.value));
    }
    if (price.value) {
      result = result.filter((x) => Math.round(x.price) === Number(price.value));
    }

    return result;
  });

  const clearFilter = () => {
    catego.value = "";
    diate.value = "";
    port.value = "";
    price.value = 0;
  };

  return {
    catego,
    diate,
    port,
    price,
    menu: finalMenu,
    clearFilter
  };
});