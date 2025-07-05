import { onMounted, onUnmounted } from "vue"

export const useEventListener = (
  target: EventTarget,
  event: string,
  callback: (e: Event) => void) => {
  onMounted(() => {
    target.addEventListener(event, callback)
  })

  onUnmounted(() => {
    target.removeEventListener(event, callback)
  })
}
