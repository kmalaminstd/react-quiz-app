import { useState } from "react"
import shuffle from "./answrShuffle/shuffle";
import Questioncard from "./QuestionCar/Questioncard";
import ScoreCard from "./ScoreCard/ScoreCard";


function App() {

  const [quizes, setQuizes] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [startQuiz, setStartQuiz] = useState(false)
  const [currentAnswers, setCurrentAnswers] = useState(null)
  const [endGame, setEndGame] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [correctAns, setCorrectAns] = useState(null)
  const [pickedAnswer, setPickedAnswer] = useState(null)
  

  const pickAnswer = (ans) => {
    setPickedAnswer(ans)
    if(ans === correctAns){
      setTotalScore( (prev) => prev + 1)
    }
  }

  const navigateNext = () => {
    let currentQuesIndex = currentQuizIndex + 1
    const validQuesIndex = currentQuesIndex < quizes.length
    if(validQuesIndex){
      setCurrentQuizIndex((prevInd) => prevInd + 1)
      const initialQuesIndex = quizes[currentQuesIndex]
      setCurrentAnswers(shuffle(initialQuesIndex))
      setCorrectAns(initialQuesIndex.correct_answer)
      setPickedAnswer(null)
    }else{
      setEndGame(true)
      
    }


  }

  const quizData = async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple')
    const {results} = await res.json() 
    setQuizes(results)
    setLoaded(true)
    setStartQuiz(true)
    const initialQuesIndex = results[currentQuizIndex]
    setCorrectAns(initialQuesIndex.correct_answer)
    setCurrentAnswers(shuffle(initialQuesIndex))
  }

  const resetQuiz = () => {
    setQuizes(null)
    setLoaded(false)
    setEndGame(false)
    setCorrectAns(null)
    setPickedAnswer(null)
    setTotalScore(0)
    setCurrentQuizIndex(0)
    setStartQuiz(false)
  }

  return(
    <>

      {
        endGame &&
        <ScoreCard totalScore={totalScore} resetQuiz={resetQuiz} />
      }
      {
        !startQuiz && 
        <div>
          <button style={{display: 'block', margin: '200px auto'}} onClick={quizData}>Start Quiz</button>
        </div>
        
      }
      
      <div className='container'>
        { loaded && !endGame &&(
          <Questioncard quize={quizes[currentQuizIndex]} currentAnswrs={currentAnswers} currentQuizIndex={currentQuizIndex} quizes={quizes} navigateNext={navigateNext} pickAnswer={pickAnswer} pickedAnswer={pickedAnswer} correctAns={correctAns} />
        )
          
        }
        
      </div>

        
    </>
  )
  
}


export default App;
