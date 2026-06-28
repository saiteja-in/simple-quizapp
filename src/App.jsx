import { useState, useEffect } from 'react'
import { questions } from './data/questions'
import { shuffleOptions } from './utils/shuffleOptions'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [displayOptions, setDisplayOptions] = useState([])
const [correctAnswer, setCorrectAnswer] = useState(null)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  useEffect(() => {
    if (!started || finished) return

    const shuffled = shuffleOptions(
}, [currentIndex, started, finished])
      currentQuestion.answer,
    )
    setDisplayOptions(shuffled.options)
    setCorrectAnswer(shuffled.correctAnswer)
    setSelected(null)
  }, [currentIndex, started, finished, currentQuestion])

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
    const isCorrect = selected === correctAnswer
    const newScore = isCorrect ? score + 1 : score

    if (currentIndex + 1 >= totalQuestions) {
      setScore(newScore)
      setFinished(true)
      return
    }

    setScore(newScore)
    setCurrentIndex((prev) => prev + 1)
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setDisplayOptions([])
    setCorrectAnswer(0)
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
        {displayOptions.map((option, index) => (
          <li key={`${option}-${index}`}>
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
