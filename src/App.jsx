import { useState, useEffect } from 'react'
import './App.css'

import StartMenu from './Components/startMenu'
import QuizQuestion from './Components/quizQuestion'

function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [quiz, setQuiz] = useState({})
  const [quizContent, setQuizContent] = useState({})
  const [endQuiz, setEndQuiz] = useState(false)
  const [getResults, setGetResults] = useState([])
  const [count, setCount] = useState(0)

  function resetGame() {
    setQuiz({})
    setQuizContent({})
    setEndQuiz(false)
    setGetResults([])
    setCount(0)
    setQuizStarted(false)
  }

  function submitResults(result) {
    setGetResults((oldResults) => [...oldResults, result])
  }

  useEffect(() => {
    if (getResults.length > 0) {
      getResults.forEach((v, k) => {
        console.log(quizContent[k].correct_answer + " " + v)

        if (v == quizContent[k].correct_answer) {
          setCount((oldCount) => oldCount + 1)
        }
      })
    }
  }, [getResults])

  useEffect(() => {
    if (quiz.difficulty && quiz.category) {
      fetch(`https://opentdb.com/api.php?amount=5&category=${quiz.category}&difficulty=${quiz.difficulty}`)
        .then(response => response.json())
        .then(response => {
          setQuizContent(response.results)
          setQuizStarted(true)
        })
    }
  }, [quiz])

  return (
    <main className='bg-base h-[100%] w-[100%]'>

      {!quizStarted && 
        <StartMenu setQuiz={setQuiz} />

        ||

        <div className='flex flex-col h-[100%] w-[100%]'>
          <div className='mx-auto m-5 my-12'>
            {quizContent.map((v, k) => {
              const questionsArray = [...v.incorrect_answers]
              const randomIndex = Math.floor(Math.random() * (questionsArray.length + 1));
              questionsArray.splice(randomIndex, 0, v.correct_answer);

              return (
                <QuizQuestion endQuiz={endQuiz} submitResults={submitResults} quizContent={v} questions={questionsArray} key={k} />
              )

            })}
          </div>

          <div className='mx-auto m-5'>
            <button onClick={() => {
              if (quizStarted && endQuiz) {
                return resetGame()
              }

              setEndQuiz(true)
            }} 

              className='btn btn-primary w-48'>
                {endQuiz && `Correct Answers: ${count} / 5 Play Again?` || "Check Answers"}
              </button>
          </div>


        </div>

      }

    </main>
  )
}

export default App
