import QuizBlock from "@/components/quizBlock";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

export default function Exam(props:any)
{
    const {questions} = props;
    return (
        <div>
            {questions && (
                <QuizBlock q={questions[0]} nr={1}/>
                // Später ID übergeben, damit jede Componente die Daten selbst fetchen kann
            )}
        </div>
    )
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
    const questions = await axios.get(`http://${context.req.headers.host}/api/exam/${context.query.id}`).then(x => {return x.data})
    
    return {
        props: {
            questions
        }
    }
}