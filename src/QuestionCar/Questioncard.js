import AnswrCard from "../AnswrCard/AnswrCard";


function Questioncard({
  quize, 
  currentAnswrs, 
  currentQuizIndex,
  quizes,
  navigateNext, 
  pickAnswer, 
  pickedAnswer, 
  correctAns
}) {



  return (
    <div className="question-card">
      <p>Question : {currentQuizIndex + 1} / {quizes.length} {''}</p>
        <h3>{quize.question}</h3>
        {currentAnswrs.map( (answer, i) => {
            return(
                <AnswrCard pickAnswer={pickAnswer} key={i} answers={answer}  pickedAnswer={pickedAnswer} correctAns={correctAns} />
            )
            
        })}
        <button onClick={navigateNext}>Next Question</button>
    </div>
  )
}

export default Questioncard