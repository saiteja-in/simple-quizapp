import { useState } from 'react'
import { questions } from './data/questions'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  const handleStart = () => {
    setStarted(true)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setAnswers([])
  }

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
  }

  const handleNext = () => {
    const isCorrect = selected === currentQuestion.answer
    const newScore = isCorrect ? score + 1 : score
    const record = {
      question: currentQuestion.question,
      selected: currentQuestion.options[selected],
      correct: currentQuestion.options[currentQuestion.answer],
      isCorrect,
    }
    const newAnswers = [...answers, record]

    if (currentIndex + 1 >= totalQuestions) {
      setScore(newScore)
      setAnswers(newAnswers)
      setFinished(true)
      return
    }

    setScore(newScore)
    setAnswers(newAnswers)
    setCurrentIndex((prev) => prev + 1)
    setSelected(null)
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setAnswers([])
  }

  const wrongAnswers = answers.filter((a) => !a.isCorrect)

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
        {wrongAnswers.length > 0 && (
          <div className="review">
            <h2>Review incorrect answers</h2>
            <ul className="review-list">
              {wrongAnswers.map((item) => (
                <li key={item.question} className="review-item">
                  <p className="review-question">{item.question}</p>
                  <p className="review-wrong">Your answer: {item.selected}</p>
                  <p className="review-correct">Correct answer: {item.correct}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
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
