export interface IStatsProps {
  total_items: number;
  average_rating: number;
  average_delivery_time: string;
  top_category: string;
  best_seller: string;
  newest_item: string;
  categories_count: Record<string, number>;
}

export class Stats {
  public totalItems: number;
  public averageRating: number;
  public averageDeliveryTime: string;
  public topCategory: string;
  public bestSeller: string;
  public newestItem: string;
  public categoriesCount: Record<string, number>;

  constructor(props: IStatsProps) {
    this.totalItems = props.total_items;
    this.averageRating = props.average_rating;
    this.averageDeliveryTime = props.average_delivery_time;
    this.topCategory = props.top_category;
    this.bestSeller = props.best_seller;
    this.newestItem = props.newest_item;
    this.categoriesCount = props.categories_count;
  }

  public toJSON() {
    return {
      total_items: this.totalItems,
      average_rating: this.averageRating,
      average_delivery_time: this.averageDeliveryTime,
      top_category: this.topCategory,
      best_seller: this.bestSeller,
      newest_item: this.newestItem,
      categories_count: this.categoriesCount,
    };
  }
}