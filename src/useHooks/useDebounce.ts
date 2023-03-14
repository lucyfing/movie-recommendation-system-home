import { useCallback, useEffect, useRef, useState } from "react"

const useDebounce = (fn: any, delay: number, dep: any[] = []) => {
  const [timer, setTimer] = useState<number | null>(null)
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  return useCallback(() => {
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      window.setTimeout(() => {
        fnRef.current()
      }, delay)
    )
  }, dep)
}


export default useDebounce