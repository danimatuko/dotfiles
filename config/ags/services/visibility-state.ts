import { createState } from "gnim"

export const createVisibilityState = (initialVisible = false) => {
  const [visibleState, setVisibleState] = createState(initialVisible)

  const open = () => {
    setVisibleState(true)
  }

  const close = () => {
    setVisibleState(false)
  }

  const toggle = () => {
    if (visibleState()) {
      close()
      return
    }

    open()
  }

  return {
    isVisible: visibleState,
    open,
    close,
    toggle,
  }
}
