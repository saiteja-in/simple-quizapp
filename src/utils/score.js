export function getScorePercentage(score, total) {
  if (total === 0) return 0
  return Math.round((score / total) * 100)
}

export function getPerformanceMessage(percentage) {
  if (percentage === 100) return 'Perfect score!'
  if (percentage >= 80) return 'Great job!'
  if (percentage >= 60) return 'Good effort!'
  if (percentage >= 40) return 'Keep practicing!'
  return 'Try again — you can do better!'
}
