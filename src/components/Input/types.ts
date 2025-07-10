export interface InputProps {
  modelValue: string | number;
  type?: string;
  size?: 'small' | 'large' | 'default';
  showPassword?: boolean;
  disabled?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur'): void;
  (e: 'focus'): void;
  (e: 'change', value: string | number): void;
  (e: 'input', value: string | number): void;
}
