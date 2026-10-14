import { describe, expect, it } from 'vitest'
import { sessionLoad, techniqueStatus } from './utils'

describe('training calculations', () => {
  it('calculates load as duration times RPE', () => {
    expect(sessionLoad({ duration: 75, rpe: 8 } as never)).toBe(600)
  })

  it('marks techniques based on spaced repetition windows', () => {
    const date = (days: number) => new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)
    expect(techniqueStatus({ lastPracticed: date(8) } as never)).toBe('repasar')
    expect(techniqueStatus({ lastPracticed: date(15) } as never)).toBe('pronto')
    expect(techniqueStatus({ lastPracticed: date(25) } as never)).toBe('urgente')
  })
})
