export function shuffleOptions(options, correctIndex) {
  const items = options.map((text, index) => ({ text, index }))
  const shuffled = [...items]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  const correctAnswer = shuffled.findIndex((item) => item.index === correctIndex)

  return {
    options: shuffled.map((item) => item.text),
    correctAnswer,
  }
}
