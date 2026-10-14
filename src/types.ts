export type Discipline = 'BJJ' | 'Wrestling' | 'Muay Thai' | 'Box' | 'MMA'
export type SessionType = 'Técnica' | 'Drilling' | 'Sparring / rolling' | 'Condición'

export interface Session {
  id: string
  date: string
  discipline: Discipline
  duration: number
  type: SessionType
  rpe: number
  note: string
  repeatedError: string
  techniques: string[]
}

export interface Technique {
  id: string
  name: string
  discipline: Discipline
  keyNotes: string
  commonErrors: string
  url?: string
  lastPracticed?: string
  practiceCount: number
}
