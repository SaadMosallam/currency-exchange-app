import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CurrencyExchange from './CurrencyExchange'

test('loads and displays greeting', async () => {
    // ARRANGE
    render(
        <CurrencyExchange />
    )

    // ACT
    await userEvent.click(screen.getByText('Money Exchange'));
    await screen.findByRole('heading')

    // ASSERT
    expect(screen.getByText('Money Exchange'))
    expect(screen.getByRole('button')).toBeDisabled()
})