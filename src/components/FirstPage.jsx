export default function FirstPage(props) {
    return (
        <div className="first-page">
            <h1>Quizzical</h1>
            <p>TRIVIA open database questions quiz</p>
            <button className="start-btn"
                onClick={props.handleStratQuizBtn}
            >Start Quiz</button>
        </div>
    )
}