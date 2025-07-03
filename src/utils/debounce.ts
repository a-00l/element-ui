export function debounce(fn: () => void, delay: number) {
  let timer: number | null = null
  function debounced() {
    // 删除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();
    }, delay)
  }

  debounced.cancel = () => {
    if (timer) clearTimeout(timer)
    timer = null
  }

  return debounced
}
