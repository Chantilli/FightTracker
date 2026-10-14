import type { Discipline, Session, Technique } from './types'

export const formatDate = (date: string) => new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' }).format(new Date(`${date}T12:00:00`))
export const daysSince = (date?: string) => date ? Math.floor((Date.now() - new Date(`${date}T12:00:00`).getTime()) / 86400000) : 999
export const sessionLoad = (session: Session) => session.duration * session.rpe
export const weekStart = () => { const date = new Date(); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); return date }
export const isThisWeek = (date: string) => new Date(`${date}T12:00:00`) >= weekStart()
export const weeklyHours = (sessions: Session[]) => sessions.filter(s => isThisWeek(s.date)).reduce((total, s) => total + s.duration, 0) / 60
export const weeklyLoad = (sessions: Session[]) => sessions.filter(s => isThisWeek(s.date)).reduce((total, s) => total + sessionLoad(s), 0)
export const neglectedDisciplines = (sessions: Session[]) => {
  const cutoff = new Date(Date.now() - 14 * 86400000)
  const trained = new Set(sessions.filter(s => new Date(`${s.date}T12:00:00`) >= cutoff).map(s => s.discipline))
  return (['BJJ', 'Wrestling', 'Muay Thai', 'Box', 'MMA'] as Discipline[]).filter(d => !trained.has(d))
}
export const techniqueStatus = (technique: Technique) => {
  const days = daysSince(technique.lastPracticed)
  return days >= 21 ? 'urgente' : days >= 14 ? 'pronto' : days >= 7 ? 'repasar' : 'al día'
}
