export interface ValuesAttributes {
  type: string;
  required: string;
  minlength: string;
  autofocus?: string;
}

export interface User {
  name: string;
  lastName: string;
}

export interface DataLevel{
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
}