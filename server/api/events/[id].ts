import { events } from '~/server/data/events'

export default defineEventHandler((event) => {
  const { id } = event.context.params!
  const found = events.find(e => e.id === id)

  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Event not found' })
  }

  return found
})