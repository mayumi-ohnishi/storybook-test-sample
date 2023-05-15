import styled, { css } from 'styled-components'

type Props = {
  type?: 'password' | 'text'
}

export const Input = styled.input.attrs<Props>(({ type = 'text' }) => ({
  type,
}))`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: gray;
  }
`
