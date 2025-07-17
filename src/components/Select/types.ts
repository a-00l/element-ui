export type valueType = string | number | boolean | object

export interface SelectProps {
  // v-model
  modelValue: string;
  // 一些基本表单属性
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
}

export interface SelectOptionProps {
  value: valueType;
  label: string | number;
  disabled?: boolean;
}

export interface stateSelect {
  inputValue: string;
  selectOption: SelectOptionProps
}

export interface SelectEmits {
  (e: 'change', value: string): void;
  (e: 'update:modelValue', value: string): void;
  (e: 'visible-change', value: boolean): void
}
