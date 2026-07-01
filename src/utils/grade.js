export function getGrade(score, total) {
  if (total === 0) return 'F'

  const percentage = (score / total) * 100

  if (percentage >= 90) return 'A'
  if (percentage >= 80) return 'B'
  if (percentage >= 70) return 'C'
  if (percentage >= 60) return 'D'
  return 'F'
}
