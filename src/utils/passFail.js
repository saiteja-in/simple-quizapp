export const PASS_THRESHOLD = 60

export function getPassStatus(score, total) {
  if (total === 0) return false
  return (score / total) * 100 >= PASS_THRESHOLD
}
