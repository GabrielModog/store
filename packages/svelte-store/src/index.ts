import type { AnyUpdater, Store } from '@tanstack/store'
import { afterUpdate, onDestroy } from 'svelte'
import { writable, get } from 'svelte/store'

export * from '@tanstack/store'

export type NoInfer<T> = [T][T extends any ? 0 : never]

function watch(callback: () => void, deps: () => any[]) {
  let cleanup: any = null

  function apply() {
    if (cleanup) cleanup()
    cleanup = callback()
  }

  if (deps) {
    let values: any[] = []
    afterUpdate(() => {
      const newValues = deps()
      if (newValues.some((value: any, i: number) => value !== values[i])) {
        apply()
        values = newValues
      }
    })
  } else {
    afterUpdate(apply)
  }

  onDestroy(() => {
    if (cleanup) cleanup()
  })
}

export function useStore<
  TState,
  TSelected = NoInfer<TState>,
  TUpdater extends AnyUpdater = AnyUpdater,
>(
  store: Store<TState, TUpdater>,
  selector: (state: NoInfer<TState>) => TSelected = (d) => d as any,
): TSelected {
  const slice = writable(store)

  watch(
    () => slice.set(store),
    () => [store, selector, slice],
  )

  return selector(get(slice).state as never)
}

export function shallow<T>(objA: T, objB: T) {
  if (Object.is(objA, objB)) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  if (keysA.length !== Object.keys(objB).length) {
    return false
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i] as string) ||
      !Object.is(objA[keysA[i] as keyof T], objB[keysA[i] as keyof T])
    ) {
      return false
    }
  }
  return true
}
