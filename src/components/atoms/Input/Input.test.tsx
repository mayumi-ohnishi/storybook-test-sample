import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as stories from './Input.stories'

const { InputFilled } = composeStories(stories)

describe('Check Component', () => {
  it('入力した全てのテキストが表示されること', async () => {
    const expectedValue = 'Hello World!'
    render(<InputFilled />)
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, expectedValue)
    expect(input).toHaveValue(expectedValue)
  })
})
