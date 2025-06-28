export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type Size = 'small' | 'large'
// 原生属性所有的属性
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType;
  size?: Size;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  loading?: boolean
  icon?: string
}

export interface ButtonInstance {
  ref: HTMLButtonElement;
}
