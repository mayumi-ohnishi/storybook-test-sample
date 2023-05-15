import styled, { css } from 'styled-components'

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children?: React.ReactNode
  color?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button = ({
  onClick,
  children,
  color = 'primary',
  disabled,
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.blur()
    if (onClick) onClick(e)
  }

  return (
    <Container onClick={handleClick} color={color} disabled={disabled}>
      {children}
    </Container>
  )
}

const COLOR = {
  primary: css`
    color: #fff;
    background: linear-gradient(#3f3cfe, #e943d5);
  `,
  secondary: css`
    color: #000;
    background: linear-gradient(#c7c7d2, #bcbaba);
  `,
}

const DISABLED = css`
  cursor: not-allowed;
  background: #d4d4d4;
  color: #f5f5f5;
`

const Container = styled.button<ButtonProps>`
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  font-weight: 500;
  outline: none;
  letter-spacing: 0.15em;
  transition: all 0.2s;

  ${(props) => props.color && COLOR[props.color]}
  ${(props) => props.disabled && DISABLED}

  &:focus,
  &:hover {
    outline: 2px solid red;
    transform: scale(1.1);
  }
`
