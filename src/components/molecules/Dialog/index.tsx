import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button } from '@/components/atoms/Button'

export type DialogProps = {
  title?: string
  children?: React.ReactNode
  isOpen?: boolean
  handleClose?: () => void
}

export const Dialog: FC<DialogProps> = (props) => {
  const { title = 'Dialog title', children, isOpen, handleClose } = props
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickToCloseDialog = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        if (handleClose) handleClose()
      }
    }
    document.addEventListener('click', handleClickToCloseDialog)
    return () => {
      document.removeEventListener('click', handleClickToCloseDialog)
    }
  }, [handleClose])

  return (
    <>
      {isOpen ? (
        <Overlay data-testid="overlay">
          <Container ref={dialogRef}>
            <Header>
              <h3>{title}</h3>
              <Button onClick={handleClose} color="secondary">
                Close
              </Button>
            </Header>
            <Content data-testid="content">{children}</Content>
          </Container>
        </Overlay>
      ) : null}
    </>
  )
}

const Container = styled.div`
  z-index: 5;
  width: 90%;
  border: 2px solid #000;
  border-radius: 0.75rem;
  overflow: hidden;
  max-width: 600px;
`

const Header = styled.div`
  padding: 0px 20px;
  border-bottom: 2px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fffbdb;
`

const Content = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
