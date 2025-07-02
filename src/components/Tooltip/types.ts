import type { Placement, Options } from "@popperjs/core";

export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  /**
   * @description 是否手动控制
   */
  manual?: boolean;
  /**
   * @description popper.js 配置项
   */
  popperOption?: Partial<Options>;
  transition?: string;
  openDelay?: number;
  closeDelay?: number;
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void;
}

// 暴露方法
export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}
