import React from 'react';

export default function ResultPage(props) {
    const key = React.useId
    const opt = props.option.map(ele => {
        return (
        <label key={key + ele} className={ele === props.correct_answer ? "corect": props.answer === ele ? "incorect" : "nonSelected"} >
            <input type="radio" name={props.id} value={ele} />
            {atob(ele)}
        </label>
        )
    })
    return (
        <>
            <h5>{atob(props.question)} #{props.id}</h5>
            <form>
                {opt}
            </form>
            <hr></hr>
        </>
    )
}