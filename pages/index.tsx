import QuizBlock from "@/components/quizBlock";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

export default function Home(props:any)
{
  const {informations, url} = props;

  return (
    <>
    <div className="exam_choice">
    <h1>Please Choose:</h1>
      <ul>
        {informations && informations.map((x:any) => { return ( <li className="exam_button"><a href={`/exam/?id=${x.id}`}>{x.exam}</a> </li> ) })}
      </ul>
        </div>
    </>
  );
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
  const informations = await axios.get(`http://${context.req.headers.host}/api/exam`).then(x => {return x.data})

    return {
        props: 
        {
          url: `http://${context.req.headers.host}`,
          informations
        }
    }
}
