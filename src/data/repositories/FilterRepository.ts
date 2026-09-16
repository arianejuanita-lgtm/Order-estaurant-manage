import { Category } from "@/domain/entities/Category";
import { PriceRange } from "@/domain/entities/PriceRange";
import { PortionSize } from "@/domain/entities/PortionSize";
import { Dietary } from "@/domain/entities/Dietary";
import { apiClient } from "../datasources/apiClient";


interface IFilterRepository {
  getCategories(): Promise<Category[]>;
  getPriceRange(): Promise<PriceRange>; 
  getPortionSize(): Promise<PortionSize[]>;
  getDietary(): Promise<Dietary[]>;
}

export class FilterRepository implements IFilterRepository {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get(""); 
    const categories = response.data.record.filters.categories;
    
    return categories.map(
      (item: any) =>
        new Category({
          id: item.id,
          label: item.label,
          icon: item.icon,
        })
    );
  }

  async getDietary(): Promise<Dietary[]> {
    const response = await apiClient.get("");
    const dietary = response.data.record.filters.dietary;
    
    return dietary.map(
      (item: any) =>
        new Dietary({
          id: item.id,
          label: item.label,
        })
    );
  }

  async getPortionSize(): Promise<PortionSize[]> {
    const response = await apiClient.get("");
    const portionSizes = response.data.record.filters.portion_sizes;
    
    return portionSizes.map(
      (item: any) =>
        new PortionSize({
          id: item.id,
          label: item.label,
        })
    );
  }

  async getPriceRange(): Promise<PriceRange> {
    const response = await apiClient.get("");
    const pr = response.data.record.filters.price_range;
    
    return new PriceRange({
      min: pr.min,
      max: pr.max,
    });
  }
}