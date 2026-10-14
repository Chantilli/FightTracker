import type { Session, Technique } from './types'

const SESSIONS_KEY = 'ronda:sessions'
const TECHNIQUES_KEY = 'ronda:techniques'

export function loadData(defaultSessions: Session[], defaultTechniques: Technique[]) {
  try {
    const sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) || 'null') as Session[] | null
    const techniques = JSON.parse(localStorage.getItem(TECHNIQUES_KEY) || 'null') as Technique[] | null
    return { sessions: sessions ?? defaultSessions, techniques: techniques ?? defaultTechniques }
  } catch {
    return { sessions: defaultSessions, techniques: defaultTechniques }
  }
}

export function persistData(sessions: Session[], techniques: Technique[]) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  localStorage.setItem(TECHNIQUES_KEY, JSON.stringify(techniques))
}

export function clearData() {
  localStorage.removeItem(SESSIONS_KEY)
  localStorage.removeItem(TECHNIQUES_KEY)
}
