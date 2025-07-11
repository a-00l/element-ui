type switchType = number | string | boolean;

export interface SwitchPrors {
  modelValue: switchType;
  disabled?: boolean;
  id?: string;
  name?: string;
  activeValue?: switchType;
  inactiveValue?: switchType;
  activeText?: string;
  inactiveText?: string;
  size?: 'large' | 'default' | 'small'
  width?: number | string;
  inlinePrompt?: boolean;
}

export interface SwitchEmits {
  (e: 'change', value: switchType): void;
  (e: 'update:modelValue', value: switchType): void;
}
