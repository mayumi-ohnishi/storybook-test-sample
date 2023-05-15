import type { StoryObj, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { Input } from '.'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    onChange: {
      action: 'changed',
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    placeholder: 'ここに入力してください',
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof Input>
export const Default: Story = {
  render: (props) => <Input {...props} />,
}

export const InputFilled: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole('textbox'), 'Hello World!', {
      delay: 100,
    })
  },
}
