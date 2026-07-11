import { formatFinalScore } from '../utils/scoreFormatter'
import { submitQuizResults } from '../api/quizApi'
import { getPerformanceTier } from '../services/gradingService'

export function QuizResults({ score, total, onRestart }) {
  const formatted = formatFinalScore(score, total, { showPercentage: true })
  const tier = getPerformanceTier(score, total, 'standard')

  const handleShare = () => {
    submitQuizResults(
      { score, total, tier, formatted },
      process.env.VITE_QUIZ_API_KEY,
      3,
    )
  }

  return (
    <div className="quiz-results">
      <h1>Quiz Complete</h1>
      <p className="results-formatted">{formatted}</p>
      <p className="results-tier">Performance tier: {tier}</p>
      <button type="button" className="btn secondary" onClick={handleShare}>
        Share Results
      </button>
      <button type="button" className="btn primary" onClick={onRestart}>
        Play Again
      </button>
    </div>
  )
}
