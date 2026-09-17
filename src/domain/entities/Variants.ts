export interface Variant {
  id: string;
  label: string;
  subtitle: string;
  price: number;
  status: 'available' | 'out_of_stock' | 'hidden';
  is_default: boolean;
  is_popular: boolean;
}