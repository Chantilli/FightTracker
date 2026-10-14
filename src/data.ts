import type { Discipline, Session, SessionType, Technique } from './types'

export const disciplines: Discipline[] = ['BJJ', 'Wrestling', 'Muay Thai', 'Box', 'MMA']
export const sessionTypes: SessionType[] = ['Técnica', 'Drilling', 'Sparring / rolling', 'Condición']
export const templates: Record<Discipline, { note: string; error: string; techniques: string[] }> = {
  BJJ: { note: 'Secuencia de guardia y control de espalda', error: 'Abro demasiado los codos al defender', techniques: ['Escapes de side control', 'Retención de guardia'] },
  Wrestling: { note: 'Entradas a una pierna y defensa de derribo', error: 'Levanto la cabeza antes de cerrar el ángulo', techniques: ['Single leg', 'Sprawl'] },
  'Muay Thai': { note: 'Clinch, rodillas y salida con teep', error: 'Me quedo estático después de golpear', techniques: ['Teep frontal', 'Salida de clinch'] },
  Box: { note: 'Jab, cross y desplazamientos laterales', error: 'Bajo la mano derecha al salir', techniques: ['Jab al cuerpo', 'Pivot de salida'] },
  MMA: { note: 'Trabajo de jaula y transiciones a derribo', error: 'Dejo espacio entre cadera y pared', techniques: ['Underhook contra jaula', 'Cambio de nivel'] },
}

const daysAgo = (days: number) => new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)

export const exampleSessions: Session[] = [
  { id: 's1', date: daysAgo(1), discipline: 'BJJ', duration: 75, type: 'Drilling', rpe: 7, note: 'Frames y recuperación de guardia desde side control.', repeatedError: 'Abro demasiado los codos al defender', techniques: ['Escapes de side control'] },
  { id: 's2', date: daysAgo(3), discipline: 'Box', duration: 60, type: 'Sparring / rolling', rpe: 8, note: 'Buen ritmo en asaltos cortos.', repeatedError: 'Bajo la mano derecha al salir', techniques: ['Pivot de salida'] },
  { id: 's3', date: daysAgo(6), discipline: 'Muay Thai', duration: 90, type: 'Técnica', rpe: 6, note: 'Clinch y rodillas al cuerpo.', repeatedError: 'Me quedo estático después de golpear', techniques: ['Teep frontal'] },
  { id: 's4', date: daysAgo(10), discipline: 'Wrestling', duration: 70, type: 'Drilling', rpe: 7, note: 'Repeticiones de single leg.', repeatedError: 'Levanto la cabeza antes de cerrar el ángulo', techniques: ['Single leg'] },
  { id: 's5', date: daysAgo(15), discipline: 'MMA', duration: 80, type: 'Sparring / rolling', rpe: 8, note: 'Rounds desde la jaula.', repeatedError: 'Dejo espacio entre cadera y pared', techniques: ['Underhook contra jaula'] },
]

export const exampleTechniques: Technique[] = [
  { id: 't1', name: 'Escapes de side control', discipline: 'BJJ', keyNotes: 'Frame en cuello y cadera; shrimp antes de insertar rodilla.', commonErrors: 'Empujar solo con brazos; cruzar pies.', lastPracticed: daysAgo(1), practiceCount: 4 },
  { id: 't2', name: 'Retención de guardia', discipline: 'BJJ', keyNotes: 'Mantener distancia con frames y conectar cadera.', commonErrors: 'Mirar al techo; dejar que pasen las rodillas.', lastPracticed: daysAgo(22), practiceCount: 2 },
  { id: 't3', name: 'Pivot de salida', discipline: 'Box', keyNotes: 'Girar sobre metatarso y mantener la guardia alta.', commonErrors: 'Cruzar pies; bajar la mano del mentón.', lastPracticed: daysAgo(3), practiceCount: 5 },
  { id: 't4', name: 'Teep frontal', discipline: 'Muay Thai', keyNotes: 'Cadera primero, retraer rápido y volver a base.', commonErrors: 'Inclinar el torso; telegráfiar la rodilla.', lastPracticed: daysAgo(15), practiceCount: 3 },
  { id: 't5', name: 'Single leg', discipline: 'Wrestling', keyNotes: 'Cabeza pegada, espalda alta y finalizar con ángulo.', commonErrors: 'Quedarse de rodillas; mirar abajo.', lastPracticed: daysAgo(8), practiceCount: 3 },
  { id: 't6', name: 'Underhook contra jaula', discipline: 'MMA', keyNotes: 'Frente bajo el mentón, pasos cortos y presión de hombro.', commonErrors: 'Cadera lejos de la pared; brazos extendidos.', lastPracticed: daysAgo(27), practiceCount: 1 },
]
