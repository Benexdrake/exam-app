import QuizBlock from "@/components/quizBlock";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

export default function Exam(props:any)
{
    const {questions} = props;

    const [index, setIndex] = useState(0);

    // [{id:1, check:false},{id:2, check:true}]
    const [results, setResults] = useState();

    const changeIndexHandler = () =>
    {
        if(index < questions.length - 1)
        {
            setIndex(index + 1);
            return;
        }


        // User ist fertig und wird zu einer Result Seite weitergeleitet.
        // Dort sieht man eine Auflistung/Grafik
    }

    return (
        <div>
            {questions && (
                <QuizBlock q={questions[index]} nr={index+1} changeIndexHandler={changeIndexHandler} setResults={setResults}/>
                // Später ID übergeben, damit jede Componente die Daten selbst fetchen kann
            )}
        </div>
    )
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
    const questions = await axios.get(`http://${context.req.headers.host}/api/exam/${context.query.id}`).then(x => {return x.data.slice(0,5)})
    
    return {
        props: {
            questions
        }
    }
}