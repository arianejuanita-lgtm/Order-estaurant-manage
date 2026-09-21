import { Supplement } from "@/domain/entities/Supplement";
import { apiClient } from "../datasources/apiClient";

interface ISupplementRepository{
    getSupplement(): Promise<Supplement[]>;
}

export class SupplementRepository implements ISupplementRepository{
   async getSupplement(): Promise<Supplement[]> {
       const response =await apiClient.get("");
       const supplements= response.data.record.supplement_catalog;
    
       return supplements.map((item: any)=> new Supplement({
          id: item.id,
          label: item.label,
          price:item.price,
          icon: item.icon,
       }));
   }
}