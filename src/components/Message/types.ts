import type { ComponentInternalInstance, VNode } from "vue";

export interface MessageProps {
  message: string | VNode
  type?: 'success' | 'info' | 'warning' | 'error' | 'primary'
  duration?: number;
  showClose?: boolean;
  offset?: number;
  id: string;
  zIndex: number;
  onDestroy: () => void;
}

export interface MessageArray {
  id: string;
  props: MessageProps;
  VNode: VNode;
  vm: ComponentInternalInstance;
  destroy: () => void;
}

type filter = 'onDestroy' | 'id' | 'zIndex'
export type CreateMessage = Omit<MessageProps, filter>
