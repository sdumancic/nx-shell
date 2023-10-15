export interface State {
  name: string,
  abbreviation: string
}

export interface CustomerMetadata {
  genders: string[],
  states: State[]
}

