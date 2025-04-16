import { events } from '~/server/data/events'

export default defineEventHandler((event) => {
  // Tri des événements par date croissante
  const sorted = events.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB // Tri croissant, dateA < dateB
  })

  // Retourner les événements triés avec les champs nécessaires
  return sorted.map(({ id, title, place, date, image_url, image_copyright }) => ({ id, title, place, date, image_url, image_copyright }))
})