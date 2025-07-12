import type { SelectOptionProps, valueType } from "./types";

export const optionArray: SelectOptionProps[] = []

// 选项数组添加
export const optionPush = (option: SelectOptionProps) => {
  optionArray.push(option)

  console.log(optionArray);
}

// 是否选中
export const selectd = (value: valueType) => {
  return optionArray.find((item) => item.value === value)
}
