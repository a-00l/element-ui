import type { InjectionKey, Ref } from 'vue'

export type NameType = string | number
// 定义折叠项的属性
export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

// Collapse暴露的方法
export interface CollapseContext {
  /**
   * @description 记录折叠项的name
   */
  activeNames: Ref<NameType[]>;
  /**
   * @description 设置折叠名称
   */
  setActiveNames: (name: NameType) => void;
}

export interface CollapseProps {
  /**
   * @description  v-model绑定
   */
  modelValue: NameType[]
  /**
   * @description 是否手风琴模式
   */
  accordion?: boolean;
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void
  (e: 'change', value: NameType[]): void
}
export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('CollapseContextKey')
