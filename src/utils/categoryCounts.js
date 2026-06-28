export function getCategoryCounts(questions) {
  return questions.reduce((counts, question) => {
    counts[question.category] = (counts[question.category] || 0) + 1
    return counts
  }, {})
}
