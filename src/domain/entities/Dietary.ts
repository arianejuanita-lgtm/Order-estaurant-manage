export interface IDietaryProps {
  id: string;
  label: string;
}

export class Dietary {
  public id: string;
  public label: string;

  constructor(props: IDietaryProps) {
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