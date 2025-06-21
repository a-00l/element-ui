export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type Size = 'small' | 'large'

export interface ButtonProps {
  type?: ButtonType;
  size?: Size;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
}
