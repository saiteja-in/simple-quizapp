import { calculatePercentage } from '../utils/mathHelpers'

export function useScoreCalculator(score, total) {
  const percentage = calculatePercentage(score, total, 2)
  const passed = percentage >= 60

  return {
    percentage,
    passed,
    label: passed ? 'Pass' : 'Fail',
  }
}
