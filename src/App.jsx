import { useState } from 'react'
import { questions } from './data/questions'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  const handleStart = () => {
    setStarted(true)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setFinished(false)
  }

  const updateStreak = (isCorrect) => {
    if (isCorrect) {
      const nextStreak = streak + 1
      setStreak(nextStreak)
      setBestStreak((best) => Math.max(best, nextStreak))
      return
    }

    setStreak(0)
  }

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
  }

  const handleNext = () => {
    const isCorrect = selected === currentQuestion.answer
    const newScore = isCorrect ? score + 1 : score
    updateStreak(isCorrect)

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
    setStreak(0)
    setBestStreak(0)
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
        {bestStreak > 0 && (
          <p className="streak-result">Best streak: {bestStreak} correct in a row</p>
        )}
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
        {streak > 0 && <p className="streak-badge">Streak: {streak}</p>}
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
