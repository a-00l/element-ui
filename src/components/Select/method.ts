import { reactive, ref } from "vue";
import type { SelectOptionProps, StateSelect, valueType } from "./types";

export const optionArray: SelectOptionProps[] = []
export const selectd = ref()

// 当前选择的值
export const stateSelect: StateSelect = reactive({
  inputValue: '',
  selectOption: { value: '', label: '' },
  highlightIndex: -1
})

// 选项数组添加
export const optionPush = (option: SelectOptionProps) => {
  const isSome = optionArray.some((item) => item.value === option.value)

  // 如果选项数组中已经存在该值，则不添加
  if (isSome) return

  optionArray.push(option)
}

// 查询数组中的值
export const optionFind = (value: valueType) => optionArray.find(item => item.value === value)

// 选择的值
export const selectdValue = (value: valueType) => {
  const option = optionFind(value)
  if (!option) return

  return option.value
}
