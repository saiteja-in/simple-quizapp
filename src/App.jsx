import { useState } from 'react'
import { questions } from './data/questions'
import { getCategoryBreakdown } from './utils/categoryBreakdown'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const score = answers.reduce((total, answer, index) => {
    return answer === questions[index].answer ? total + 1 : total
  }, 0)

  const handleStart = () => {
    setStarted(true)
    setCurrentIndex(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
  }

  const handleNext = () => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = selected

    if (currentIndex + 1 >= totalQuestions) {
      setAnswers(newAnswers)
      setFinished(true)
      return
    }

    setAnswers(newAnswers)
    setCurrentIndex((prev) => prev + 1)
    setSelected(null)
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentIndex(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  if (!started) {
    return (
      <div className="app">
        <h1>Simple Quiz</h1>
        <p>Test your knowledge with {totalQuestions} multiple-choice questions.</p>
        <button type="button" className="btn primary" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    )
  }

  if (finished) {
    const breakdown = getCategoryBreakdown(questions, answers)

    return (
      <div className="app">
        <h1>Quiz Complete</h1>
        <p className="score">
          You scored {score} out of {totalQuestions}
        </p>
        <div className="category-breakdown">
          <h2>Score by category</h2>
          <ul className="category-list">
            {Object.entries(breakdown).map(([category, stats]) => (
              <li key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-score">
                  {stats.correct}/{stats.total}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className="btn primary" onClick={handleRestart}>
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Simple Quiz</h1>
      <p className="category-badge">{currentQuestion.category}</p>
      <p className="question-text">{currentQuestion.question}</p>
      <ul className="options">
        {currentQuestion.options.map((option, index) => (
          <li key={option}>
            <button
              type="button"
              className={`option-btn ${selected === index ? 'selected' : ''}`}
              onClick={() => handleSelect(index)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn primary"
        onClick={handleNext}
        disabled={selected === null}
      >
        {currentIndex + 1 === totalQuestions ? 'Finish' : 'Next'}
      </button>
    </div>
  )
}

export default App
