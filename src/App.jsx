import { useState, useEffect } from 'react'
import { questions } from './data/questions'
import './App.css'

const TIMER_SECONDS = 30

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  useEffect(() => {
    if (!started || finished || selected !== null) return

    if (timeLeft <= 0) {
      handleNext(true)
      return
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [started, finished, timeLeft, selected, currentIndex])

  const handleStart = () => {
    setStarted(true)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setTimeLeft(TIMER_SECONDS)
  }

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
  }

  const handleNext = (timedOut = false) => {
    const answer = timedOut ? null : selected
    const isCorrect = answer === currentQuestion.answer
    const newScore = isCorrect ? score + 1 : score

    if (currentIndex + 1 >= totalQuestions) {
      setScore(newScore)
      setFinished(true)
      return
    }

    setScore(newScore)
    setCurrentIndex((prev) => prev + 1)
    setSelected(null)
    setTimeLeft(TIMER_SECONDS)
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setTimeLeft(TIMER_SECONDS)
  }

  if (!started) {
    return (
      <div className="app">
        <h1>Simple Quiz</h1>
        <p>Test your knowledge with {totalQuestions} multiple-choice questions.</p>
        <p className="timer-hint">Each question has {TIMER_SECONDS} seconds.</p>
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
      <p className={`timer ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
        Time left: {timeLeft}s
      </p>
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
        onClick={() => handleNext(false)}
        disabled={selected === null}
      >
        {currentIndex + 1 === totalQuestions ? 'Finish' : 'Next'}
      </button>
    </div>
  )
}

export default App
