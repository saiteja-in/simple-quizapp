const SECONDS_PER_QUESTION = 30

export function getEstimatedMinutes(questionCount) {
  if (questionCount === 0) return 0
  return Math.max(1, Math.ceil((questionCount * SECONDS_PER_QUESTION) / 60))
}

export function formatEstimatedDuration(questionCount) {
  const minutes = getEstimatedMinutes(questionCount)
  return minutes === 1 ? '~1 minute' : `~${minutes} minutes`
}
