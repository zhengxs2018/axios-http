import { ref } from 'vue'
import type { Ref } from 'vue'

export type SetState<T> = (value: T) => void

export function useState<T>(
  initialState: T
): [Ref<T>, SetState<T>, () => void, T] {
  const state = ref<T>(initialState) as Ref<T>

  const setState = (value: T) => {
    if (value === state.value) return
    state.value = value
  }

  const restoreState = () => {
    setState(initialState)
  }

  return [state, setState, restoreState, initialState]
}
