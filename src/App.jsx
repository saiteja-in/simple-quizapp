import { useState, useEffect } from 'react'
import { questions } from './data/questions'
import { formatElapsedTime } from './utils/formatTime'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  useEffect(() => {
    if (!started || finished || !startTime) return

    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [started, finished, startTime])

  const handleStart = () => {
    setStarted(true)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setStartTime(Date.now())
    setElapsedSeconds(0)
  }

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
  }

  const handleNext = () => {
    const isCorrect = selected === currentQuestion.answer
    const newScore = isCorrect ? score + 1 : score

    if (currentIndex + 1 >= totalQuestions) {
      setScore(newScore)
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000))
      setFinished(true)
      return
    }

    setScore(newScore)
    setCurrentIndex((prev) => prev + 1)
    setSelected(null)
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setStartTime(null)
    setElapsedSeconds(0)
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
        <p className="elapsed-time">
          Time taken: {formatElapsedTime(elapsedSeconds)}
        </p>
        <button type="button" className="btn primary" onClick={handleRestart}>
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="quiz-header">
        <h1>Simple Quiz</h1>
        <p className="elapsed-badge">{formatElapsedTime(elapsedSeconds)}</p>
      </div>
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
