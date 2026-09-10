import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Clock from './Clock'

describe('Clock 컴포넌트', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-10T15:30:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('현재 시간을 화면에 표시한다', () => {
    render(<Clock />)

    const expectedTime = new Date().toLocaleTimeString('ko-KR')

    expect(screen.getByText(expectedTime)).toBeInTheDocument()
  })

  it('1초가 지나면 시간이 갱신된다', () => {
    render(<Clock />)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    const updatedTime = new Date().toLocaleTimeString('ko-KR')

    expect(screen.getByText(updatedTime)).toBeInTheDocument()
  })
})