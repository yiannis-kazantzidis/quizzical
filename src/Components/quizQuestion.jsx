import { useState, useEffect } from 'react'

function QuizQuestion(props) {
    const [selected, setSelected] = useState("")

    useEffect(() => {
        if (props.endQuiz) {
            props.submitResults(selected)
        }

    }, [props.endQuiz])


    return (
        <div className="m-5">
            <h1 className="text-lg font-bold">{props.quizContent.question}</h1>

            <div className="join join-vertical lg:join-horizontal my-5">
                {props.questions.map((v, k) => {
                    const isRight = (v == props.quizContent.correct_answer)
                    const notRight = (selected === v && selected != props.quizContent.correct_answer)
                    console.log("correct answer :" + props.quizContent.correct_answer)

                    return (
                        <button key={k} onClick={() => {console.log(props.questions[k]) 
                            setSelected(v)}} className={(props.endQuiz && isRight && "btn btn-success btn-outline join-item") || (props.endQuiz && notRight && "btn btn-error btn-outline join-item") || (!props.endQuiz && selected === v && "btn btn-success join-item") || !props.endQuiz && "btn join-item" || "btn btn-outline join-item"}>{v}</button>
                    )
                })}
            </div>

            <hr />
        </div>
    )

}

export default QuizQuestion