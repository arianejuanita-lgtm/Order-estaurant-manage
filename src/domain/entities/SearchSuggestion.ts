export interface ISearchSuggestionProps {
  id: number;
  term: string;
  category: string;
}

export class SearchSuggestion {
  public id: number;
  public term: string;
  public category: string;

  constructor(props: ISearchSuggestionProps) {
    this.id = props.id;
    this.term = props.term;
    this.category = props.category;
  }

  public toJSON() {
    return {
      id: this.id,
      term: this.term,
      category: this.category,
    };
  }
}