<script>
  // @ts-nocheck

  import { Store } from '@tanstack/store'

  import { useStore } from '../../index'

  const store = new Store({
    select: 0,
    ignored: 1,
  })

  let storeVal = useStore(store, (state) => state.select)

  vi.fn()
</script>

<div>
  <!-- svelte-ignore missing-declaration -->
  <p>Number rendered: {vi.fn().mock.calls.length}</p>
  <p>Store: {storeVal}</p>
  <button
    on:click={() =>
      store.setState((v) => ({
        ...v,
        select: 10,
      }))}
  >
    Update select
  </button>
  <button
    on:click={() =>
      store.setState((v) => ({
        ...v,
        ignored: 10,
      }))}
  >
    Update ignored
  </button>
</div>
