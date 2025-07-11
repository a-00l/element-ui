import type { Component } from "vue";

export interface InputProps {
  modelValue: string | number;
  type?: string;
  size?: 'small' | 'large' | 'default';
  showPassword?: boolean;
  disabled?: boolean;
  prefixIcon?: string | Component;
  suffixIcon?: string | Component;
  clearable?: boolean;
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur', value: FocusEvent): void;
  (e: 'focus', value: FocusEvent): void;
  (e: 'change', value: string | number): void;
  (e: 'input', value: string | number): void;
  (e: 'clear'): void;
}
