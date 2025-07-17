export type valueType = string | number | boolean | object

export interface SelectProps {
  // v-model
  modelValue: string;
  // 一些基本表单属性
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  filterMethod?: (value: string) => SelectOptionProps[];
}

export interface SelectOptionProps {
  value: valueType;
  label: string | number;
  disabled?: boolean;
}

export interface StateSelect {
  inputValue: string | number;
  selectOption: SelectOptionProps
}

export interface SelectEmits {
  (e: 'change', value: any): void;
  (e: 'update:modelValue', value: string | number): void;
  (e: 'visible-change', value: boolean): void
}
