import type { StoryObj, Meta } from '@storybook/react'
import { within, fireEvent, userEvent } from '@storybook/testing-library'
import { useDialog } from './hook/useDialog'
import { Dialog } from '.'
import { Button } from '@/components/atoms/Button'

const meta: Meta<typeof Dialog> = {
  title: 'Molecules/Dialog',
  args: {
    title: 'Dialog title',
    children:
      'サンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル',
  },
}

export default meta

export const DialogTemplate: StoryObj<typeof Dialog> = {
  render: function Render(props) {
    const { open, Dialog } = useDialog()

    return (
      <div>
        <h3>Click button!</h3>
        <Button onClick={open}>Show Dialog</Button>
        <Dialog {...props} />
      </div>
    )
  },
}

export const LongContentWithScroll: StoryObj<typeof Dialog> = {
  ...DialogTemplate,
  args: {
    children:
      'サンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル最終行テキスト',
  },
  // お試し
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole<HTMLButtonElement>('button', {
      name: /Show Dialog/i,
    })
    await userEvent.click(btn)
    const content = canvas.getByTestId('content')
    fireEvent.scroll(content, { target: { scrollTop: content.scrollHeight } })
  },
}
