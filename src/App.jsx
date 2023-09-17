import React from 'react'
import './App.css'
import FirstPage from './components/FirstPage'
import ResultPage from './components/ResultPage'
import QuestionsForm from './components/QuestionsForm'
import yellow from '../public/yellow.svg'
import blue from '../public/blue.svg'


export default function App() {
  
  const [questionArray, setQuestionArray] = React.useState(' ')
  const [stage, setStage] = React.useState(1)
  const [fetchData, setFetchData] = React.useState(false)
  const generateId = () => React.useId()

  function preprocessingDataOptions(array,string){
    return [...array, string].sort(() => Math.random() - 0.5)
  }

  function preprocessingData(data){
    return data.map((question, index) => {
      return {
        ...question,
        id: index+1,
        option: preprocessingDataOptions(question.incorrect_answers, question.correct_answer),
        answer: ""
      }
    } )
  }
  
  React.useEffect(() =>{
    console.log("useEffect") 
    fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple&encode=base64")
    .then(response => response.json())
    .then(data => setQuestionArray(preprocessingData(data.results)))
  },
  [fetchData]);

  function handleAnswer(e){
    const {name, value} = e.target
    setQuestionArray(prev => prev.map(question => question.id === Number(name) ? {...question, answer: value} : question))
  }
  function calculateScore(){
    return questionArray.reduce((acc, question) => question.answer === question.correct_answer ? acc + 1: acc, 0)
    
  }
  const questionForm = () => questionArray.map(question => (
    <QuestionsForm
    question={question.question}
    option={question.option}
    key={generateId + question.id}
    id={question.id}
    selected={(e) => handleAnswer(e)}
    answer={question.answer}
    />
  ))
  const resultsPage = () => questionArray.map(question => (
    <ResultPage
    question={question.question}
    option={question.option}
    correct_answer={question.correct_answer}
    incorrect_answers={question.incorrect_answers}
    key={generateId + question.id}
    id={question.id}
    answer={question.answer}
    />
  ))
  const displaySummary = () => ((
    <div>
      {resultsPage()}
      <div className='score'>
        <h5>You scored {calculateScore()}/5 correct answers</h5> 
        <button className='start-btn play-again-btn' onClick={() => {setStage(1), setFetchData(prev => !prev)}}>Play Again</button>
      </div>
    </div>
  ))

  return (
    <>
      <img src={yellow} alt="yellow bloob" className="yellow" />
      <img src={blue} alt="blue bloob" className="blue" />
      {stage === 1 && <FirstPage handleStratQuizBtn={() => setStage(2)}/>}
      {stage === 2 && <div>{questionForm()} <button className='start-btn check-answers-btn' onClick={() => setStage(3)}>Check answers</button></div>}
      {stage === 3 && displaySummary()}
    </>
  )
}
