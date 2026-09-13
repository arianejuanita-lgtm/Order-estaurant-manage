import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { Category } from "@/domain/entities/Category";
import { PriceRange } from "@/domain/entities/PriceRange";
import { Dietary } from "@/domain/entities/Dietary";
import { PortionSize } from "@/domain/entities/PortionSize";
import { FilterRepository } from "@/data/repositories/FilterRepository";

const filter = new FilterRepository();

export const useFilter= defineStore('filterMenuItem',()=>{
    const categories=ref<Category[]>([]);
    const PriceRanges=ref<PriceRange[]>([]);
    const dietaries=ref<Dietary[]>([]);
    const portionSizes=ref<PortionSize[]>([]);

    async function fecthCategoryMenuItems() {
    try {
      categories.value = await filter.getCategories();
    } catch (error) {
      console.log(error);
    } finally {
      console.log(categories.value);
    }
  }

      async function fecthPriceRangeMenuItems() {
    try {
      PriceRanges.value = await filter.getPriceRange();
    } catch (error) {
      console.log(error);
    } finally {
      console.log(PriceRanges.value);
    }
  }


  
      async function fecthPortionSizeMenuItems() {
    try {
      dietaries.value = await filter.getDietary();
    } catch (error) {
      console.log(error);
    } finally {
      console.log(dietaries.value);
    }
  }

       async function fecthdietariesMenuItems() {
    try {
      portionSizes.value = await filter.getPortionSize();
    } catch (error) {
      console.log(error);
    } finally {
      console.log(portionSizes.value);
    }
  }



    return {
        categories,
        PriceRanges,
        dietaries,
        portionSizes,
        fecthCategoryMenuItems,
        fecthPortionSizeMenuItems,
        fecthPriceRangeMenuItems,
        fecthdietariesMenuItems
    };

})