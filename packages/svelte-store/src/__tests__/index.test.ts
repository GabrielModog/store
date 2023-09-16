// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'

import { render, waitFor } from '@testing-library/svelte'

import TestComponent1 from './mocks/ComponentTest.svelte'
import TestTriggerComponent from './mocks/ComponentTriggertest.svelte'

import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

describe('useStore', () => {
  it('allows us to select state using a selector', async () => {
    const { getByText } = render(TestComponent1)
    expect(getByText('Store: 0')).toBeInTheDocument()
  })

  it('only triggers a re-render when selector state is updated', async () => {
    const { getByText } = render(TestTriggerComponent)

    expect(getByText('Store: 0')).toBeInTheDocument()
    expect(getByText('Number rendered: 1')).toBeInTheDocument()

    await user.click(getByText('Update select'))

    await waitFor(() => expect(getByText('Store: 10')).toBeInTheDocument())
    expect(getByText('Number rendered: 2')).toBeInTheDocument()

    await user.click(getByText('Update ignored'))
    expect(getByText('Number rendered: 2')).toBeInTheDocument()
  })
})
