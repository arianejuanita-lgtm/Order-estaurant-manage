export interface IPriceRangeProps {
  min: number;
  max: number;
}

export class PriceRange {
  public min: number;
  public max: number;

  constructor(props: IPriceRangeProps) {
    this.min = props.min;
    this.max = props.max;
  }

  public toJSON() {
    return {
      min: this.min,
      max: this.max,
    };
  }
}