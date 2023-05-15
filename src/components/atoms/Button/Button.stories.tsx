import type { StoryObj, Meta } from '@storybook/react'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
  args: {
    children: 'Button',
    color: 'primary',
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof Button>
export const Default: Story = {
  render: (props) => <Button {...props} />,
}
