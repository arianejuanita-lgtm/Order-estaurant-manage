export interface ISiteMetaProps {
  site_name: string;
  tagline: string;
  currency: string;
  total_items: number;
  delivery_time_unit: string;
}

export class SiteMeta {
  public siteName: string;
  public tagline: string;
  public currency: string;
  public totalItems: number;
  public deliveryTimeUnit: string;

  constructor(props: ISiteMetaProps) {
    this.siteName = props.site_name;
    this.tagline = props.tagline;
    this.currency = props.currency;
    this.totalItems = props.total_items;
    this.deliveryTimeUnit = props.delivery_time_unit;
  }

  public toJSON() {
    return {
      site_name: this.siteName,
      tagline: this.tagline,
      currency: this.currency,
      total_items: this.totalItems,
      delivery_time_unit: this.deliveryTimeUnit,
    };
  }
}