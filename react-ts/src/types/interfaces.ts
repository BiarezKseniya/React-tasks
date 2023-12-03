export interface AutocompleteProps {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
}

export interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: string;
}

export interface PasswordProps {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
}

export interface RadioButtonProps {
  id: string;
  label: string;
  type: string;
  name: string;
  options: string[];
  error?: string;
}

export interface FormOutput {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: NonNullable<'M' | 'F' | undefined>;
  't&c': NonNullable<boolean | undefined>;
  photo: FileList | unknown;
  country: string | undefined;
}

export interface FormOutputStored {
  id: string;
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: 'M' | 'F' | undefined;
  't&c': boolean | undefined;
  photo: string | undefined;
  country: string | undefined;
  isNew: boolean;
}

export interface FormState {
  countryList: string[];
  formHistory: FormOutputStored[];
}
