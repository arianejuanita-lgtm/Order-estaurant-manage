import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { useMenuItem } from "./useMenuItem";
import { useFilter } from "./useFilter";

export const useFiltered= defineStore('filtered',()=>{
    const { categories,PriceRanges,dietaries,portionSizes}=useFilter();
    const {menuItems}=useMenuItem();


    return {
        
    }
})