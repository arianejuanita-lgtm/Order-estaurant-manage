import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useMenuItem } from "./useMenuItem";

export const useFiltered = defineStore("filtered", () => {
  const menuStore = useMenuItem();

  const catego = ref<string[]>([]);
  const diate = ref<string[]>([]);
  const port = ref<string[]>([]);
  const price = ref<number>(0);
  const title = ref<string>("");

  const finalMenu = computed(() => {
    let result = menuStore.menuItems;

    if (title.value) {
      const searchTerm = title.value.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm),
      );
    }

    if (catego.value.length > 0) {
      result = result.filter((item) => {
        return catego.value.includes(item.category);
      });
    }

    if (diate.value.length > 0) {
      result = result.filter((item) => {
        return diate.value.some((d) => item.dietary.includes(d));
      });
    }

    if (port.value.length > 0) {
      result = result.filter((item) => {
        return port.value.some((p) => item.portionSizes?.includes(p));
      });
    }

    if (price.value) {
      result = result.filter(
        (x) => Math.round(x.price) === Number(price.value),
      );
    }

    return result;
  });

  const clearFilter = () => {
    catego.value = []; 
    diate.value = [];
    port.value = [];
    price.value = 0;
    title.value = "";
  };

  return {
    catego,
    diate,
    port,
    price,
    title,
    menu: finalMenu,
    clearFilter,
  };
});