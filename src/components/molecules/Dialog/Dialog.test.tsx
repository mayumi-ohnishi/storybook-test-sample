import { composeStories } from '@storybook/testing-react'
import { render, screen, cleanup } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import * as stories from './Dialog.stories'

const { DialogTemplate } = composeStories(stories)
const DEFAULT_TITLE = 'Dialog title'

/**
 * チェック項目memo
 * 1. 初期表示では非表示になっているか
 * 2. 開くボタンをクリックしたら表示されるか
 * 3. 閉じるボタンをクリックしたら非表示になるか
 * 4. ダイアログの外側をクリックしたら非表示になるか
 * 5. ダイアログの内側をクリックしたら非表示にならないか
 * 6. 渡したpropsに応じて表示が正しく反映されるか
 * 7. 閉じるボタンにfocusが当たった状態でEnterキーを押下したら非表示になるか
 */

describe('Dialog Component', () => {
  afterEach(() => {
    cleanup()
  })

  const openDialog = async () => {
    const btn = screen.getByRole<HTMLButtonElement>('button', {
      name: /Show Dialog/i,
    })
    await act(async () => await userEvent.click(btn))
  }

  it('not displayed at initial rendering', () => {
    render(<DialogTemplate />)
    const text = screen.queryByText(DEFAULT_TITLE)
    expect(text).not.toBeInTheDocument()
  })

  it('should be displayed when the open button is clicked', async () => {
    render(<DialogTemplate />)
    await openDialog()
    expect(await screen.findByText(DEFAULT_TITLE)).toBeInTheDocument()
  })

  it('should be hidden when the close button is clicked', async () => {
    render(<DialogTemplate />)
    await openDialog()
    const closeBtn = screen.getByRole<HTMLButtonElement>('button', {
      name: /close/i,
    })
    await act(async () => await userEvent.click(closeBtn))
    expect(screen.queryByText(DEFAULT_TITLE)).not.toBeInTheDocument()
  })

  it('should be hidden when clicking outside of dialog', async () => {
    render(<DialogTemplate />)
    await openDialog()
    const overlay = screen.getByTestId('overlay')
    await act(async () => await userEvent.click(overlay))
    expect(screen.queryByText(DEFAULT_TITLE)).not.toBeInTheDocument()
  })

  it('should not hide when clicking inside the dialog', async () => {
    render(<DialogTemplate />)
    await openDialog()
    const dialog = screen.getByTestId('content')
    await act(async () => await userEvent.click(dialog))
    expect(await screen.findByText(DEFAULT_TITLE)).toBeInTheDocument()
  })

  it('should render with custom props', async () => {
    const props = {
      title: 'Test dialog',
      children: 'This is a test dialog.',
    }
    render(<DialogTemplate {...props} />)
    await openDialog()
    const title = screen.getByText(props.title)
    const content = screen.getByText(props.children)
    expect(title).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })

  it('should be closed with the enter key after the close button is focused', async () => {
    render(<DialogTemplate />)
    await openDialog()
    const closeBtn = screen.getByRole<HTMLButtonElement>('button', {
      name: /close/i,
    })
    await userEvent.tab() // select first element (open button)
    await userEvent.tab() // select close button in dialog

    expect(closeBtn).toHaveFocus()
    await act(async () => await userEvent.type(closeBtn, '{enter}'))
    expect(screen.queryByText(DEFAULT_TITLE)).not.toBeInTheDocument()
  })
})
