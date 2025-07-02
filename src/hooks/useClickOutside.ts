import { onMounted, onUnmounted, type Ref } from "vue"

export const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
  const handel = (e: MouseEvent) => {
    // 点击目标不存在
    if (!e.target) return

    // 点击目标在元素外部
    if (elementRef.value && !elementRef.value.contains(e.target as HTMLElement)) {
      callback(e)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handel)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handel)
  })
}
