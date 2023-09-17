import React from "react"

export default function QuestionsForm(props) {

    return (
        <>
            <h5>{atob(props.question)} #{props.id}</h5>
            <form>
                <label className={props.answer === props.option[0] ? "selected" : "" }>
                    <input type="radio" name={props.id} value={props.option[0]} onChange={props.selected} />
                    {atob(props.option[0])}
                </label>
                <label className={props.answer === props.option[1] ? "selected" : "" }>
                    <input type="radio" name={props.id}  value={props.option[1]} onChange={props.selected} />
                    {atob(props.option[1])}
                </label>
                <label className={props.answer === props.option[2] ? "selected" : "" }>
                    <input type="radio" name={props.id}  value={props.option[2]} onChange={props.selected} />
                    {atob(props.option[2])}
                </label>
                <label className={props.answer === props.option[3] ? "selected" : "" }>
                    <input type="radio" name={props.id}  value={props.option[3]}  onChange={props.selected}/>
                    {atob(props.option[3])}
                </label>
            </form>
            <hr />
        </>
    )
}