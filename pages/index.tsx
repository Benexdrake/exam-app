import axios from "axios";
import { GetServerSidePropsContext } from "next";

export default function Home(props:any)
{
  const {informations} = props;

  return (
    <>
      <div className="exam_choice">
        <h1>Willkommen</h1>
        <p>In der Navbar finden Sie alle bisher verfügbaren Fragen mit den Modis Practice und Exam</p>
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
