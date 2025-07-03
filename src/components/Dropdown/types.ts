import type { TooltipProps } from "../Tooltip/types";

export type CommandType = string | number | object
export type DropdownProps = TooltipProps

export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void
  (e: 'command', value: CommandType): void
}

export interface DropdownItemsProps {
  command?: CommandType;
  disabled?: boolean;
  divided?: boolean
}

export interface DropdownInstance {
  handleOpen: () => void;
  handleClose: () => void;
}
