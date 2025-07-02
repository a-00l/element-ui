export function throttle(fn: () => void, delay: number) {
  let timer: number | null = null
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, delay)
    }
  }
}
