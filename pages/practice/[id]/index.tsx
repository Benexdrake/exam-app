import QuizBlock from "@/components/quiz_block";
import QuizProgress from "@/components/quiz_progress";
import { Question } from "@/types/question";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

import styles from '@/styles/practice.module.css'

export type ExamType =
{
    questions:Question[]
}

export default function Exam(props:ExamType)
{
    const {questions} = props;

    const [index, setIndex] = useState(0);

    const [results, setResults] = useState([]);


    const changeIndexHandler = () =>
    {
        if(index < questions.length - 1)
        {
            setIndex(index + 1);
            return;
        }

        setIndex(0)
    }

    const onClickHandler = (e:any) =>
    {
        setIndex(e);
    }

    return (
            <div className="exam">    
                <div style={{display:'flex'}}>
                    <div className={styles.sidebar}>
                        {questions.map((x,index:number) => {
                            return (
                                <div className={styles.panel} onClick={() => onClickHandler(index)}>
                                    <span>{index+1}</span> <span>{x.questions.join('').slice(0,30)}...</span>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <div>
                            <QuizProgress index={index} max={questions.length}/>
                        </div>
                        <div>
                            {questions && (
                                <QuizBlock q={questions[index]} nr={index+1} changeIndexHandler={changeIndexHandler} results={results} setResults={setResults}/>
                                // Später ID übergeben, damit jede Componente die Daten selbst fetchen kann
                            )}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
    let questions = await axios.get(`http://${context.req.headers.host}/api/questions/${context.params?.id}`).then(x => {return x.data})
    questions.sort( () => .5 - Math.random());
    
    return {
        props: {
            questions
        }
    }
}