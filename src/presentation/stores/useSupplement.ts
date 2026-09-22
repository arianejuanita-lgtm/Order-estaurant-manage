import { defineStore } from "pinia";
import { ref,computed  } from "vue";
import { SupplementRepository } from "@/data/repositories/SupplementRepository";
import { Supplement } from "@/domain/entities/Supplement";

const supplementRepository = new SupplementRepository();

export const useSupplement = defineStore( 'supplement',()=> {
    const supplements=ref<Supplement[]>();

    async function fetchSupplement() {
        try {
          supplements.value =  await supplementRepository.getSupplement();
        } catch (error) {
            
        }
    }

    return {
        supplements,
        fetchSupplement
    }
})