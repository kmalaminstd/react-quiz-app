import React from 'react'

function AnswrCard({
  answers, 
  pickAnswer,
  pickedAnswer,
  correctAns
  }) {

    const isRightAns = pickedAnswer && answers === correctAns
    const isWrongAns = pickAnswer && answers === pickedAnswer && pickedAnswer !== correctAns
    const correctClass = isRightAns ? 'correct-answer': ''
    const wrongClass = isWrongAns ? 'incorrect-answer': ''
    const disabledClass = pickedAnswer && 'disabled-answer'

  return (
    <div className={`quiz-answer ${correctClass} ${wrongClass} ${disabledClass}`} onClick={()=>pickAnswer(answers)} >
      {answers}
    </div>
  )
}

export default AnswrCard