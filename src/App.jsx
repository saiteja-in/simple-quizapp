import { useState, useEffect } from 'react'
import { questions } from './data/questions'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  const handleStart = () => {
    setStarted(true)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
  }

  const handleNext = () => {
    if (selected === null) return

    const isCorrect = selected === currentQuestion.answer
    const newScore = isCorrect ? score + 1 : score

    if (currentIndex + 1 >= totalQuestions) {
      setScore(newScore)
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
  }

  useEffect(() => {
    if (!started || finished) return

    const onKeyDown = (e) => {
      if (e.key >= '1' && e.key <= '4') {
        const index = Number(e.key) - 1
        if (index < currentQuestion.options.length) {
          handleSelect(index)
        }
      }
      if (e.key === 'Enter') {
        handleNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [started, finished, selected, currentIndex, currentQuestion, score])

  if (!started) {
    return (
      <div className="app">
        <h1>Simple Quiz</h1>
        <p>Test your knowledge with {totalQuestions} multiple-choice questions.</p>
        <p className="keyboard-hint">Tip: Press 1-4 to select, Enter to continue.</p>
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
              <span className="option-key">{index + 1}</span> {option}
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
