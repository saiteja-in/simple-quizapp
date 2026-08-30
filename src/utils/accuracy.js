export function getAccuracyPercentage(score, total) {
  if (total === 0) return 0
  return Math.round((score / total) * 100)
}
