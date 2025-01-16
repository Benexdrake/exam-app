import QuizBlock from "@/components/quizBlock";
import QuizProgress from "@/components/QuizProgress";
import QuizResult from "@/components/quizResult";
import { Question } from "@/types/question";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

export type ExamType =
{
    questions:Question[]
}

export default function Exam(props:ExamType)
{
    const {questions} = props;

    const [index, setIndex] = useState(0);

    const [results, setResults] = useState([]);

    const [checkResult, setCheckResult] = useState(false)


    const changeIndexHandler = () =>
    {
        if(index < questions.length - 1)
        {
            setIndex(index + 1);
            return;
        }

        setCheckResult(true)
    }

    return (
            <div className="exam">

                {checkResult ?
                (
                    <QuizResult questions={questions} results={results}/>
                )
                :
                (
                    <>
                        <div>
                            <QuizProgress index={index} max={questions.length}/>
                        </div>
                        <div>
                            {questions && (
                                <QuizBlock q={questions[index]} nr={index+1} changeIndexHandler={changeIndexHandler} results={results} setResults={setResults}/>
                                // Später ID übergeben, damit jede Componente die Daten selbst fetchen kann
                            )}
                        </div>
                    </>
                )}


                
            </div>
    )
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
    // type=exam, learning, undefined = this here

    let questions = await axios.get(`http://${context.req.headers.host}/api/exam/${context.params?.id}`).then(x => {return x.data})
    questions.sort( () => .5 - Math.random());
    
    return {
        props: {
            questions
        }
    }
}