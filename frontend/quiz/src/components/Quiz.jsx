import React, { useEffect, useState } from 'react'
import "./Quiz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import ViewInfo from './ViewInfo';
import ScoreDisplay from './ScoreDisplay';
import { useNavigate } from "react-router";
import Loading from './Loading';

const Quiz = () => {

    const [loading, setLoading] = useState("loading...");
    const [questions, setQuestions] = useState([]);
    const [showAnswers, setShowAnswers] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [quizInfo, setQuizInfo] = useState({ title: "", topic: "", correct_answer_marks: 0, negative_marks: 0, duration: 0 });
    const [showInfo, setShowInfo] = useState([]);
    const [toggleInfo, setToggleInfo] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [minutes, setMinutes] = useState(14);
    const [seconds, setSeconds] = useState(59);


    const navigate = useNavigate();

    useEffect(() => {

        try {
            sessionStorage.clear();

            const fresp = async () => {
                let fetchRes = await fetch('https://quiz-9h7x.onrender.com/quiz');
                let data = await fetchRes.json();

                setShowLoading(false);

                setQuizInfo({
                    title: data.title, topic: data.topic, correct_answer_marks: data.correct_answer_marks,
                    negative_marks: data.negative_marks, duration: data.duration
                });
                setLoading("Quiz is loaded");

                setQuestions(data.questions);

                let correctAnswers = [];
                data.questions.map((question) => {
                    question.options.map((option) => {
                        if (option.is_correct) {
                            correctAnswers.push(option.description);
                        }
                    });
                });

                setAnswers(correctAnswers);

            }

            fresp();
        } catch (error) {
            console.log(error.message);
        }
    }, [])



    function hint(data) {

        setShowInfo(data);
        setToggleInfo(!toggleInfo);
    }

    let score = 0;

    function calculateScore() {
        let len = sessionStorage.length;
        for (let i = 0; i < len; i++) {
            let key = sessionStorage.key(i);
            let value = sessionStorage.getItem(key);

            if (answers.includes(value)) {
                score += 4;
            } else {
                if (score > 0) {
                    score -= 1;
                }
            }
        }
        return score;
    }

    function submit() {

        if(minutes !== 0 && seconds  !== 0){
            let len = sessionStorage.length;
            if (len < questions.length) {
                alert("Please answer all questions");
                return;
            }
        }
        
        let userScore = calculateScore();
        setUserScore(userScore);

        setShowScore(true);

        setShowAnswers(!showAnswers);
    }

    function restart() {
        navigate("/");
        localStorage.clear();
        sessionStorage.clear();
    }

    return (
        <div className='quiz-container'>
            {
                showLoading ? <Loading /> :

                    <>
                        <div className='quiz-info' >
                            <h2>{quizInfo.title}</h2>
                            <p> {quizInfo.topic}</p>
                        </div><br />

                        <div className="duration">
                            <div>
                                <h6>Correct Answer Marks : {quizInfo.correct_answer_marks}</h6>
                                <h6>Negative Marks : {quizInfo.negative_marks}</h6>
                            </div>
                            <h5>Duration : {quizInfo.duration} minutes</h5>
                        </div>
                    </>
            }

            {
                showScore ? <ScoreDisplay userScore={userScore} showScore={showScore} setShowScore={setShowScore} /> : null
            }

            {
                showAnswers && toggleInfo ? <span className='infoo'><ViewInfo data={showInfo} toggleInfo={toggleInfo} setToggleInfo={setToggleInfo} /></span> : null
            }


            <ol className='questions-container'>

                {
                    questions.map((question, idx) => {
                        return (

                            <div className='question-container' key={question.id}>
                                <div className='question'>
                                    <li >{question.description}</li>

                                    <div className={`btns ${showAnswers ? 'show-answers' : ''}`} >
                                        <button className='btn btn-warning hint-btn' onClick={() => hint(question.reading_material.content_sections)} >Topic Overview</button>&nbsp;&nbsp;
                                        <button className='btn btn-success solution-btn' onClick={() => hint(question.detailed_solution)}>Detailed Solution</button>
                                    </div>
                                </div>

                                {
                                    question.options.map((option, index) => {
                                        return (
                                            <div key={option.id} onClick={(e) => sessionStorage.setItem(question.id, e.target.value)}>

                                                <input type="radio" name={question.id} id={option.description} value={option.description} disabled={showAnswers ? true : false} required />

                                                <label htmlFor={option.description}>{option.description}</label> &nbsp;&nbsp;

                                                {
                                                    showAnswers &&
                                                        option.is_correct ?
                                                        <span>  <FontAwesomeIcon icon={faCheck} style={{ fontSize: "1.5rem", color: "green" }} /> </span> :
                                                        sessionStorage.getItem(question.id) === option.description && <span >  <FontAwesomeIcon icon={faXmark} style={{ color: "red", fontSize: "1.5rem" }} /> </span>
                                                }


                                                <br /><br />

                                            </div>
                                        )

                                    })
                                }

                                {
                                    showAnswers &&
                                    <p style={{ color: "green" }} >
                                        Correct Answer : {answers[idx]}
                                    </p>
                                }


                            </div>


                        )
                    })
                }
            </ol>

            {
                !showLoading && !showAnswers ? <button onClick={submit} className='btn btn-success submit-btn'>Submit</button> : !showLoading &&
                    <button onClick={restart} className='btn btn-primary submit-btn'>Start new Test</button>
            }
        </div>
    )
}

export default Quiz;