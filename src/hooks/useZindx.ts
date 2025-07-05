import { computed } from "vue"

let zIndex = 0
/**
 *
 * @param defaultIndex 自增初始值
 *
 */
export const useZindex = (defaultIndex: number = 2000) => {
  // 现在index的值
  const curIndex = computed(() => defaultIndex + zIndex)
  // index自增
  const addIndex = () => {
    zIndex++

    return curIndex.value
  }

  return {
    addIndex,
  }
}
