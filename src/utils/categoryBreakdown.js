export function getCategoryBreakdown(questions, answers) {
  const breakdown = {}

  questions.forEach((question, index) => {
    if (!breakdown[question.category]) {
      breakdown[question.category] = { correct: 0, total: 0 }
    }

    breakdown[question.category].total += 1

    if (answers[index] === question.answer) {
      breakdown[question.category].correct += 1
    }
  })

  return breakdown
}
