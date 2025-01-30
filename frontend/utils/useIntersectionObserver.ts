export function useIntersectionObserver(target: HTMLElement | null) {
  const isIntersecting = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (target) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isIntersecting.value = entry.isIntersecting
        },
        {
          rootMargin: '0px',
          threshold: 0.5, // 當一半的元素可見時觸發
        }
      )
      observer.observe(target)
    }
  })

  onBeforeUnmount(() => {
    if (observer && target) {
      observer.unobserve(target)
    }
  })

  return { isIntersecting }
}
