import axios from "axios";
import { GetServerSidePropsContext } from "next";

export default function Home(props:any)
{
  const {informations} = props;

  return (
    <>
    <div className="exam_choice">
    <h1 className="exam_header">Please Choose:</h1>
    <br />
      <ul>
        {informations && informations.map((x:any) => { return ( <li className="exam_button" key={x.id}><a href={`/exam/${x.id}`}>Exam Mode: {x.exam}</a> </li> ) })}
        <br />
        <br />
        <hr />
        <br />
        {informations && informations.map((x:any) => { return ( <li className="exam_button" key={x.id}><a href={`/practice/${x.id}`}>Practice Mode: {x.exam}</a> </li> ) })}
      </ul>
        </div>
    </>
  );
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
  const informations = await axios.get(`http://${context.req.headers.host}/api/questions`).then(x => {return x.data})

    return {
        props: 
        {
          informations
        }
    }
}
