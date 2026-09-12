export interface ISortOptionProps {
  id: string;
  label: string;
}

export class SortOption {
  public id: string;
  public label: string;

  constructor(props: ISortOptionProps) {
    this.id = props.id;
    this.label = props.label;
  }

  public toJSON() {
    return {
      id: this.id,
      label: this.label,
    };
  }
}