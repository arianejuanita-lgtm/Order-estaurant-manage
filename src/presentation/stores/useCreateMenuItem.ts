import { defineStore } from "pinia";
import { ref } from "vue";
import { MenuItem } from "@/domain/entities/MenuItem";
import { useMenuItem } from "./useMenuItem";

export const useCreateMenuItem = defineStore("createMenuItem", () => {
  const menuStore = useMenuItem();

  const formState = ref<MenuItem>(
    new MenuItem({
      id: (menuStore.menuItems?.length || 0) + 1,
      name: "",
      description: "",
      price: 0,
      rating: 0,
      reviews: 0,
      delivery_time: "",
      preparation_time: "",
      category: "",
      category_id: "",
      dietary: [],
      image: "",
      gallery: [],
      is_available: true,
      is_popular: false,
      status: "available",
      stock: {
        quantity: 0,
        alert_threshold: 0,
        sold_by_unit: true,
        in_stock: true,
      },
      vat: 0,
      portion_sizes: [],
      sales_modes: {
        dine_in: true,
        takeaway: true,
        delivery: false,
      },
      variants: [],
      supplements: [],
      stats: {
        sales_7d: 0,
        revenue_7d: 0,
        orders_7d: 0,
        trend_percent: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  );

  function updateForm(stepData: Partial<MenuItem>) {
    formState.value = new MenuItem({
      ...formState.value.toJSON(),
      ...stepData,
      delivery_time: stepData.deliveryTime ?? formState.value.deliveryTime,
      preparation_time: stepData.preparationTime ?? formState.value.preparationTime,
      category_id: stepData.categoryId ?? formState.value.categoryId,
      is_available: stepData.isAvailable ?? formState.value.isAvailable,
      is_popular: stepData.isPopular ?? formState.value.isPopular,
      portion_sizes: stepData.portionSizes ?? formState.value.portionSizes,
      sales_modes: stepData.salesModes ?? formState.value.salesModes,
      created_at: stepData.createdAt ?? formState.value.createdAt,
      updated_at: new Date().toISOString(),
    } as any);
  }

  function resetForm() {
    formState.value = new MenuItem({
      id: (menuStore.menuItems?.length || 0) + 1,
      name: "",
      description: "",
      price: 0,
      rating: 0,
      reviews: 0,
      delivery_time: "",
      preparation_time: "",
      category: "",
      category_id: "",
      dietary: [],
      image: "",
      gallery: [],
      is_available: true,
      is_popular: false,
      status: "available",
      stock: {
        quantity: 0,
        alert_threshold: 0,
        sold_by_unit: true,
        in_stock: true,
      },
      vat: 0,
      portion_sizes: [],
      sales_modes: {
        dine_in: true,
        takeaway: true,
        delivery: false,
      },
      variants: [],
      supplements: [],
      stats: {
        sales_7d: 0,
        revenue_7d: 0,
        orders_7d: 0,
        trend_percent: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  return {
    formState,
    updateForm,
    resetForm,
  };
});