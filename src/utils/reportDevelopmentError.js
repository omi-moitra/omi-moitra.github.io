export function reportDevelopmentError(context, error) {
  if (!import.meta.env.DEV) return

  console.error(`[portfolio] ${context}`, {
    name: error?.name || 'ServiceError',
    code: error?.code || null,
    status: error?.status || null,
  })
}
