import { renderHook, render, screen } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import { useDialog, UseDialogReturnType } from './useDialog'

/**
 * チェック項目memo
 * 1. isOpenの初期値がfalseになっているか
 * 2. open発火後にisOpenがtrueに変更されるか
 * 3. close発火後にisOpenがfalseに変更されるか
 * 4. isOpenがtrueの時にDialogコンポーネントが表示されるか
 * 5. isOpenがfalseの時にDialogコンポーネントが表示されるか
 */

describe('useDialog', () => {
  let result: { current: UseDialogReturnType }

  beforeEach(() => {
    result = renderHook(() => useDialog()).result
  })

  it('should have initial isOpen value of false', () => {
    expect(result.current.isOpen).toBe(false)
  })

  it('should set isOpen to true after calling open function', () => {
    const event = new MouseEvent('click') as unknown as React.MouseEvent<
      HTMLButtonElement,
      MouseEvent
    >
    act(() => result.current.open(event))
    expect(result.current.isOpen).toBe(true)
  })

  it('should set isOpen to false after calling close function', () => {
    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
  })

  it('should render Dialog component when isOpen is true', async () => {
    const event = new MouseEvent('click') as unknown as React.MouseEvent<
      HTMLButtonElement,
      MouseEvent
    >
    act(() => result.current.open(event))

    render(<result.current.Dialog title="Test Dialog" isOpen={true} />)
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
  })

  it('should render Dialog component when isOpen is false', async () => {
    render(<result.current.Dialog title="Test Dialog" isOpen={false} />)
    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument()
  })
})
