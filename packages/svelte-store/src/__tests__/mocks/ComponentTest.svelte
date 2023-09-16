<script>
  import { Store } from '@tanstack/store'

  import { useStore } from '../../index'

  const store = new Store({
    select: 0,
    ignored: 1,
  })

  let storeVal = useStore(store, (state) => state.select)
</script>

<p>Store: {storeVal}</p>
