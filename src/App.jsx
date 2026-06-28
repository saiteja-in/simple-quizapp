import { useState } from 'react'
import { questions } from './data/questions'
import './App.css'

function computeScore(answers) {
  return answers.reduce((total, answer, index) => {
    if (answer === null || answer === undefined) return total
    return answer === questions[index].answer ? total + 1 : total
  }, 0)
}

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const score = computeScore(answers)

  const handleStart = () => {
    setStarted(true)
    setCurrentIndex(0)
    setAnswers([])
    setSelected(null)
    setFinished(false)
  }

  const handleSelect = (index) => {
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
    setSelected(newAnswers[currentIndex + 1] ?? null)
  }

  const handlePrevious = () => {
    if (currentIndex === 0) return

    const newAnswers = [...answers]
    newAnswers[currentIndex] = selected
    setAnswers(newAnswers)

    const previousIndex = currentIndex - 1
    setCurrentIndex(previousIndex)
    setSelected(newAnswers[previousIndex] ?? null)
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentIndex(0)
    setAnswers([])
    setSelected(null)
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
    return (
      <div className="app">
        <h1>Quiz Complete</h1>
        <p className="score">
          You scored {score} out of {totalQuestions}
        </p>
        <button type="button" className="btn primary" onClick={handleRestart}>
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Simple Quiz</h1>
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
      <div className="quiz-actions">
        <button
          type="button"
          className="btn secondary"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn primary"
          onClick={handleNext}
          disabled={selected === null}
        >
          {currentIndex + 1 === totalQuestions ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}

export default App
