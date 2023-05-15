import { useCallback, useState } from 'react'
import { Dialog as Component, DialogProps } from '@/components/molecules/Dialog'

export type UseDialogReturnType = {
  isOpen: boolean
  open: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  close: () => void
  Dialog: React.FC<DialogProps>
}

type ComponentType = Pick<DialogProps, 'title' | 'children'>

export const useDialog = (): UseDialogReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()
      setIsOpen(true)
    },
    [],
  )

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const Dialog: React.FC<ComponentType> = useCallback(
    (props) => {
      return <Component {...props} isOpen={isOpen} handleClose={close} />
    },
    [close, isOpen],
  )

  return {
    isOpen,
    open,
    close,
    Dialog,
  }
}
