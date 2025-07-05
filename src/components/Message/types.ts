import type { VNode } from "vue";

export interface MessageProps {
  message: string | VNode
  type?: 'success' | 'info' | 'warning' | 'error' | 'primary'
  duration?: number;
  showClose?: boolean;
  onDestroy: () => void
}

export type CreateMessage = Omit<MessageProps, 'onDestroy'>
